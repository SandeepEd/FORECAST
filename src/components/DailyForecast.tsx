import { useForeCastContext } from '../context/ForecastProvider';

function DailyForecast() {
  const { dailyForecastData } = useForeCastContext();
  console.log(`dailyForecastData`, dailyForecastData);
  return (
    <div>DailyForecast</div>
  );
}

export default DailyForecast;
