import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Period } from '@types';
import { useForeCastContext } from '../context/ForecastProvider';

const dates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, `day`).format(`YYYY-MM-DD`));

const HourlyForecast: React.FC<{ selectedDay: string }> = ({ selectedDay }) => {
  const { hourlyForecastData } = useForeCastContext();
  const [ selectedDate, setSelectedDate ] = useState(selectedDay);
  const [ filteredHourlyData, setFilteredHourlyData ] = useState<Period[]>([]);

  useEffect(() => {
    if (hourlyForecastData) {
      const filtered = hourlyForecastData.properties.periods.filter((period: any) => {
        const periodDate = dayjs(period.startTime).format(`YYYY-MM-DD`);
        return periodDate === selectedDate;
      });
      setFilteredHourlyData(filtered);
    }
  }, [ hourlyForecastData, selectedDate ]);

  if (!hourlyForecastData) {
    return null;
  }

  return (
    <div className="px-20 py-4 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Hourly Weather Forecast</h2>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="mb-4 bg-gray-800 text-white rounded p-3"
      >
        {dates.map(date =>
          <option key={date} value={date}>{date}</option>)}
      </select>
      <div className="grid grid-cols-1 gap-4">
        {filteredHourlyData.map((period) => {
          const day = dayjs(period.startTime).format(`dddd`);
          const time = new Date(period.startTime).getHours();
          const formattedTime = time > 12 ? `${time - 12}PM` : time === 0 ? `12AM` : `${time}AM`;

          return (
            <div key={period.number} className="flex bg-gray-800 rounded-xl items-start pr-4 shadow-2xl
             border-gray-500 duration-300 focus:translate-x-4">
              <img src={period.icon} alt="Weather icon" className="w-28 h-full rounded-l-xl" />
              <div className='ml-4 w-full h-full flex flex-row items-center justify-center'>
                <HourlyForecastItem label={day} value={formattedTime} />
                <HourlyForecastItem label="Temperature" value={`${period.temperature}°${period.temperatureUnit}`} />
                <HourlyForecastItem label="Wind" value={`${period.windSpeed} ${period.windDirection}`} />
                <HourlyForecastItem label="Precipitation" value={`${period.probabilityOfPrecipitation.value}%`} />
                <HourlyForecastItem label="Humidity" value={`${period.relativeHumidity.value}%`} />
                <HourlyForecastItem label="Forecast" value={period.detailedForecast ?
                  period.detailedForecast : period.shortForecast} />
              </div>
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

const HourlyForecastItem: React.FC<{ label: string, value: string }> = ({ label, value }) =>
  <div className='basis-1/6'>
    <div className="font-light text-xs text-center">{label}</div>
    <h3 className="font-bold mb-2 text-center">{value}</h3>
  </div>;

const MemoizedHourlyForecast = React.memo(HourlyForecast);

export default MemoizedHourlyForecast;
