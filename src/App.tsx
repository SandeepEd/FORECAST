import AddressInput from './components/AddressInput';
import { ForeCastProvider } from './context/ForecastProvider';
import './App.css';
// import HourlyForecast from './components/HourlyForecast';
import MapComponent from './components/Map';
import DailyForecast from './components/DailyForecast';

export interface forecastResponseUrls {
  [key: string]: string;
}

function App() {

  return (
    <ForeCastProvider>
      <AddressInput />
      <MapComponent />
      {/* <HourlyForecast /> */}
      <DailyForecast />
    </ForeCastProvider>
  );
}

export default App;
