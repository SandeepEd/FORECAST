/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import client from '../http';

export class NationalWeatherService {

  static getForecastApiUrl(latitude: number, longitude: number): Promise<AxiosResponse<any>> {
    return client.get(`https://api.weather.gov/points/${latitude},${longitude}`);
  }

  static getForecast<T = any>(url: string): Promise<AxiosResponse<T>> {
    return client.get(url);
  }
}

// export const useGetForecast = (url: string) => useQuery({
//   queryKey: [ `weather`, url ],
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   queryFn: () => NationalWeatherService.getForecast(url).then((res) => res.data),
// });

// export const useGetForecastApiUrl = (latitude: number, longitude: number) => useQuery({
//   queryKey: [ `weather-api-url`, latitude, longitude ],
//   queryFn: async () => await NationalWeatherService.getForecastApiUrl(latitude, longitude),
// });

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

export const useGetForecast = (url: string) => useQuery(
  [ `weather`, url ],
  async () => {
    const { data } = await NationalWeatherService.getForecast(url);
    return data;
  },
  {
    enabled: !!url,
  }
);
