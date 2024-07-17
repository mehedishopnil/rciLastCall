import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { resort, startDate, endDate, unitType, price } = location.state || {};

  if (!resort) {
    return <div>Error: No booking information provided.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold">Checkout</h1>
      <div className="flex flex-col space-y-2 justify-center items-center p-4 shadow-lg">
        <h2>{resort}</h2>
        <h2 className="text-3xl text-[#0370ad]">{unitType}</h2>
        <h2>
          <span className="text-3xl">{price}</span> USD
        </h2>
        <h2>Start Date: {new Date(startDate).toLocaleDateString()}</h2>
        <h2>End Date: {new Date(endDate).toLocaleDateString()}</h2>
      </div>
    </div>
  );
};

export default Checkout;
