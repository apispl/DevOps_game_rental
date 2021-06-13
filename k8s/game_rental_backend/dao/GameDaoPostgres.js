const { json } = require('body-parser');
const { POOL, Pool } = require('pg');

const pgClient = new Pool({
    user: "postgres",
    password: "karol123",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
})

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
  .catch( (err) => console.log(err));
}

const getGames = (request, response) => {
    pgClient.query('SELECT * FROM games', (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows)
  })
}

const getGameById = (request, response) => {
  const id = parseInt(request.params.id)
  pgClient.query('SELECT * FROM games WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows)
  })
}

const createGame = (request, response) => {
  const { id, title, publishDate, manufacturer } = request.body
  
  pgClient.query('INSERT INTO games (title, publishDate, manufacturer) VALUES ($1, $2, $3)', [title, publishDate, manufacturer], (error, result) => {
    if (error) throw error;
    response.status(201).send(`Game added!`)
  });
}

const updateGame = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, publishDate, manufacturer } = request.body

  pgClient.query('UPDATE games SET title = $1, publishDate = $2, manufacturer = $3 WHERE id = $4', [title, publishDate, manufacturer, id], (error, results) => {
      if (error) throw error;
      response.status(200).send(`Game modified with ID: ${id}`)
    }
  )
}

const deleteGame = (request, response) => {
  const id = parseInt(request.params.id);
  
  pgClient.query('DELETE FROM games WHERE id = $1', [id], (error, result) => {
    if (error) throw error;
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