import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { resort, startDate, endDate, unitType, price } = location.state || {};

  if (!resort) {
    return <div>Error: No booking information provided.</div>;
  }
  
  const { img, place_name, location: resortLocation, resort_ID } = resort;
  const {bath,kitchen,privacy_room_amount,sleeps_room, studio_bath,studio_kitchen,studio_privacy_room_amount} = resort.room_details;

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold">Checkout</h1>
      <div className="divider"></div>
      <div className="grid grid-cols-3 gap-4 space-y-2 p-4 shadow-lg">
        <img src={img} alt={place_name} className="col-span-1" />
        <div className="col-span-2">
          <h1 className="font-bold">{place_name}</h1>
          <p>Resort ID: {resort_ID}</p>
          <p>Travel Dates: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</p>
          <p>Unit Type: {unitType}</p>
          <p>Price: ${price} USD</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
