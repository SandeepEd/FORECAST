// import { useState } from 'react';
import { useState } from 'react';
import AddressForm from './components/AddressForm';
import { ForeCastProvider } from './context/ForecastProvider';
import './App.css';

export interface forecastResponseUrls {
  [key: string]: string;
}

function App() {
  // const [ count, setCount ] = useState(0);
  const [ responseUrl, setResponseUrl ] = useState<forecastResponseUrls | null>(null);
  console.log(`responseUrl`, responseUrl);

  return (
    <ForeCastProvider>
      <AddressForm setResponseUrl={setResponseUrl} />
    </ForeCastProvider>
  );
}

export default App;
