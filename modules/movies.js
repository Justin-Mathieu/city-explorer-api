'user strict';

const axios = require('axios');


function getMovies(request, response) {
  const search = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`;
  axios
    .get(url)
    .then(movieResults => {
      const packagedMovieResults = movieResults.data.results.map(movie => new Movie(movie));
      response.status(200).send(packagedMovieResults);
    })

    .catch(error => {
      error.customMessage = 'something happened in the movie api';
      console.error('axios error', error);
      response.status(500).send(`server error ${error}`);
    });
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
