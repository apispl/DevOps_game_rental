const express = require('express');
const cors = require('cors');
const gameDaoPostgres = require('./dao/GameDaoPostgres');
const app = express();

app.use(cors());
app.use(express.json());

gameDaoPostgres.initalize();
gameDaoPostgres.errorListener();

app.get('/games', gameDaoPostgres.getGames);
app.get('/games/:id', gameDaoPostgres.getGameById);
app.post('/games', gameDaoPostgres.createGame);
app.delete('/games', gameDaoPostgres.deleteGame);

const PORT = 5000;
app.listen(5000, () => {
    console.log(`API listening on port ${PORT}`)
});