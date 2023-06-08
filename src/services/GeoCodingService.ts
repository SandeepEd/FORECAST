import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GeoCodingResult } from '@types';
import client from '../http';

// interface IGeoCodingService {
//   getLatLon(address: string): Promise<AxiosResponse<GeoCodingResult>>;
// }

export class GeoCodingService {
  static getLatLon(address: string): Promise<AxiosResponse<GeoCodingResult>> {
    // eslint-disable-next-line max-len
    // return client.get(`/locations/address?street=3253+MORRISON+AVE&city=CINCINNATI&state=OH&zip=45220&benchmark=Public_AR_Current&format=json`);
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
