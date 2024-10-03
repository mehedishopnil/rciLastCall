import React, { useState, useEffect } from "react";
import "daisyui"; // ensure daisyUI is installed

const BeautifulDestination = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const destinations = [
    {
      image: "https://clubs.rci.com/content/dam/panorama/images/us/clubs/clubs-offers/rci-magazine-fall-2024.jpg",
      title: "RCI Magazine®",
      description: `RCI Magazine® is a curated digital resource for members,
      offering a wealth of travel inspiration, exclusive discounts,
      tips, and destination spotlights. With four editions each year,
      consider it your go-to all-in-one travel resource.`
    },
    {
      image: "https://www.rci.com/static/images/content/_NAMER/C82-Offers/last-minute-vacations.jpg",
      title: "Last-Minute Vacations",
      description: "Vacation for travel in the next 45 days."
    },
    {
      image: "https://www.rci.com/static/images/content/_NAMER/C82-Offers/special-offers.jpg",
      title: "Resort Deals",
      description: `Enjoy deals such as discounted all-inclusive fees, resort
                credits, free stays for kids and more to save on your next vacation!`
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === destinations.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? destinations.length - 1 : prevSlide - 1
    );
  };

  return (
    <div>
      <div className="text-center uppercase my-6">
        <h1 className="text-3xl homeHeader">Beautiful Destinations</h1>
        <p className="text-xl font-semibold">Even more beautiful deals</p>
      </div>

      {/* Carousel */}
      <div className="carousel w-full ">
        <div className=" flex flex-col carousel-item relative  w-full x-5">
          <img
            src={destinations[currentSlide].image}
            className="w-full h-60 object-cover rounded-t-lg"
            alt={destinations[currentSlide].title}
          />
          <div className="bg-white p-4 rounded-b-lg">
            <h2 className="text-2xl font-bold">{destinations[currentSlide].title}</h2>
            <p className="text-lg">{destinations[currentSlide].description}</p>
          </div>

          {/* Carousel Controls */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 btn btn-circle"
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 btn btn-circle"
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeautifulDestination;
