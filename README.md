# Weather Forecast Application

<!-- ![Project Banner](https://image-url.png) -->

## Table of Contents
- [Weather Forecast Application](#weather-forecast-application)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technologies Used](#technologies-used)
  - [How to Run](#how-to-run)
  - [Links](#links)

## Introduction

This is a comprehensive weather forecast application built with React and TypeScript. It fetches the forecast data from the National Weather Service API and provides daily and hourly forecasts. The application includes functionality for selecting a specific date and viewing the weather forecast for that date.

The main components of this application include:

- `AddressInput`: Takes the user's input (address) and fetches the coordinates.
- `MapComponent`: Uses the coordinates to display the location on Google Maps.
- `DailyForecast` and `HourlyForecast`: Uses the coordinates to fetch and display weather data from the National Weather Service API.
- `ForecastProvider`: A context provider that holds state and fetches data.

## Technologies Used

- React
- TypeScript
- dayjs: A lightweight JavaScript date library.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- react-query: A data-fetching and state management library for React.
- axios: A Promise-based HTTP client for JavaScript.

## How to Run

1. Clone the repository from GitHub.
2. Navigate to the project directory.
3. Install the project dependencies with `npm install`.
4. Run the project with `npm start`.

## Links

- Live application: [WIP](https://coming-right-up.com)
- National Weather Service API documentation: [Click Here](https://www.weather.gov/documentation/services-web-api)
- US Census Geocoding services: [Click Here](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf)
