import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Period } from '@types';
import _ from 'lodash';
import { useForeCastContext } from '../context/ForecastProvider';
import HourlyForecast from './HourlyForecast';

const DailyForecast: React.FC = () => {
  const { dailyForecastData } = useForeCastContext();
  const [ selectedDay, setSelectedDay ] = useState<string | null>(null);

  if (!dailyForecastData) {
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

  const groupedPeriods = _.groupBy(dailyForecastData?.properties.periods, period =>
    dayjs(period.startTime).format(`YYYY-MM-DD`));

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Daily Forecast</h1>
      {selectedDay
        ? <>
          {renderBackButton}
          <HourlyForecast selectedDay={selectedDay} />
        </>
        : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.values(groupedPeriods).map(periods =>
            <ForecastCard
              key={periods[0].number}
              periods={periods}
              handleOnClick={(date) => setSelectedDay(date)}
            />)}
        </div>

      }
    </div>
  );
};

const dayIcon = `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/sun.svg`;
const nightIcon = `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/moon.svg`;

const ForecastCard: React.FC<{ periods: Period[], handleOnClick: (date: string) => void }> =
    ({ periods, handleOnClick }) =>
      <div
        role="button"
        tabIndex={0}
        key={periods[0].number}
        className="flex duration-500 hover:-translate-y-4 rounded overflow-hidden shadow-lg
                 bg-gray-800 hover:border-4 hover:border-gray-700 hover:rounded-md hover:p-2"
        onClick={() => handleOnClick(dayjs(periods[0].startTime).format(`YYYY-MM-DD`))}
        onKeyDown={(event) => event.key === `Enter` && handleOnClick(dayjs(periods[0].startTime).format(`YYYY-MM-DD`))}
      >
        {periods.map(period =>
          <div key={period.number} className="flex-1">
            <img loading='lazy' className="w-full object-contain" src={period.icon} alt="Weather icon" />
            <div className="px-2 py-4">
              <div className='flex items-center mb-2 ml-1'>
                <div className="font-bold text-l">{period.name}</div>
                <img className="w-4 h-4 ml-2 filter invert fill-blue-800"
                  src={period.name.toLowerCase().includes(`night`) ? nightIcon : dayIcon}
                  alt="Day/Night icon" />

              </div>
              <div className="py-2">
                <DailyForecastItem value={`T: ${period.temperature}°${period.temperatureUnit}`} />
                <DailyForecastItem value={`W: ${period.windSpeed} ${period.windDirection}`} />
                <DailyForecastItem value={`P: ${period.probabilityOfPrecipitation.value}%`} />
                <DailyForecastItem value={`H: ${period.relativeHumidity.value}%`} />
              </div>
              <p className="text-xs">{period.shortForecast}</p>
            </div>
          </div>)}
      </div>;

const DailyForecastItem: React.FC<{ value: string }> = ({ value }) =>
  <span className="inline-block bg-gray-700 rounded-full px-2 py-1 text-l font-semibold
text-gray-200 mr-2 mb-2">
    {value}
  </span>;

export { DailyForecast, dayIcon, nightIcon };
