const weatherService = require('../services/weatherServices');


class WeatherController {
    constructor() {
        this.rawData = {}
    };
    async getWeather(lat, long) {
        let diff = 273.15;
        try {
            const data = await weatherService.getWeatherData(lat, long);
            const date = new Date();
            const readable = date.toDateString()
            const weatherCondi = (data.weather[0].main);
            let ideal = '';
            let hover = ''
            let bgColor = [];
            switch (weatherCondi) {
                case 'Thunderstorm':
                    ideal = '/img/v1/ideal/yellow.gif';
                    hover = '/img/v1/emote/yellow.gif';
                    bgColor = [
                        'linear-gradient(to bottom, #4D5358, #556066, #6E7582, #8897A4, #A3B3C2)',
                        'linear-gradient(to bottom, #4D5358, #556066, #6E7582, #8897A4, #A3B3C2)',
                        'linear-gradient(to bottom, #3C2F3F, #413C4E, #7C6E72, #B1716F, #DA8A67)',
                        'linear-gradient(to bottom, #1B1D21, #2A2139, #121C2B, #444C57, #E3E8EF)'];
                    break;

                case 'Rain':
                    ideal = '/img/v1/ideal/purple.gif';
                    hover = '/img/v1/emote/purple.gif';
                    bgColor = [
                        '',
                        'linear-gradient(to bottom, #5E6A74, #7E8B94, #9DAAB2, #BDC8CE, #DDE4E8)',
                        'linear-gradient(to bottom, #5E5A63, #7C6D76, #A88D87, #CDB3A6, #EEDBC8)',
                        'linear-gradient(to bottom, #1E232A, #2D343C, #3C4850, #5B6B73, #81959F)'];
                    break;

                case 'Snow':
                    ideal = '/img/v1/ideal/white.gif';
                    hover = '/img/v1/emote/white.gif';
                    bgColor = [
                        'linear-gradient(to bottom, #C5DDE8, #DCEBF2, #F0F6FB, #F9F9F9, #FFF2EA)',
                        'linear-gradient(to bottom, #BFD4E3, #D3E3ED, #E7F1F7, #F4F8FB, #FFFFFF)',
                        'linear-gradient(to bottom, #BFD4E3, #D3E3ED, #E7F1F7, #F4F8FB, #FFFFFF)',
                        'linear-gradient(to bottom, #B9C6D6, #D8DDE6, #F4DCE3, #FAD8CB, #FFF3E2)',
                        'linear-gradient(to bottom, #202C3B, #2E3A4A, #495F70, #7A95A6, #C5E1F0)',];
                    break;


                case 'Clouds':
                    ideal = '/img/v1/ideal/grey.gif';
                    hover = '/img/v1/emote/grey.gif';
                    bgColor = [
                        'linear-gradient(to bottom, #928E8A, #B5ABA3, #D5CBBE, #F0E3D5, #F9F2EB)',
                        'linear-gradient(to bottom, #6E7173, #8A8E90, #A9ADB0, #C8CCCF, #E4E7E9)',
                        'linear-gradient(to bottom, #505356, #6A6F73, #8A9095, #AEB4B9, #D1D7DC)',
                        'linear-gradient(to bottom, #5C5C6E, #7A7483, #A88D92, #D3B5A2, #F7E1C6)',
                        'linear-gradient(to bottom, #1F2123, #34373A, #565A5E, #787D82, #A2A9AF)'];
                    break;

                default:
                    ideal = '/img/v1/ideal/blue.gif';
                    hover = '/img/v1/emote/blue.gif';
                    bgColor = [
                        'linear-gradient(to bottom, #3D5688, #5373A1, #9da3b7, #CBB6B0, #F9D69E, #F6BD73)',
                        'linear-gradient(to bottom, #A7D5F2, #87CEEB, #B0DFF5, #FCEABB, #FAD6A5)',
                        'linear-gradient(to bottom, #87CEEB, #ADD8E6)',
                        'linear-gradient(to bottom, #FEA837, #DE741C, #B85B56, #84495F, #593E67)',
                        'linear-gradient(to bottom, #01162e, #001D37, #002746, #013155, #003A63, #01426D'];
                    break;

            }

            this.rawData = {
                date: date,
                temp: (data.main.temp - diff),
                feelsLike: (data.main.feels_like - diff),
                weatherMain: weatherCondi,
                weatherDesc: (data.weather[0].description),
                picture: ideal,
                hover: hover,
                bgColor
            }

            return {
                date: readable,
                temp: Math.floor(data.main.temp - diff),
                feelsLike: Math.floor(data.main.feels_like - diff),
                weatherMain: weatherCondi,
                weatherDesc: (data.weather[0].description),
                picture: ideal,
                bgColor
            };
        } catch (error) {
            throw new Error("Could not fetch weather data");
        }
    };

    getWeatherInfo() {
        return this.rawData;
    }

}




module.exports = new WeatherController();