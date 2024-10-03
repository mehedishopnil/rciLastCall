import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PopularDestinations = () => {
  const destinations = [
    { title: 'ORLANDO', imgUrl: 'https://www.rci.com/static/images/content/_NAMER/C66-Titles-With-TextOverlay/256x320Orlando.jpg' },
    { title: 'LAS VEGAS', imgUrl: 'https://www.rci.com/static/images/content/_NAMER/C66-Titles-With-TextOverlay/256x320las-vegas-2.jpg' },
    { title: 'HILTON HEAD', imgUrl: 'https://www.rci.com/static/images/content/_NAMER/C66-Titles-With-TextOverlay/256x320Hilton-Head.jpg' },
    { title: 'SHENANDOAH VALLEY', imgUrl: 'https://www.rci.com/static/images/content/_NAMER/C66-Titles-With-TextOverlay/256x320Shenandoah-Valley.jpg' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show two slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Slider {...settings}>
        {destinations.map((destination, index) => (
          <div key={index} className="p-2">
            <div className="relative">
              <img
                src={destination.imgUrl}
                alt={destination.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg ">
                <h3 className="absolute bottom-5 mx-4 text-white text-2xl font-semibold">{destination.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularDestinations;
