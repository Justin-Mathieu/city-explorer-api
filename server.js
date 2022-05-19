'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();


app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
    response.send('testing');
});


app.get('/weather', async (request, response, next) => {
    try {

        const locationLat = request.query.locationLat;
        const locationLon = request.query.locationLon;
        console.log(`this is the first console.log${locationLat}`);
        const url = process.env.WEATHER_URL;
        const weatherResults = await axios.get(`${url}?key=${process.env.WEATHER_API_KEY}&lat=${locationLat}lon=${locationLon}`);
        // const cityWeather = new Forecast(weatherResults);
        console.log(weatherResults);
        // response.status(200).send(cityWeather);
    } catch (error) {
        error.customMessage = 'something happened in the api';
        next(error);
    }
});


// class Forecast {
//   constructor(weatherResults) {
//     this.city = Forecast.weatherResults.find(obj => obj.city_name.toLowerCase() === city.toLowerCase());
//     this.cityArr = this.city.data.map(obj => ({ 'date': obj.datetime, 'description': obj.weather.description }));
//   }
// }
app.use((error, request, response,) => {
    response.status(500).send(`something went wrong ${error.customMessage}`);
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));

