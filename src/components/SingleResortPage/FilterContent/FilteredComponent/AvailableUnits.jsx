// AvailableUnits.js
import React from 'react';
import { Link } from 'react-router-dom';
import { GrAnnounce } from 'react-icons/gr';

const AvailableUnits = ({ currentResort }) => {
  const { location, place_name, resort_ID } = currentResort;

  const handleTransmission = () => {
    localStorage.setItem('currentResort', JSON.stringify(currentResort));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Available Units</h1>
      <p>
        To view current RCI Points® and Rental availability for {place_name} at {location} (Resort Id: {resort_ID}) select one of the following
      </p>

      <div className="border-[1px] rounded my-10 py-5 shadow-gray-200 shadow-md">
        <Link
          to="/single-available-unit"
          onClick={handleTransmission}
        >
          <h1>
            <span className="bg-[#037092] text-white py-2 px-4 rounded-r-full">Rental</span>
          </h1>
          <div className="flex flex-col justify-center items-center">
            <GrAnnounce className="text-6xl text-[#037092] my-3" />
            <h1 className="text-2xl font-semibold text-[#037092] my-3">Last Call Vacations</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AvailableUnits;
