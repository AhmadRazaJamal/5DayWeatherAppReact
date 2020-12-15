import { WeatherTile } from './weatherTile';
import React from 'react';
import './weatherTileList.css';

export const HourlyWeatherTilesList = (weatherData) => {
    return (
        <div className='weatherTilesDiv'>
            {
            (weatherData.weatherData.weatherHourly || []).map(
                weatherDatum => {
                    return (
                        <WeatherTile
                            temperature={weatherDatum.temperature}
                            date={weatherData.weatherData.date}
                            weatherType={weatherDatum.weatherType}
                            weatherTypeImage={weatherDatum.weatherTypeImage}
                            time={weatherDatum.time}
                            key={weatherDatum.key}
                            id={weatherDatum.key}
                            alwaysDisplay={true}
                        />
                    )
                }
            )
            }
        </div>
    )
}