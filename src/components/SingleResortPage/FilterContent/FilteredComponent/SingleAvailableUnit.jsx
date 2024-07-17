import  { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate


const SingleAvailableUnit = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: "selection",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentResort } = location.state || {};

  console.log(currentResort)

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setSelectionRange({
      startDate: selection.startDate,
      endDate: addDays(selection.startDate, 6),
      key: "selection",
    });
  };

  const handleDateButtonClick = (unitType) => {
    setSelectedUnit(unitType);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleShowUnits = () => {
    navigate("/available-booking", {
      state: { 
        resort: currentResort,
        startDate: selectionRange.startDate,
        endDate: selectionRange.endDate,
        unitType: selectedUnit,
      },
    });
  };

  const handleClearDate = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: "selection",
    });
    setIsCalendarOpen(false);
  };


  return (
    <div className="mt-10">
      <div className="hidden md:flex justify-center text-4xl text-white py-6 bg-[#037092]">
        <h1 className="">Available Units</h1>
      </div>

      <div className="md:hidden flex justify-center text-white py-6 bg-[#037092]">
        <div className="flex flex-col items-center bg-[#e6f8fc] px-10 py-4 rounded text-gray-700">
          <h1>TRAVEL DATES</h1>
          <button
            className="flex items-center text-2xl font-semibold"
            onClick={() => handleDateButtonClick('studio')}
          >
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

      {/* <div className="flex justify-center my-10">
        <div className="w-10/12 flex flex-col items-center border-[1px] p-2 rounded shadow-md">
          <h1>ADDITIONAL FEES DUE AT CHECK-IN</h1>
          <div className="divider"></div>
          <div className="px-2">
            <h1 className="text-left font-semibold">Mandatory Fees</h1>
            <p>
              Mandatory Security deposit is 300.00 U.S. dollars, . Only Credit
              Cards accepted.Mandatory Amenities fee is 10.00 U.S. dollars, .
              Cash or Credit is accepted.
            </p>

            <h1 className="text-left font-semibold pt-2">Housekeeping Fees</h1>
            <p>
              "Housekeeping fee for all RCI Points reservations: There may be a
              fee of 47.69 U.S. dollars for Hotel, per stay. Cash or Credit is
              accepted.""Housekeeping fee for all RCI Points reservations: There
              may be a fee of 67.00 U.S. dollars for 1 Bedroom units, per stay.
              Cash or Credit is accepted.""Housekeeping fee for all RCI Points
              reservations: There may be a fee of 111.35 U.S. dollars for 2
              Bedroom units, per stay. Cash or Credit is accepted."
            </p>
          </div>
        </div>
      </div> */}

      <div className="divider"></div>

      <div>
        <h1 className="text-center text-xl font-semibold">Available Units</h1>
        <div className="text-center mt-5 py-3 shadow-md">
          <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">Studio</h1>
          <button
            className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
            onClick={() => handleDateButtonClick('studio')}
          >
            Select Date
          </button>
        </div>

        <div className="text-center mt-5 py-3 shadow-md">
          <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">1 bedroom</h1>
          <button
            className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
            onClick={() => handleDateButtonClick('1 bedroom')}
          >
            Select Date
          </button>
        </div>

        <div className="text-center mt-5 py-3 shadow-md">
          <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">2 bedroom</h1>
          <button
            className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
            onClick={() => handleDateButtonClick('2 bedroom')}
          >
            Select Date
          </button>
        </div>
      </div>

      {isCalendarOpen && (
        <div className="fixed inset-0 flex flex-col justify-between bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Booking Dates</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleCloseCalendar}
              >
                Close
              </button>
            </div>
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              maxDate={addDays(new Date(), 365)} // Optional: Set a maximum date
              direction="vertical"
              moveRangeOnFirstSelection={false}
              rangeColors={["#0370ad"]}
              months={1}
              className="w-full"
            />
            <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg mx-auto mb-5">
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={handleShowUnits}
                >
                  Show Units
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={handleClearDate}
                >
                  Clear Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAvailableUnit;
