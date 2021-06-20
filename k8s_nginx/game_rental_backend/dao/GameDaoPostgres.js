const { json } = require('body-parser');
const { POOL, Pool } = require('pg');

const pgClient = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: "5432"
})

const redis = require('redis');

console.log(process.env.REDISHOST);

const redisClient = redis.createClient({
  host: process.env.REDISHOST,
  port: "6379"
  // retry_strategy: () => 1000
});

const errorListener = () => {
  pgClient.on('error', () => {
    console.log("Postgres not connected");
  })
}

const initalize = () => {
  pgClient.query('CREATE TABLE IF NOT EXISTS games (ID SERIAL PRIMARY KEY,'
    + ' title VARCHAR(30),'
    + ' publishDate VARCHAR(30),'
    + ' manufacturer VARCHAR(30));')
    .catch((err) => console.log(err));
}

const getGames = (request, response) => {
  pgClient.query('SELECT * FROM games', (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows)
  })
}

const getGameById = (request, response) => {
  const id = parseInt(request.params.id)

  redisClient.exists(id, (err, ok) => {
    if (err) throw err;
    console.log('exists: ' + ok)

    if(ok == 1) {
      redisClient.hgetall(id, function(err, object) {
        if(err) throw err;
  
        response
        .status(200)
        .header('cache', 'true')
        .json(object);
      })
    } else {
      pgClient.query('SELECT * FROM games WHERE id = $1', [id], (error, results) => {
        if (error) throw error;
        const gameNew = {
          id: results.rows[0].id,
          title: results.rows[0].title,
          publishDate: results.rows[0].publishdate,
          manufacturer: results.rows[0].manufacturer,
        }
        response.status(200).json(gameNew)
      })
    }
  });
}

const createGame = (request, response) => {
  const { title, publishDate, manufacturer } = request.body

  pgClient.query('INSERT INTO games (title, publishDate, manufacturer) VALUES ($1, $2, $3) RETURNING id;', [title, publishDate, manufacturer], (error, result) => {
    if (error) throw error;
    const id = result.rows[0].id;

    redisClient.hmset(id, 'id', id, 'title', title, "publishDate", publishDate, 'manufacturer', manufacturer);
    response.status(201).send(`Game added!`)
  });
}

const updateGame = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, publishDate, manufacturer } = request.body

  pgClient.query('UPDATE games SET title = $1, publishDate = $2, manufacturer = $3 WHERE id = $4', [title, publishDate, manufacturer, id], (error, results) => {
    if (error) throw error;
    redisClient.hmset(id, 'id', id, 'title', title, "publishDate", publishDate, 'manufacturer', manufacturer);
  
    console.log('Redis update with ID: ' + id);
  });

  response.status(200).send(`Game modified with ID: ${id}`)
}


const deleteGame = (request, response) => {
  const id = parseInt(request.params.id);

  pgClient.query('DELETE FROM games WHERE id = $1', [id], (error, result) => {
    if (error) throw error;

    redisClient.del(request.params.id, (error, response) => {
      console.log(response);
    });

    response.status(200).send(`Game deleted with ID: ${id}`)
  })
}

module.exports = {
  errorListener,
  initalize,
  getGames,
  getGameById,
  updateGame,
  createGame,
  deleteGame,
}