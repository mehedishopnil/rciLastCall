import React, { useState } from "react";
import { FaBed, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { MdBathtub, MdKitchen, MdMeetingRoom } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import GuestInfo from "./guestInfo";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ProtectInfoSection = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div className="ml-5">
      {/* Title and toggle arrow */}
      <h1
        className="flex items-center gap-2 font-semibold text-lg text-[#2383a1] cursor-pointer"
        onClick={toggleInfoVisibility}
      >
        How we protect your information{" "}
        {isInfoVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </h1>

      {/* Information section, conditionally rendered */}
      {isInfoVisible && (
        <p className="mt-2 text-gray-600">
          We have implemented appropriate physical, electronic, and managerial
          procedures to help secure your information. To help safeguard your
          information, always protect your password and make sure to sign out
          from rci.com when finished using a shared device.
        </p>
      )}
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, startDate, endDate, unitType, price } = location.state || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);

  if (!resort) {
    return <div>Error: No booking information provided.</div>;
  }

  const { img, place_name, location: resortLocation, resort_ID, room_details, check_in_time, check_out_time } = resort;

  // Function to get room details based on unitType
  const getRoomDetails = () => {
    if (unitType === "studio") {
      return {
        bath: room_details.studio_bath,
        kitchen: room_details.studio_kitchen,
        privacy_room_amount: room_details.studio_privacy_room_amount,
        sleeps_room: room_details.studio_sleeps_room,
      };
    } else {
      // Assuming unitType can only be 'studio' or 'bedroom'
      return {
        bath: room_details.bath,
        kitchen: room_details.kitchen,
        privacy_room_amount: room_details.privacy_room_amount,
        sleeps_room: room_details.sleeps_room,
      };
    }
  };

  const { bath, kitchen, privacy_room_amount, sleeps_room } = getRoomDetails();

  // Function to handle the continue button click
  const handleContinue = () => {
    if (selectedOption) {
      if (selectedOption === "A Guest" && !guestInfo) {
        alert("Please fill out the guest information before continuing.");
        return;
      }

      // Prepare the data to send to the payment route
      const bookingData = {
        resort,
        startDate,
        endDate,
        unitType,
        price,
        isGuest: selectedOption === "A Guest" ? "True" : "False",
        guestInfo: selectedOption === "A Guest" ? guestInfo : null,
      };

      navigate("/payment", {
        state: bookingData,
      });
    } else {
      alert("Please select an option before continuing.");
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-2xl font-semibold">Checkout</h1>
      <div className="divider"></div>
      <div className="md:grid grid-cols-3 gap-4 space-y-5 md:space-y-2 mx-5 p-4 border border-gray-300">
        <img src={img} alt={place_name} className="col-span-1" />
        <div className="col-span-2 p-4">
          <p className="md:hidden">{resortLocation}</p>
          <h1 className="font-bold text-xl md:text-lg">{place_name}</h1>
          <p>
            Resort ID: <span className="font-medium">{resort_ID}</span>
          </p>

          <div className="mt-3 space-y-1 font-semibold text-gray-600">
            <p>
              Travel Dates:{" "}
              <span className="font-semibold">
                {new Date(startDate).toLocaleDateString()} -{" "}
                {new Date(endDate).toLocaleDateString()}
              </span>
            </p>
            <div className="md:flex gap-5">
              <p>
                Check-in: <span className="font-semibold">{check_in_time}</span>
              </p>
              <p>
                Check-out: <span className="font-semibold">{check_out_time}</span>
              </p>
            </div>

            {/* Display room details based on unitType */}
            <div className="md:grid grid-cols-2 gap-2 text-lg text-gray-500">
              <p className="flex gap-2 items-center ">
                <MdBathtub /> {bath}
              </p>
              <p className="flex gap-2 items-center">
                <MdKitchen /> {kitchen} Kitchen
              </p>
              <p className="flex gap-2 items-center">
                <MdMeetingRoom /> {privacy_room_amount} Privacy
              </p>
              <p className="flex gap-2 items-center">
                <FaBed /> {sleeps_room} Sleep
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 mx-5 border border-gray-300">
        <h1 className="text-4xl font-bold p-4 bg-[#e6f8fc]">Who's Checking-in?</h1>
        <div>
          <div className="flex justify-center w-full gap-8 p-4">
            <div
              className={`w-full h-1/2 flex flex-col items-center px-14 py-6 shadow-md border border-gray-200 rounded hover:shadow-lg hover:border hover:border-blue-700 cursor-pointer ${selectedOption === "RCI Member" ? "border-blue-700" : ""}`}
              onClick={() => setSelectedOption("RCI Member")}
            >
              <img className="w-14" src="https://clubs.rci.com/static/media/rci-member.455654d9.svg" alt="RCI Member" />
              <h1 className="text-lg pt-2">RCI Member</h1>
              {selectedOption === "RCI Member" && <FaCheckCircle className="text-green-500 mt-2" />}
            </div>

            <div
              className={`w-full h-1/2 flex flex-col items-center px-14 py-6 shadow-md rounded border border-gray-200 hover:shadow-lg hover:border hover:border-blue-700 cursor-pointer ${selectedOption === "A Guest" ? "border-blue-700" : ""}`}
              onClick={() => setSelectedOption("A Guest")}
            >
              <img className="w-14" src="https://clubs.rci.com/static/media/guest.86a36989.svg" alt="Guest" />
              <h1 className="text-xl pt-2">A Guest</h1>
              {selectedOption === "A Guest" && <FaCheckCircle className="text-green-500 mt-2" />}
            </div>
          </div>

          {selectedOption === "A Guest" && <GuestInfo onGuestInfoChange={setGuestInfo} />}
          <div className="p-6">
            <p>
              If you have selected RCI Member, that individual must check-in for
              this vacation.
            </p>
          </div>
        </div>
      </div>

      {/* Continue to the payment Section */}
      <div className="md:grid grid-cols-2 items-center justify-between my-5 px-4 py-4 h-auto z-50 sticky bottom-0 bg-slate-100">
        <div className="flex justify-between font-semibold py-2 gap-10 row-span-1">
          <h1>View RCI Charges</h1>
          <h1 className="text-sm">
            <span className="text-lg">${price}</span> USD + TAX
          </h1>
        </div>

        <div className="flex w-full row-span-1">
          <button
            className="w-full font-2xl py-2 rounded uppercase font-bold bg-yellow-400 shadow"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>

      {/* How we protect your information Section */}
      <ProtectInfoSection />
    </div>
  );
};

export default Checkout;
