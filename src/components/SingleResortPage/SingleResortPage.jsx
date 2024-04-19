import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom"; // Import useNavigate from 'react-router-dom'

const SingleResortPage = () => {
  const { resortData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const [currentResort, setCurrentResort] = useState(null);

  // Parse id to integer
  const idAsInt = parseInt(id);

  useEffect(() => {
    if (resortData && idAsInt) {
      const foundResort = resortData.find(
        (resort) => parseInt(resort._id) === idAsInt
      );
      setCurrentResort(foundResort);
    }
  }, [resortData, idAsInt]);

  // Handle navigation back
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <div>
        <button
          onClick={goBack}
          className="flex items-center m-2 text-[#037092] font-bold"
        >
          <IoIosArrowBack /> Back
        </button>
        {currentResort && (
          <div>
            <img src={currentResort.img} alt="" />
            <h2>Location: {currentResort.place_name}</h2>
            <p>Description: {currentResort.resort_details}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleResortPage;
