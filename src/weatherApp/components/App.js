import './App.css';
import { WeatherTilesList } from './weatherTileList';
import { HourlyWeatherTilesList } from "./hourlyWeatherList";
import React from 'react';

const weatherData = [
  { 
    key: '001',
    temperature: '23',
    date: 'Monday 23 Decemeber',
    weatherType: 'Partly Cloudy',
    weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c81fed16071075.562a501d5e911.gif',
    weatherHourly: [
      {
        key: '0011',
        time: "12 pm",
        temperature: "24",
        weatherType: 'Partly Cloudy',
        weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c81fed16071075.562a501d5e911.gif',
      },
      {
        key: '0012',
        time: "1 pm",
        temperature: "25",
        weatherType: 'Partly Cloudy',
        weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c81fed16071075.562a501d5e911.gif',
      },
      {
        key: '0013',
        time: "2 pm",
        temperature: "26",
        weatherType: 'Sunny',
        weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/421f0c16071075.562a500e6ddd4.gif', 
      },
      {
        key: '0014',
        time: "3 pm",
        temperature: "27",
        weatherType: 'Sunny',
        weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/421f0c16071075.562a500e6ddd4.gif', 
      }
    ], 
  },
  {
    key: '002',
    temperature: '32',
    date: 'Monday 24 Decemeber',
    weatherType: 'Sunny',
    weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/421f0c16071075.562a500e6ddd4.gif', 
  },
  {
    key: '003',
    temperature: '20',
    date: 'Monday 25 Decemeber',
    weatherType: 'Rainy',
    weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/a2405c16071075.562a5050beed0.gif', 
  },
  {
    key: '004',
    temperature: '21',
    date: 'Monday 25 Decemeber',
    weatherType: 'Foggy',
    weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/4d353e16071075.562a504473c5c.gif', 
  },
  {
    key: '005',
    temperature: '20',
    date: 'Monday 25 Decemeber',
    weatherType: 'Stormy',
    weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/58027c16071075.562a502d796a8.gif', 
  },
];

function App() {

  const [displayHourly, setDisplayHourly] = React.useState(false);
  const [displayHourlyIndex, setDisplayHourlyIndex] = React.useState(-1);

  const setDisplayHourlyIndexCallback = (index) => {
    const indexNo = index ; 
    setDisplayHourlyIndex(indexNo);
  }

  function weatherBalloon( cityID ) {
    var APIkey = '95848a8bff0e348e948feac55a3477d1';
    fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + cityID+ '&cnt=5&units=metric&appid=' + APIkey)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      console.log("Error fetching weather data")
    });
  }
  
  window.onload = function() {
    weatherBalloon( 6183235 );
  }

  return (
    <>
    { < WeatherTilesList 
      weatherData = {weatherData}
      setDisplayHourly = {setDisplayHourly}
      setDisplayHourlyIndexCallback ={setDisplayHourlyIndexCallback}
    />}
    { displayHourly && displayHourlyIndex >= 0 ? 
    <HourlyWeatherTilesList
      weatherData = {weatherData[displayHourlyIndex]}
    /> : null
    } 
    </> 
  );
}

export default App;
