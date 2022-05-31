'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovies = require('./modules/movies');
const getWeather = require('./modules/weather');
const notFound = require('./modules/notFound');

const app = express();


app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/movie', getMovies);
app.get('/weather', getWeather);
app.use('*', notFound);

app.get('/', (request, response) => {

  response.send('testing is thi thing up to date???');
});

app.use((error, request, response,) => {
  response.status(500).send(`something went wrong ${error.customMessage}`);
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));

