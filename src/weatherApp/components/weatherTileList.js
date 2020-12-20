import { WeatherTile } from './weatherTile';
import React, { useEffect } from 'react';
import './weatherTileList.css';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const WeatherTilesList = (props) => {

    const [showTiles, setShowTiles] = React.useState([]);
    const [hourlyWeatherShown, setHourlyWeatherShown] = React.useState(false);

    const addShowTilesItem = (key) => {
        setShowTiles(showTiles => [...showTiles, { id: key, showTile: true }]);
        // Functional version of setState which stores the values and makes last values available
        // since the new values in usual setState aren't available until later of the render cycle
    }

    const getTruthValueForWeatherTile = (id) => {
        return showTiles.find(x => x.id === id);
    }

    const setTruthValueCallBack = (key) => {
        var newShowTilesState = showTiles.filter((x) => {
            if (x.id == key) {
                props.setDisplayHourlyIndexCallback(showTiles.indexOf(x));
                return x;
            }
            else {
                x.showTile = false;
                return x;
            }
        });

        props.setDisplayHourly(true);
        setHourlyWeatherShown(true);
        setShowTiles(newShowTilesState);
    }

    const setTruthValueToInitial = () => {
        var newShowTilesState = showTiles.filter((x) => {
            props.setDisplayHourlyIndexCallback(-1);
            x.showTile = true;
            return x;

        });

        props.setDisplayHourly(false);
        setHourlyWeatherShown(false);
        setShowTiles(newShowTilesState);
    }

    const keys = props.keys; // Grabs the keys from the weather Data coming from store 

    useEffect(() => {
        for (let key of keys) {
            addShowTilesItem(key);
        }
    }, [keys]);

    return (
        <>
        
        { hourlyWeatherShown ?
            <IconButton onClick={() => setTruthValueToInitial()} color="secondary" aria-label="add an alarm" size="medium" style={{ backgroundColor: "white", marginLeft: '1%', display: "initial" }}>
                <ArrowBackIosIcon />
            </IconButton> : null 
        }
            <div className='weatherTilesDiv'>
                {
                    (props.weatherData || []).map(
                        weatherDatum => {
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
        </>
    )
}