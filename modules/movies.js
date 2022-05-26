'user strict';

const axios = require('axios');
let cache = require('./Cache.js');


function getMovies(search) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`;
  const key = search;
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovies(response.data));
  }

  return cache[key].data;
}

function parseMovies(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Movie(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.avgVotes = movie.vote_average;
    this.image = movie.poster_path;
    this.pop = movie.popularity;
    this.release = movie.release_date;

  }
}
module.exports = getMovies;
