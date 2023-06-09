import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Periods } from '@types';
import { useForeCastContext } from '../context/ForecastProvider';
import HourlyForecast from './HourlyForecast';

const DailyForecast: React.FC = () => {
  const { forecastData } = useForeCastContext();
  const [ selectedDay, setSelectedDay ] = useState<string | null>(null);

  if (!forecastData) {
    return null;
  }

  const renderBackButton =
    <div
      onClick={() => setSelectedDay(null)}
      onKeyDown={(event) => event.key === `Enter` && setSelectedDay(null)}
      role="button"
      tabIndex={0}
      className="mb-4 cursor-pointer text-gray-500 hover:text-gray-200"
    >
      {`< Back to Daily Forecast`}
    </div>;

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>
      {selectedDay
        ? <>
          {renderBackButton}
          <HourlyForecast selectedDay={selectedDay} />
        </>
        : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forecastData?.properties.periods?.map((period) =>
            forecastCard({ period, handleOnClick: setSelectedDay }))}
        </div>

      }
    </div>
  );
};

const forecastCard: React.FC<{ period: Periods;
  handleOnClick: (date: string) => void;
}> = ({ period, handleOnClick }) =>
  <div
    role="button"
    tabIndex={0}
    key={period.number}
    className="duration-500 hover:-translate-y-4 rounded overflow-hidden shadow-lg
                 bg-gray-800 hover:border-4 hover:border-gray-700 hover:rounded-md hover:p-2"
    onClick={() => handleOnClick(dayjs(period.startTime).format(`YYYY-MM-DD`))}
    onKeyDown={(event) => event.key === `Enter` && handleOnClick(dayjs(period.startTime).format(`YYYY-MM-DD`))}
  >
    <img loading='lazy' className="w-full object-contain" src={period.icon} alt="Weather icon" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{period.name}</div>
      <div className="py-2">
        <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-xl font-semibold
                        text-gray-200 mr-2 mb-2">
          T: {period.temperature}°{period.temperatureUnit}
        </span>
        <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold
                        text-gray-200 mr-2 mb-2">
          W: {period.windDirection} at {period.windSpeed}
        </span>
      </div>
      <p className="text-white text-base">{period.detailedForecast}</p>
    </div>
  </div>;

export default DailyForecast;
