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


app.get('/weather', (request, response) => {
    const city = request.query.city;
    console.log(city);
    const cityWeather = new List(city)
    response.send('this is still a test');
});


class List {
    static weatherData = require('./data.json');
    constructor(city) {
        this.items = List.weatherData.data.cityName.find(obj => obj === city).data;
    }
}
app.listen(PORT, () => console.log(`listening on ${PORT}`));

