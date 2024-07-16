import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const SingleAvailableUnit = () => {
  return (
    <div
      className="h-screen mt-10
          "
    >
      <div className="hidden md:flex justify-center text-4xl text-white py-6 bg-[#037092]">
        <h1>Available Units</h1>
      </div>

      <div className="md:hidden flex justify-center  text-white py-6 bg-[#037092]">
        <div className="flex flex-col items-center bg-[#e6f8fc] px-10 py-4 rounded text-gray-700">
          <h1>TRAVEL DATES</h1>
          <button className="flex items-center text-2xl font-semibold">
            Select check-in <IoIosArrowDown />
          </button>
        </div>
      </div>

      <div className="flex justify-center my-10"> 
      <div className="w-10/12 flex flex-col items-center border-[1px] p-2 rounded shadow-md">
        <h1>BEFORE YOU BOOK</h1>
        <div className="divider"></div>
        <button className="flex link items-center text-xl font-semibold text-[#037092]">
         Fees & Urgent Information
        </button>
      </div>
      </div>


      <div className="flex justify-center my-10 "> 
      <div className="w-10/12 flex flex-col items-center border-[1px] p-2 rounded shadow-md">
        <h1>ADDITIONAL FEES DUE AT CHECK-IN</h1>
        <div className="divider"></div>
        <div className="px-2">
        <h1 className="text-left font-semibold">Mandatory Fees</h1>
        <p>Mandatory Security deposit is 300.00 U.S. dollars, . Only Credit Cards accepted.Mandatory Amenities fee is 10.00 U.S. dollars, . Cash or Credit is accepted.</p>

        <h1 className="text-left font-semibold pt-2">Housekeeping Fees</h1>
        <p>"Housekeeping fee for all RCI Points reservations: There may be a fee of 47.69 U.S. dollars for Hotel, per stay. Cash or Credit is accepted.""Housekeeping fee for all RCI Points reservations: There may be a fee of 67.00 U.S. dollars for 1 Bedroom units, per stay. Cash or Credit is accepted.""Housekeeping fee for all RCI Points reservations: There may be a fee of 111.35 U.S. dollars for 2 Bedroom units, per stay. Cash or Credit is accepted."</p>
        </div>
      </div>
      </div>

      <div>
          
      </div>


    </div>
  );
};

export default SingleAvailableUnit;
