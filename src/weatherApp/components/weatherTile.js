import { Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '15%',
        width: '20%',
        margin: '1% 2.5%',
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
}));

export const WeatherTile = ({ temperature, date, weatherType, weatherTypeImage, showTile, setTruthValue, id, time, alwaysDisplay }) => {
    const classes = useStyles();

    let weatherTile;
    (showTile || alwaysDisplay) ? weatherTile =
        <Card className={classes.root} onClick={() => setTruthValue(id)}>
            <CardHeader className={classes.header}
                avatar={
                    <Typography variant='h3'>
                        {temperature}<sup><Typography variant='h5' display='inline'>C</Typography></sup>
                    </Typography>
                }
                disableTypography={true}
                title={
                    <>
                        {
                            time ?
                                <Typography variant='body2' noWrap align='right'>
                                    {time}
                                </Typography> : null
                        }
                        <Typography variant='body2' noWrap align='right'>
                            {date}
                        </Typography>
                    </>
                }
                subheader={
                    <Typography variant='h6' align='right' style={{ textTransform: 'capitalize' }}>
                        {weatherType}
                    </Typography>}
            />
            <CardMedia
                className={classes.media}
                image={weatherTypeImage}
                title="weatherImageType"
            />
        </Card>
        : weatherTile = "";

    return (
        weatherTile
    );
}