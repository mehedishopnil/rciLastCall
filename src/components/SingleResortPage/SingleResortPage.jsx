import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GiStarsStack } from "react-icons/gi";
import TopAmenities from "./TopAmenities/TopAmenities";
import FilterContent from "./FilterContent/FilterContent";

const SingleResortPage = () => {
  const { resortData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentResort, setCurrentResort] = useState(null);

  useEffect(() => {
    if (resortData && id) {
      const foundResort = resortData.find((resort) => resort._id === id);
      setCurrentResort(foundResort);
    }
  }, [resortData, id]);

  // Handle navigation back
  const goBack = () => {
    navigate(-1);
  };

  // Check if currentResort is null or undefined
  if (!currentResort) {
    return <div>Loading...</div>; // Render loading state or handle differently
  }

  // Destructure the contents from currentResort
  const {
    img,
    location,
    resort_id,
    place_name,
    resort_details,
    price_usd,
    check_in_time,
    check_out_time,
    rating,
    reviews_amount,
  } = currentResort;

  const { sleeps_room, privacy_room_amount, kitchen, bath } =
    currentResort.room_details;

  return (
    <div>
      <button
        onClick={goBack}
        className="flex items-center m-2 text-[#037092] font-bold"
      >
        <IoIosArrowBack /> Back
      </button>
      <div>
        <img src={img} alt="" />
        <div className="p-4">
          <p className="text-lg text-[#303030]">{location}</p>
          <p>Resort ID:</p>
          <h1 className="text-3xl font-semibold mt-5">{place_name}</h1>

          <div className="mt-5">
            <h1>All Inclusive</h1>
            <div className="flex items-center gap-2">
              <GiStarsStack />
              <h1>Mandatory</h1>
            </div>
          </div>

          <div className="border-b border-gray-200"></div>

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

          <div className="border-b border-gray-200"></div>

          <div className="mt-2">
            <h1>Top Amenities</h1>
            <TopAmenities />
          </div>

          <div className="border-b border-gray-200"></div>

          <div className="mt-2">
            <h1 className="font-semibold">TripAdvisor Traveler Rating</h1>
            <div className=" flex gap-3">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
                alt=""
              />
              {/* You need to add reviews_amount in resort object */}
              <p className="font-bold">{reviews_amount} reviews</p>
            </div>

            
          </div>

          {/* Filter info of the resort */}
          <div>
          <FilterContent resort={currentResort} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SingleResortPage;
