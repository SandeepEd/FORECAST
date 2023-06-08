import axios from 'axios';

const client = axios.create({
  baseURL: `https://geocoding.geo.census.gov/geocoder`,
  headers: {
    "Content-Type": `application/json`,
  },
});

export default client;
