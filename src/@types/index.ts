export interface GeoCodingResult {
  result: {
    addressMatches: Array<{
      coordinates: {
        x: number;
        y: number;
      };
    }>;
  };
}

export interface ForecastApiUrlResult {
  properties: {
    forecast: string;
    forecastHourly: string;
  };
}

export interface Periods {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  relativeHumidity: {
    value: number;
    unitCode: string;
  };
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface ForecastResult {
  properties: {
    periods: Periods[];
  };
}
