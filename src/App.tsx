import AddressForm from './components/AddressForm';
import { ForeCastProvider } from './context/ForecastProvider';
import './App.css';
import DailyForecast from './components/DailyForecast';

export interface forecastResponseUrls {
  [key: string]: string;
}

function App() {

  return (
    <ForeCastProvider>
      <AddressForm />
      <DailyForecast />
    </ForeCastProvider>
  );
}

export default App;
