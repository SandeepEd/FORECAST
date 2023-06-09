import React, { createContext, ReactNode } from 'react';
import { ForecastResult } from '@types';
import { useGetForecast, useGetForecastApiUrl } from '../services/NationalWetherService';

interface IForeCastContext {
  coordinates: { lat: number, lon: number } | null;
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number, lon: number } | null>>;
  dailyForecastData: ForecastResult | null| undefined;
  hourlyForecastData: ForecastResult | null| undefined;
}

const ForeCastContext = createContext<IForeCastContext | null>(null);

const ForeCastProvider = ({ children }: { children: ReactNode }) => {
  const [ coordinates, setCoordinates ] = React.useState<{ lat: number, lon: number } | null>(null);

  const { data: apiUrlData } = useGetForecastApiUrl(coordinates?.lat, coordinates?.lon);
  const { data: hourlyForecastData } = useGetForecast(apiUrlData?.properties?.forecastHourly);
  const { data: dailyForecastData } = useGetForecast(apiUrlData?.properties?.forecast);

  return <ForeCastContext.Provider value={{
    coordinates,
    setCoordinates,
    hourlyForecastData,
    dailyForecastData,
  }}>
    {children}
  </ForeCastContext.Provider>;

};

const useForeCastContext = (): IForeCastContext => {
  const context = React.useContext(ForeCastContext);
  if (!context) {
    throw new Error(`useForeCastContext must be used within a ForeCastProvider`);
  }
  return context;
};

export { ForeCastProvider, useForeCastContext };
