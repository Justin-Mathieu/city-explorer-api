'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();


app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {

  response.send('testing is thi thing up to date???');
});


app.get('/weather', async (request, response, next) => {
  try {
    const locationLat = request.query.lat;

    const locationLon = request.query.lon;
    console.log(locationLat, locationLon);
    const url = process.env.WEATHER_URL;
    const weatherResults = await axios.get(`${url}?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHER_API_KEY}&days=3`);
    const packagedResults = (weatherResults.data.data.map(forecast => new Forecast(forecast)));
    response.status(200).send(packagedResults);
  } catch (error) {
    error.customMessage = 'something happened in the weather api';
    next(error);
  }
});

/// need to rebuild
app.get('/movie', async (request, response, next) => {
  try {
    const search = request.query.searchQuery;
    console.log('is this working???', search);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`; console.log(url);
    const movieResults = await axios.get(url);
    const packagedMovieResults = (movieResults.data.results.map(movie => new Movie(movie)));
    console.log(movieResults.data.results[0]);
    response.status(200).send(packagedMovieResults);
  } catch (error) {
    error.customMessage = 'something happened in the movie api';
    next(error);
  }
});

class Forecast {
  constructor(forecast) {
    this.low = forecast.low_temp,
      this.description = forecast.weather.description,
      this.high = forecast.max_temp,
      this.date = forecast.valid_date;

  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title,
      this.overview = movie.overview,
      this.avgVotes = movie.vote_average,
      this.image = movie.poster_path,
      this.pop = movie.popularity,
      this.release = movie.release_date;

  }
}





app.use((error, request, response,) => {
  response.status(500).send(`something went wrong ${error.customMessage}`);
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));

