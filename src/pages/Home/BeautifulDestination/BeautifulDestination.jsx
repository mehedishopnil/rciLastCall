import React, { useState, useEffect } from "react";
import "daisyui"; // ensure daisyUI is installed

const BeautifulDestination = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const destinations = [
    {
      image: "https://clubs.rci.com/content/dam/panorama/images/us/clubs/clubs-offers/rci-magazine-fall-2024.jpg",
      title: "RCI Magazine®",
      description: `RCI Magazine® is a curated digital resource for members,
      offering a wealth of travel inspiration, exclusive discounts,
      tips, and destination spotlights. With four editions each year,
      consider it your go-to all-in-one travel resource.`,
    },
    {
      image: "https://www.rci.com/static/images/content/_NAMER/C82-Offers/last-minute-vacations.jpg",
      title: "Last-Minute Vacations Starting at 309 ",
      description: "Book a Last Call, Vacation for travel in the next 45 days.",
    },
    {
      image: "https://www.rci.com/static/images/content/_NAMER/C82-Offers/special-offers.jpg",
      title: "Resort Deals available in top destinations!",
      description: `Enjoy deals such as discounted all-inclusive fees, resort
                credits, free stays for kids, and more to save on your next vacation!`,
    },
  ];

  // Function to auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? destinations.length - 1 : prevSlide - 1
    );
  };

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide(); // swipe left
    }
    if (touchStart - touchEnd < -75) {
      prevSlide(); // swipe right
    }
  };

  return (
    <div>
      <div className="text-center uppercase my-6">
        <h1 className="text-3xl homeHeader">Beautiful Destinations</h1>
        <p className="text-xl font-semibold">Even more beautiful deals</p>
      </div>

      {/* Carousel */}
      <div
        className="carousel w-full flex overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentSlide % destinations.length) * 50}%)`,
          }}
        >
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="flex flex-col carousel-item w-1/2 p-4"
            >
              <img
                src={destination.image}
                className="w-full h-60 object-cover rounded-lg"
                alt={destination.title}
              />
              <div className="bg-white p-4 rounded-b-lg">
                <h2 className="text-2xl font-bold mt-4">
                  {destination.title}
                </h2>
                <p className="text-lg mt-2">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeautifulDestination;
