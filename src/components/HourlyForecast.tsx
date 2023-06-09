import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Period } from '@types';
import { useForeCastContext } from '../context/ForecastProvider';

const dates = Array.from({ length: 7 }, (_, i) => dayjs().add(i, `day`).format(`YYYY-MM-DD`));

const HourlyForecast: React.FC<{ selectedDay: string }> = ({ selectedDay }) => {
  const { hourlyForecastData: weatherData } = useForeCastContext();
  const [ selectedDate, setSelectedDate ] = useState(selectedDay);
  const [ filteredData, setFilteredData ] = useState<Period[]>([]);

  useEffect(() => {
    if (weatherData) {
      const filtered = weatherData.properties.periods.filter((period: any) => {
        const periodDate = dayjs(period.startTime).format(`YYYY-MM-DD`);
        return periodDate === selectedDate;
      });
      setFilteredData(filtered);
    }
  }, [ weatherData, selectedDate ]);

  if (!weatherData) {
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
      <div className="grid grid-cols-3 gap-4">
        {// ...

          filteredData.map((period) => {
            const startDate = new Date(period.startTime).getHours();
            const periodStart = startDate > 12 ? `${startDate - 12}PM` : startDate === 0 ? `12AM` : `${startDate}AM`;

            return (
              <div key={period.number} className="bg-gray-800 rounded-xl">
                <img src={period.icon} alt="Weather icon" className="w-full h-32 object-cover rounded-t-lg" />
                <div className='p-4'>
                  <h3 className="font-bold mb-2">{periodStart}</h3>
                  <p className="mb-1">T: {period.temperature}{period.temperatureUnit}</p>
                  <p className="mb-1">W: {period.windDirection} {period.windSpeed}</p>
                  <p className="text-xs">{period.shortForecast}</p>
                </div>
              </div>
            );
          })

          // ...
        }
      </div>
    </div>
  );
};

export default HourlyForecast;
