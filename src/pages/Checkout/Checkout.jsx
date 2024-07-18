import React from "react";
import { FaBed } from "react-icons/fa";
import { MdBathtub, MdKitchen, MdMeetingRoom } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { resort, startDate, endDate, unitType, price } = location.state || {};

  if (!resort) {
    return <div>Error: No booking information provided.</div>;
  }
  
  const { img, place_name, location: resortLocation, resort_ID, room_details,check_in_time,check_out_time } = resort;

  // Function to get room details based on unitType
  const getRoomDetails = () => {
    if (unitType === 'studio') {
      return {
        bath: room_details.studio_bath,
        kitchen: room_details.studio_kitchen,
        privacy_room_amount: room_details.studio_privacy_room_amount,
        sleeps_room: room_details.studio_sleeps_room,
      };
    } else { // Assuming unitType can only be 'studio' or 'bedroom'
      return {
        bath: room_details.bath,
        kitchen: room_details.kitchen,
        privacy_room_amount: room_details.privacy_room_amount,
        sleeps_room: room_details.sleeps_room,
      };
    }
  };

  const { bath, kitchen, privacy_room_amount, sleeps_room } = getRoomDetails();

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold">Checkout</h1>
      <div className="divider"></div>
      <div className="md:grid grid-cols-3 gap-4 space-y-5 md:space-y-2 p-4 shadow-lg">
        <img src={img} alt={place_name} className="col-span-1" />
        <div className="col-span-2 p-4">
          <p className="md:hidden">{resortLocation}</p>
          <h1 className="font-bold text-xl md:text-lg">{place_name}</h1>
          <p>Resort ID: <span className="font-semibold">{resort_ID}</span></p>

          <div className="mt-3 space-y-1 font-semibold text-gray-600">
          <p>Travel Dates: <span className="font-semibold">{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span></p>
          <div className="md:flex gap-5">
            <p>Check-in: <span className="font-semibold">{check_in_time}</span></p>
            <p>Check-in: <span className="font-semibold">{check_out_time}</span></p>
          </div>

          {/* Display room details based on unitType */}
          <div className="md:grid grid-cols-2 gap-2 font-semibold text-lg text-gray-500">
          <p className="flex gap-2 items-center "><MdBathtub /> {bath}</p>
          <p className="flex gap-2 items-center"><MdKitchen /> {kitchen} Kitchen</p>
          <p className="flex gap-2 items-center"><MdMeetingRoom /> {privacy_room_amount} Privacy</p>
          <p className="flex gap-2 items-center"><FaBed /> {sleeps_room} Sleep</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
