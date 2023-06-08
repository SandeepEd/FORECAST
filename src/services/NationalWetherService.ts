import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ForecastApiUrlResult, ForecastResult } from '@types';
import client from '../http';

export class NationalWeatherService {

  static getForecastApiUrl(latitude: number, longitude: number): Promise<AxiosResponse<ForecastApiUrlResult>> {
    return client.get(`https://api.weather.gov/points/${latitude},${longitude}`);
  }

  static getForecast(url: string): Promise<AxiosResponse<ForecastResult>> {
    return client.get(url);
  }
}

export const useGetForecastApiUrl = (latitude: number | undefined, longitude: number | undefined) => useQuery(
  [ `weather-api-url`, latitude, longitude ],
  async () => {
    const { data } = latitude && longitude ? await NationalWeatherService.getForecastApiUrl(latitude, longitude) :
      { data: null };
    return data;
  },
  {
    enabled: !!latitude && !!longitude,
  }
);

export const useGetForecast = (url: string | undefined) => useQuery(
  [ `weather`, url ],
  async () => {
    const { data } = url ? await NationalWeatherService.getForecast(url) : { data: null };
    return data;
  },
  {
    enabled: !!url,
  }
);
