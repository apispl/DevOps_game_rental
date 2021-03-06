const express = require('express');
const app = express();

const cors = require('cors');
const gameDaoPostgres = require('./dao/GameDaoPostgres');

app.use(cors());
app.use(express.json());

gameDaoPostgres.initalize();
gameDaoPostgres.errorListener();

app.get('/games', gameDaoPostgres.getGames);
app.get('/games/:id', gameDaoPostgres.getGameById);
app.post('/games', gameDaoPostgres.createGame);
app.put('/games/:id', gameDaoPostgres.updateGame);
app.delete('/games/:id', gameDaoPostgres.deleteGame);

const PORT = 5000;
app.listen(5000, () => {
    console.log(`API listening on port server my ${PORT}`)
});