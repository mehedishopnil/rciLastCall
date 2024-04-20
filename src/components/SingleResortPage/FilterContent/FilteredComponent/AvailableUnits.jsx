import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const AvailableUnits = () => {
  return (
    <div>
      <div className="w-full px-5 py-2 space-y-2 bg-[#037092]">
        <div className=" flex flex-col items-center rounded py-1 bg-[#e6f8fc]">
          <h1>TRAVEL DATES</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Select check-in</h1>
            <FaChevronDown />
          </div>
        </div>

        <div className=" flex flex-col items-center rounded py-1 bg-[#e6f8fc]">
          <h1>TRAVEL DATES</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Select check-in</h1>
            <FaChevronDown />
          </div>
        </div>
      </div>

      <div className="text-center border mt-3 p-4 rounded shadow-md">
        <h1>BEFORE YOU BOOK</h1>

        <div className="border-b border-gray-200"></div>

        <Link>
          <h1 className="underline font-semibold text-[#037092]">
            Fees & Urgent Information
          </h1>
        </Link>
      </div>

      <div className="border-b my-5 border-gray-200 "></div>

      <div>
        <h1 className="text-center font-semibold">86 Available Units</h1>

        <div className="relative flex justify-center my-3 ">

          <h1 className="absolute left-0 w-1/2 text-center rounded-l-full bg-[#037092] text-white font-semibold border">
            TYPE OF UNIT
          </h1>
          <h1 className="absolute right-0 w-1/2 text-center rounded-r-full bg-white font-semibold border">
          DATE AVAILABLE
          </h1>
        </div>
      </div>

      <div className="border-b my-10 border-gray-200 "></div>

      <p className="text-center">This resort collects a mandatory all-inclusive fee based on age and number of guests.</p>

    </div>
  );
};

export default AvailableUnits;
