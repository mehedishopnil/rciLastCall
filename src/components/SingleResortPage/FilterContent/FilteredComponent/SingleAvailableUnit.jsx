import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { IoIosArrowDown } from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../../../../context/AuthProvider";
import Swal from "sweetalert2";
import RequiredForm from "../../../RequiredForm/RequiredForm";

const SingleAvailableUnit = () => {
  const { user } = useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track form submission
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: "selection",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();
  const currentResort = JSON.parse(localStorage.getItem("currentResort"));

  if (!currentResort) {
    return <div>Error: No resort data found.</div>;
  }

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setSelectionRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: "selection",
    });
  };

  const handleDateButtonClick = (unitType) => {
    setSelectedUnit(unitType);
    if (!isFormSubmitted) {
      Swal.fire({
        title: "Submit Required Information First",
        text: "You need to submit your age, security deposit, and ID before selecting a date.",
        icon: "info",
      });
    } else {
      setIsCalendarOpen(true);
    }
  };

  const handleShowUnits = () => {
    if (user) {
      navigate("/available-booking", {
        state: {
          resort: currentResort,
          startDate: selectionRange.startDate,
          endDate: selectionRange.endDate,
          unitType: selectedUnit,
        },
      });
    } else {
      navigate("/login", {
        state: { from: location.pathname },
      });
    }
  };

  const handleClearDate = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: "selection",
    });
    setIsCalendarOpen(false);
  };

  // Form submit handler
  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
    Swal.fire({
      icon: "success",
      title: "Form submitted successfully!",
      text: "You can now select booking dates.",
    });
  };

  return (
    <div className="mt-10">
      <div className="hidden md:flex justify-center text-4xl text-white py-6 bg-[#037092]">
        <h1> Available Units</h1>
      </div>

      {/* Required Form */}
      {!isFormSubmitted && <RequiredForm onSubmit={handleFormSubmit} />}

      {/* Booking section (visible only if form is submitted) */}
      {isFormSubmitted && (
        <>
          <div className="mx-4">
            <h1 className="text-center text-xl font-semibold">Available Units</h1>
            <div className="text-center mt-5 py-3 shadow-md">
              <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">Studio</h1>
              <button
                className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
                onClick={() => handleDateButtonClick("studio")}
              >
                Select Date
              </button>
            </div>

            <div className="text-center mt-5 py-3 shadow-md">
              <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">1 bedroom</h1>
              <button
                className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
                onClick={() => handleDateButtonClick("1 bedroom")}
              >
                Select Date
              </button>
            </div>

            <div className="text-center mt-5 py-3 shadow-md">
              <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">2 bedroom</h1>
              <button
                className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
                onClick={() => handleDateButtonClick("2 bedroom")}
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
                    onClick={handleClearDate}
                  >
                    <IoIosArrowDown size={24} />
                  </button>
                </div>

                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  editableDateInputs={true}
                />
                <button
                  className="mt-5 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleShowUnits}
                >
                  Confirm Dates
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleAvailableUnit;
