import './App.css';
import { WeatherTilesList } from './weatherTileList';
import { HourlyWeatherTilesList } from "./hourlyWeatherList";
import React from 'react';
import { Tooltip, Typography, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const weatherTypeImages = {
  partlyCloudy: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c81fed16071075.562a501d5e911.gif',
  sunny: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/421f0c16071075.562a500e6ddd4.gif',
  rainy: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/a2405c16071075.562a5050beed0.gif',
  foggy: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/4d353e16071075.562a504473c5c.gif',
  stormy: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/58027c16071075.562a502d796a8.gif',
  lightSnow: 'https://i.pinimg.com/originals/ea/2c/b7/ea2cb7d85f2873f3a9f0d50cacde6817.gif',
  overcastClouds: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f4806457493795.59d8b8ddb42d7.gif',
  clearSky: 'https://media4.giphy.com/media/5PhRWWyHVy3goI9A0T/giphy.gif',
  scatteredClouds: 'https://media4.giphy.com/media/26gs87YcoCMeQFMcw/giphy.gif',
  fewClouds: 'https://media1.giphy.com/media/26uf7RM9Nb9WgpMv6/source.gif',
}

function App() {

  const [displayHourly, setDisplayHourly] = React.useState(false);
  const [displayHourlyIndex, setDisplayHourlyIndex] = React.useState(-1);

  const setDisplayHourlyIndexCallback = (index) => {
    const indexNo = index;
    setDisplayHourlyIndex(indexNo);
  }

  const [weatherData, setData] = React.useState([]);
  const [weatherDataKeys, setWeatherDataKeys] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + 6183235 + '&units=metric&appid=' + '95848a8bff0e348e948feac55a3477d1')
      .then(resp => resp.json()) // Convert data to json
      .then(function (data) {

        let fiveDayweatherData = [];
        let keys = [];
        let weatherDatum;
        let index = -1;

        console.log(data);

        for (let i in data.list) {

          let d = new Date(data.list[i].dt * 1000);
          let dateString = d.toString();
          let date = dateString.slice(0, 10);

          let weatherImage;
          switch (data.list[i].weather[0].description) {
            case "partly cloudy":
              weatherImage = weatherTypeImages.partlyCloudy;
              break;
            case "sunny":
              weatherImage = weatherTypeImages.sunny;
              break;
            case "rainy":
              weatherImage = weatherTypeImages.rainy;
              break;
            case "stormy":
              weatherImage = weatherTypeImages.stormy;
              break;
            case "foggy":
              weatherImage = weatherTypeImages.foggy;
              break;
            case "overcast clouds":
              weatherImage = weatherTypeImages.overcastClouds;
              break;
            case "light snow":
              weatherImage = weatherTypeImages.lightSnow;
              break;
            case "clear sky":
              weatherImage = weatherTypeImages.clearSky;
              break;
            case "scattered clouds":
              weatherImage = weatherTypeImages.scatteredClouds;
              break;
            case "broken clouds":
              weatherImage = weatherTypeImages.fewClouds;
              break;
            case "snow":
              weatherImage = weatherTypeImages.lightSnow;
              break;
            case "few clouds":
              weatherImage = weatherTypeImages.fewClouds;
              break;
            default:
              weatherImage = "";
          }

          weatherDatum = {
            key: `00${i}`,
            temperature: Math.round(data.list[i].main.temp),
            date: date,
            weatherType: (data.list[i].weather[0].description),
            weatherTypeImage: weatherImage,
            weatherHourly: [],
          }

          if (i % 8 == 0) {
            fiveDayweatherData.push(weatherDatum);
            keys.push(weatherDatum.key);
            index = index + 1;
          }
          else {
            fiveDayweatherData[index].weatherHourly.push(weatherDatum);
          }
        }
        const dataPair = { fiveDayweatherData, keys };
        return dataPair;
      })
      .then(
        dataPair => { setData(dataPair.fiveDayweatherData); setWeatherDataKeys(dataPair.keys); }
      )
      .catch(function () {
        console.log("Error fetching weather data")
      });
  }, []);

  return (
    <>
      <Typography align='center' variant='h4' style={{ color: '#111', fontFamily: "Helvetica Neue', sans-serif", fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-1px', lineHeight: '1', textAlign: 'center', padding: '20px 20px 0px 20px' }}>
        Seven Days Weather Forecast
      </Typography>
      <Typography align='center' variant='h6' style={{ color: '#111', fontFamily: "Helvetica Neue', sans-serif", fontWeight: 'bold', letterSpacing: '-1px', lineHeight: '1', padding: '20px' }}>
        Showing Weather for :
        <p style={{ color: 'skyblue', display: 'inline', textDecoration: 'none', lineHeight: '4', backgroundColor: 'white', padding: '3px 7px', marginLeft: "1%" }}>
          Winnipeg
        </p>
      </Typography>

      {
        < WeatherTilesList
          weatherData={weatherData}
          setDisplayHourly={setDisplayHourly}
          setDisplayHourlyIndexCallback={setDisplayHourlyIndexCallback}
          keys={weatherDataKeys}
        />
      }
      { displayHourly && displayHourlyIndex >= 0 ?
        <>
          <Typography align='center' variant='h4' style={{ color: '#111', fontFamily: "Helvetica Neue', sans-serif", fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-1px', lineHeight: '1', textAlign: 'center', padding: '20px 20px 20px 20px' }}>
            Hourly Weather Forecast
            <Tooltip title={<p>Shows Weather data at 3 hours interval apart from current time</p>} placement="top">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>

          <HourlyWeatherTilesList
            weatherData={weatherData[displayHourlyIndex]}
          />
        </>
        : null
      }
    </>
  );
}

export default App;
