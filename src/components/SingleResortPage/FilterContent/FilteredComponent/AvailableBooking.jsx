import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const AvailableBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, startDate, endDate, unitType } = location.state;

  const getPrice = (unitType) => {
    switch (unitType) {
      case 'studio':
        return 309.00;
      case '1 bedroom':
        return 339.00;
      case '2 bedroom':
        return 379.00;
      default:
        return 0.00;
    }
  };

  const handleBookNow = () => {
    navigate("/checkout", {
      state: {
        resort,
        startDate,
        endDate,
        unitType,
        price: getPrice(unitType),
      },
    });
  };

  return (
    <div className='py-4 '>
      <h1 className='text-center text-2xl font-semibold'>Available Unit (<span className="text-[#0370ad]">3+</span>) </h1>
      <div className='flex flex-col space-y-2 justify-center items-center mx-5 p-4 shadow-lg'>
        <h2>{resort.place_name}</h2>
        <h2 className='text-3xl text-[#0370ad]'>{unitType}</h2>
        <h2><span className='text-3xl'>${getPrice(unitType)}</span> USD + tax</h2>
        <h2>Start Date: {new Date(startDate).toLocaleDateString()}</h2>
        <h2>End Date: {new Date(endDate).toLocaleDateString()}</h2>
        
        <button
          className="w-full text-lg bg-[#ffc445] hover:bg-[#ffbd42] text-gray-800 font-bold py-2 px-4 rounded"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>

    <div className='divider'></div>

      <div className='my-10 px-5 py-8 bg-[#e6f8fc] space-y-4'>
        <h1 className='text-4xl font-semibold'>All-inclusive info</h1>
        <h1 className='text-xl font-semibold'>Dining</h1>
        <Link to="/available-booking"><h1 className='flex items-center gap-2 text-lg text-[#2383a1] font-semibold'>See Restaurants <IoIosArrowDown /></h1></Link>
      </div>
    </div>
  );
};

export default AvailableBooking;
