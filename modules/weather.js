'use strict';

const axios = require('axios');
let cache = require('./Cache.js');

function getWeather(locationLat, locationLon) {
  const key = 'weather-' + locationLat + locationLon;
  const url = `${process.env.WEATHER_URL}?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHER_API_KEY}&days=3`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


class Forecast {
  constructor(forecast) {
    this.low = forecast.low_temp;
    this.description = forecast.weather.description;
    this.high = forecast.max_temp;
    this.date = forecast.valid_date;
    this.time = forecast.datetime;

  }
}
module.exports = getWeather;
