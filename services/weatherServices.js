const axios = require('axios');

const getWeatherData = async (lat, long) => {
    try {
        const apiKey = process.env.API_KEY;
        console.log("Using API_KEY:", process.env.API_KEY); // check if it's undefined

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
        const response = await axios.get(url);
        console.log(response);
        console.log(response.data);

        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data');
    }
};

module.exports = { getWeatherData };
