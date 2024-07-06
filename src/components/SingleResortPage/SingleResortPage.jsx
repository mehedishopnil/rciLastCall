import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GiStarsStack } from "react-icons/gi";
import TopAmenities from "./TopAmenities/TopAmenities";
import FilterContent from "./FilterContent/FilterContent";
import Loading from "../Loading";

const SingleResortPage = () => {
  const { resortData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentResort, setCurrentResort] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (resortData && id) {
      const foundResort = resortData.find((resort) => resort._id === id);
      setCurrentResort(foundResort);
    }
  }, [resortData, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwipe("left");
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goBack = () => {
    navigate(-1);
  };

  if (!currentResort) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const {
    img,
    img2,
    img3,
    location,
    place_name,
    resort_ID,
    reviews_amount
  } = currentResort;

  // Declare and initialize additional_images here
  const additional_images = [img, img2, img3];

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % additional_images.length);
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + additional_images.length) % additional_images.length);
    }
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    e.target.ontouchmove = (moveEvent) => {
      const touchEndX = moveEvent.touches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        handleSwipe("left");
        e.target.ontouchmove = null;
      } else if (touchStartX - touchEndX < -50) {
        handleSwipe("right");
        e.target.ontouchmove = null;
      }
    };
  };

  const handleMouseDown = (e) => {
    const mouseDownX = e.clientX;
    e.target.onmousemove = (moveEvent) => {
      const mouseMoveX = moveEvent.clientX;
      if (mouseDownX - mouseMoveX > 50) {
        handleSwipe("left");
        e.target.onmousemove = null;
      } else if (mouseDownX - mouseMoveX < -50) {
        handleSwipe("right");
        e.target.onmousemove = null;
      }
    };
  };

  const handleMouseUp = (e) => {
    e.target.onmousemove = null;
  };

  return (
    <div>
      <button onClick={goBack} className="flex items-center m-2 text-[#037092] font-bold">
        <IoIosArrowBack /> Back
      </button>

      <div className="container mx-auto p-4">
        {/* Image Slider */}
        <div
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {additional_images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ${
                index === currentIndex
                  ? "translate-x-0"
                  : index < currentIndex
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <img src={image} className="w-full h-full object-cover" alt={`Slide ${index}`} />
            </div>
          ))}
        </div>

        <div className="flex justify-center py-2 gap-2">
          {additional_images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-[#037092]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <div className="p-4">
          <p className="text-lg text-[#303030]">{location}</p>
          <p>Resort ID: {resort_ID}</p>
          <h1 className="text-3xl font-semibold mt-5">{place_name}</h1>

          <div className="mt-5">
            {place_name.includes("Wyndham") && (
              <div className="flex items-center gap-2">
                <GiStarsStack />
                <h1>Wyndham owner exclusive</h1>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200"></div>

          <div className="mt-3">
            <h1>Rating</h1>
            <div className="flex items-center gap-2">
              <img
                src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
                alt="Gold Crown"
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
            <div className="flex gap-3">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
                alt="Traveler Rating"
              />
              <p className="font-bold">{reviews_amount} reviews</p>
            </div>
          </div>
        </div>

        <FilterContent currentResort={currentResort} />
      </div>
    </div>
  );
};

export default SingleResortPage;
