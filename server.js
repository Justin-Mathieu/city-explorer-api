'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/', (request, response) => {
    response.send('testing');
});


app.get('/weather', (request, response, next) => {
    try {
        const city = request.query.city;
        // console.log(city);
        const cityWeather = new Forecast(city)
        // console.log(cityWeather)
        response.status(200).send(cityWeather);
    } catch (error) {
        error.customMessage = 'something happened in the api';
        next(error);
    }
});


class Forecast {
    static weatherData = require('./data.json');
    constructor(city) {
        this.city = Forecast.weatherData.find(obj => obj.city_name.toLowerCase() === city.toLowerCase());
        this.cityArr = this.city.data.map(obj => ({ 'date': obj.datetime, 'description': obj.weather.description }))
    }
}
app.use((error, request, response, next) => {
    response.status(500).send(`something went wrong ${error.customMessage}`);
})
app.listen(PORT, () => console.log(`listening on ${PORT}`));

