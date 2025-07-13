require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const weatherController = require('./controllers/WeatherController.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const lat = 13.7563;
    const long = 100.5018;
    try {
        const data = await weatherController.getWeather(lat, long);
        console.log("Weather data:", data);
        res.render('index.ejs', { data });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.post('/', async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        const data = await weatherController.getWeather(latitude, longitude);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch weather data.' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

