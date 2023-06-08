import React from 'react';
import { useForeCastContext } from '../context/ForecastProvider';
import { GeoCodingService } from '../services/GeoCodingService';

const AddressForm: React.FC = () => {

  const [ address, setAddress ] = React.useState(``);
  const { setCoordinates } = useForeCastContext();

  const handleSubmit = async () => {
    const result = await GeoCodingService.getLatLon(address);
    const lat = result.data.result?.addressMatches[0]?.coordinates?.y;
    const lon = result.data.result?.addressMatches[0]?.coordinates?.x;
    setCoordinates({ lat, lon });
  };

  return (
    <div className="w-screen flex flex-row justify-center items-center mt-3" >
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="shadow-lg w-4/6 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm"
        type="search" name="search" placeholder="Search" />
      <button onClick={() => handleSubmit()} type="submit" className="border-spacing-2 rounded-xl bg-sky-500
        text-black p-2 ml-2">
        submit
      </button>

    </div>
  );
};

export default AddressForm;
