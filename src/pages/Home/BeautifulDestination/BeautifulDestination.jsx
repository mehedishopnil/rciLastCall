import React from "react";

const BeautifulDestination = () => {
  return (
    <div>
      <div className="text-center uppercase my-6">
        <h1 className="text-3xl homeHeader">Beautiful Destinations</h1>
        <p className="text-xl font-semibold">Even more beautiful deals</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="carousel w-full">
          {/* First carousel item */}
          <div id="slide1" className="carousel-item relative w-full">
            
            <div className=" p-5">
            <img
              src="https://clubs.rci.com/content/dam/panorama/images/us/clubs/clubs-offers/rci-magazine-fall-2024.jpg"
              className="w-full object-cover"
              alt="RCI Magazine®"
            />
              <h2 className="text-2xl font-bold">RCI Magazine®</h2>
              <p className="text-lg">
                RCI Magazine® is a curated digital resource for members,
                offering a wealth of travel inspiration, exclusive discounts,
                tips, and destination spotlights. With four editions each year,
                consider it your go-to all-in-one travel resource.
              </p>
            </div>


            <a href="#slide3" className="absolute left-0 top-1/2 transform -translate-y-1/2 btn btn-circle">❮</a>
            <a href="#slide2" className="absolute right-0 top-1/2 transform -translate-y-1/2 btn btn-circle">❯</a>
          </div>

          {/* Second carousel item */}
          <div id="slide2" className="carousel-item relative w-full">
            
            <div className=" p-5">
            <img
              src="https://www.rci.com/static/images/content/_NAMER/C82-Offers/last-minute-vacations.jpg"
              className="w-full object-cover"
              alt="Destination 2"
            />
              <h2 className="text-2xl font-bold">Last-Minute Vacations Starting at 309 </h2>
              <p className="text-lg">Explore the beauty of Destination 2</p>
            </div>
            <a href="#slide1" className="absolute left-0 top-1/2 transform -translate-y-1/2 btn btn-circle">❮</a>
            <a href="#slide3" className="absolute right-0 top-1/2 transform -translate-y-1/2 btn btn-circle">❯</a>
          </div>

          {/* Third carousel item */}
          <div id="slide3" className="carousel-item relative w-full">
            
            <div className="text-center p-5">
            <img
              src="https://www.rci.com/static/images/content/_NAMER/C82-Offers/special-offers.jpg"
              className="w-full object-cover"
              alt="Destination 3"
            />
              <h2 className="text-2xl font-bold">Destination 3</h2>
              <p className="text-lg">Explore the beauty of Destination 3</p>
            </div>
            <a href="#slide2" className="absolute left-0 top-1/2 transform -translate-y-1/2 btn btn-circle">❮</a>
            <a href="#slide1" className="absolute right-0 top-1/2 transform -translate-y-1/2 btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulDestination;
