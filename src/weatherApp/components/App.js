import './App.css';
import { WeatherTilesList } from './weatherTileList';

const weatherData = [
  { 
    key: '001',
    temperature: '23',
    date: 'Monday 23 Decemeber',
    weatherType: 'Partly Cloudy',
    weatherTypeImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c81fed16071075.562a501d5e911.gif',
    weatherHourly: [
      {
        time: "12 pm",
        temperature: "24"
      },
      {
        time: "1 am",
        temperature: "24"
      },
      {
        time: "2 am",
        temperature: "24"
      },
      {
        time: "3 am",
        temperature: "24"
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
  return (
    < WeatherTilesList 
      weatherData = {weatherData}
    />
  );
}

export default App;
