import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GiStarsStack } from "react-icons/gi";
import TopAmenities from "./TopAmenities/TopAmenities";
import FilterContent from "./FilterContent/FilterContent";
import Loading from "../Loading";

const SingleResortPage = () => {
  // Accessing global state and functions from AuthContext
  const { resortData } = useContext(AuthContext);

  // Extracting parameters from the URL
  const { id } = useParams();

  // Hook for navigating to different pages
  const navigate = useNavigate();

  // State to hold the current resort data
  const [currentResort, setCurrentResort] = useState(null);

  // Effect hook to update currentResort when resortData or id changes
  useEffect(() => {
    // Check if resortData and id are available
    if (resortData && id) {
      // Find the resort with the matching id
      const foundResort = resortData.find((resort) => resort._id === id);
      setCurrentResort(foundResort);
    }
  }, [resortData, id]);

  // Function to navigate back
  const goBack = () => {
    navigate(-1);
  };

  // Check if currentResort is null or undefined
  if (!currentResort) {
    return <div><Loading/></div>; // Render loading state or handle differently
  }

  // Destructure the contents from currentResort
  const {
    img,
    location,
    place_name,
    resort_details,
    reviews_amount,
  } = currentResort;

  return (
    <div>
      {/* Button to navigate back */}
      <button
        onClick={goBack}
        className="flex items-center m-2 text-[#037092] font-bold"
      >
        <IoIosArrowBack /> Back
      </button>

      {/* Resort details */}
      <div>
        <img src={img} alt="" />
        <div className="">
          <div className="p-4">
            {/* Location and Resort ID */}
            <p className="text-lg text-[#303030]">{location}</p>
            <p>Resort ID: {resort_details}</p>
            <h1 className="text-3xl font-semibold mt-5">{place_name}</h1>

            {/* All Inclusive section */}
            <div className="mt-5">
              <h1>All Inclusive</h1>
              <div className="flex items-center gap-2">
                <GiStarsStack />
                <h1>Mandatory</h1>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200"></div>

            {/* Rating section */}
            <div className="mt-3">
              <h1>Rating</h1>
              <div className="flex items-center gap-2">
                <img
                  src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
                  alt=""
                />
                <h1>RCI Gold Crown</h1>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200"></div>

            {/* Top Amenities */}
            <div className="mt-2">
              <h1>Top Amenities</h1>
              <TopAmenities />
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200"></div>

            {/* TripAdvisor Traveler Rating */}
            <div className="mt-2">
              <h1 className="font-semibold">TripAdvisor Traveler Rating</h1>
              <div className="flex gap-3">
                <img
                  src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
                  alt=""
                />
                <p className="font-bold">{reviews_amount} reviews</p>
              </div>
            </div>
          </div>

          {/* Filter info of the resort */}
          <div>
            <FilterContent currentResort={currentResort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResortPage;
