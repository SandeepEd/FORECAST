import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GeoCodingResult } from '@types';
import client from '../http';

export class GeoCodingService {
  static getLatLon(address: string): Promise<AxiosResponse<GeoCodingResult>> {
    return client.get(`/locations/onelineaddress`, {
      params: {
        address,
        benchmark: `Public_AR_Current`,
        format: `json`,
      },
    });
  }
}

export const useGetLatLng = (address: string) => useQuery({
  queryKey: [ `lat-lng`, address ],
  queryFn: () => GeoCodingService.getLatLon(address).then((res) => res.data),
});
