import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const AvailableUnits = ({available_amount}) => {
  return (
    <div>
      {/* Travel Dates Section */}
      <div className="w-full px-5 py-2 space-y-2 bg-[#037092]">
        <div className="flex flex-col items-center rounded py-1 bg-[#e6f8fc]">
          <h1>TRAVEL DATES</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Select check-in</h1>
            <FaChevronDown />
          </div>
        </div>

        {/* Another Travel Dates Section */}
        <div className="flex flex-col items-center rounded py-1 bg-[#e6f8fc]">
          <h1>TRAVEL DATES</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Select check-in</h1>
            <FaChevronDown />
          </div>
        </div>
      </div>

      {/* Before You Book Section */}
      <div className="text-center border mt-3 p-4 rounded shadow-md">
        <h1>BEFORE YOU BOOK</h1>
        <div className="border border-gray-200"></div>

        {/* Link to Fees & Urgent Information */}
        <Link>
          <h1 className="underline font-semibold text-[#037092]">
            Fees & Urgent Information
          </h1>
        </Link>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Available Units */}
      <div>
      <div className="card text-center bg-[#c8ebff] border py-3">
        <h1 className="text-lg font-bold text-[#0f2f75]">This Resort is Available</h1>
      </div>

        {/* <h1 className="text-center font-semibold">{available_amount} Available Units</h1>
        <div className="relative flex justify-center  my-3 ">
          <h1 className="absolute left-0 w-1/2 text-center rounded-l-full bg-[#037092] text-white font-semibold border border-gray-500">
            TYPE OF UNIT
          </h1>
          <h1 className="absolute right-0 w-1/2 text-center rounded-r-full bg-white font-semibold border border-gray-500">
            DATE AVAILABLE
          </h1>
        </div> */}
      </div>

      {/* Divider */}
      <div className="divider my-10"></div>

      {/* Mandatory All-Inclusive Fee */}
      {/* <p className="text-center">
        This resort collects a mandatory all-inclusive fee based on age and number of guests.
      </p> */}
    </div>
  );
};

export default AvailableUnits;
