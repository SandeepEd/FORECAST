import React, { ReactNode, createContext } from "react";
import { useGetForecast, useGetForecastApiUrl } from "../services/NationalWetherService";

interface IForeCastContext {
  coordinates: { lat: number, lon: number } | null;
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lon: number; } | null>>;
  forecastData: any;
}

const ForeCastContext = createContext<IForeCastContext | null>(null);


const ForeCastProvider = ({ children }: { children: ReactNode }) => {
  const [coordinates, setCoordinates] = React.useState<{ lat: number, lon: number } | null>(null);

  const { data: apiUrlData } = useGetForecastApiUrl(coordinates?.lat, coordinates?.lon);
  const { data: forecastData } = useGetForecast(apiUrlData?.properties?.forecast);
  console.log(`forecastData`, forecastData);

  return <ForeCastContext.Provider value={{
    coordinates,
    setCoordinates,
    forecastData,
  }}>
    {children}
  </ForeCastContext.Provider>;

};

const useForeCastContext = (): IForeCastContext => {
  const context = React.useContext(ForeCastContext);
  if (!context) {
    throw new Error("useForeCastContext must be used within a ForeCastProvider");
  }
  return context;
}

export { ForeCastProvider, useForeCastContext };