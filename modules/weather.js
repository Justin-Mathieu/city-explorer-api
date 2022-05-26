'use strict';

const axios = require('axios');


function getWeather(request, response) {
  const locationLat = request.query.lat;
  const locationLon = request.query.lon;
  console.log(locationLat, locationLon);
  const url = `${process.env.WEATHER_URL}?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHER_API_KEY}&days=3`;
  axios
    .get(url)
    .then(weatherResults => {
      const packagedResults = weatherResults.data.data.map(forecast => new Forecast(forecast));
      response.status(200).send(packagedResults);
    })

    .catch(error => {
      error.customMessage = 'something happened in the weather api';
      console.error('axios error', error);
      response.status(500).send(`server error ${error}`);
    });
}

class Forecast {
  constructor(forecast) {
    this.low = forecast.low_temp;
    this.description = forecast.weather.description;
    this.high = forecast.max_temp;
    this.date = forecast.valid_date;

  }
}
module.exports = getWeather;
