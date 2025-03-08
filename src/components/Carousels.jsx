import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const Carousels = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://placehold.co/100x30?text=Slide+1",
    // "https://tinyurl.com/mt5ysvsx",
    "https://placehold.co/100x30?text=Slide+2",
    "https://placehold.co/100x30?text=Slide+3",
    "https://placehold.co/100x30?text=Slide+4",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative pt-4">
      <div className="carousel p-8 pt-2">
        <div className="carousel-inner relative overflow-hidden w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item relative float-left w-full ${
                index === currentSlide ? "block" : "hidden"
              }`}
            >
              <img
                src={slide}
                className="block w-full"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`rounded-full ${
              index === currentSlide
                ? "w-6 h-3 bg-blue-500"
                : "w-3 h-3 bg-gray-300"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 ml-5 rounded-full bg-white/30  group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <MdKeyboardArrowLeft className="w-10 h-10 text-white   rtl:rotate-180" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 mr-5 rounded-full bg-white/30  group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <MdKeyboardArrowRight className="w-10 h-10 text-white  rtl:rotate-180" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousels;
