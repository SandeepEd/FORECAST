import { useForeCastContext } from '../context/ForecastProvider';

function MapComponent() {

  const { coordinates } = useForeCastContext();

  if (!coordinates) {
    return null;
  }
  // eslint-disable-next-line max-len, @typescript-eslint/restrict-template-expressions
  const src = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAP_API}&q=${coordinates?.lat},${coordinates?.lon}`;

  return (
    <div className='w-full flex items-center justify-center mt-4'>
      <iframe
        title="map"
        className='rounded-xl w-4/5 h-44'
        src={src}
        loading='lazy'
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

export default MapComponent;
