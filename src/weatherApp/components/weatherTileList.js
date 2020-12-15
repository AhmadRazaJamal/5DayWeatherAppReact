import { WeatherTile } from './weatherTile';
import React, { useEffect } from 'react';
import './weatherTileList.css';

export const WeatherTilesList = (props) => {

    const [showTiles, setShowTiles] = React.useState([]);

    const addShowTilesItem = (key) => {
        setShowTiles(showTiles => [...showTiles, {id: key, showTile: true}]);
        // Functional version of setState which stores the values and makes last values available
        // sincec the new values in usual setState aren't available until later of the render cycle
    }

    const getTruthValueForWeatherTile = (id) => {
        return showTiles.find(x => x.id === id);
    }

    const setTruthValueCallBack = (id) => {
        var newShowTilesState = showTiles.filter((x) => 
        { x.showTile = !x.showTile; return x;}); 

        props.setDisplayHourly(true);
        props.setDisplayHourlyIndexCallback(0);
        setShowTiles(newShowTilesState);
    }

    let keys = []; // Grabs the keys from the weather Data coming from store 

    useEffect(() => {
        for(let key of keys){addShowTilesItem(key);}
    },[]);

    return (
        <div className='weatherTilesDiv'>
            {
            (props.weatherData || []).map(
                weatherDatum => {
                    
                    keys.push(weatherDatum.key);

                    return (
                        <WeatherTile
                            temperature={weatherDatum.temperature}
                            date={weatherDatum.date}
                            weatherType={weatherDatum.weatherType}
                            weatherTypeImage={weatherDatum.weatherTypeImage}
                            showTile={getTruthValueForWeatherTile(weatherDatum.key) ? getTruthValueForWeatherTile(weatherDatum.key).showTile : true}
                            key={weatherDatum.key}
                            id={weatherDatum.key}
                            setTruthValue={setTruthValueCallBack}
                        />
                    )
                }
            )
            }
        </div>
    )
}