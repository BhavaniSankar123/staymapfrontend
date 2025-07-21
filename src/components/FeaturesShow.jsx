import React from "react";
import Slider from "react-slick";
import logo from "/assets/logo2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const FeatureShowcase = ({ features }) => {
  
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      appendDots: (dots) => (
        <div className="absolute top-2 left-0 right-0 z-10">
          <div className="flex justify-center mt-10 p-0">
            {dots.map((item, index) => (
              <div key={index} style={{ margin: "0 2px" }}>
                {React.cloneElement(item, {
                  children: (
                    <div
                      className={`w-1 h-1 rounded-full ${item.props.className.includes("slick-active")
                        ? "bg-gray-300"
                        : "bg-blue-600"
                        }`}
                    />
                  ),
                })}
              </div>
            ))}
          </div>
        </div>
      ),
      customPaging: () => <div className="w-2 h-2 rounded-full" />,
    };
  return (
    <div className="relative hidden lg:flex flex-col justify-center items-center w-1/2 bg-blue-700 text-white p-10">
      <div className="flex">
        <Link
          to={"/"}
          className="absolute top-4 left-4 flex items-center gap-2 text-white  px-2 py-2 "
        >
          <BiArrowBack size={20} />
          <span className="font-medium text-sm">Back to Staymap</span>
        </Link>
      </div>
      <Link to="/" className="flex justify-center items-center space-x-4 mb-5">
        <img className="h-12 w-12" src={logo} alt="Logo" />
        <h3 className="text-3xl font-bold tracking-wide">StayMap</h3>
      </Link>

      <h1 className="text-xl font-bold tracking-wide text-center">
        Get Started With StayMap
      </h1>

      <div className="mt-6 w-full max-w-xs">
        <Slider {...settings} className="relative">
          {features.map((feature, index) => (
            <div key={index} className="p-4">
              <div className="w-full flex flex-col items-center justify-center text-center space-y-4 text-white text-lg">
                <span className="text-3xl">{feature.icon}</span>
                <p className="px-6 text-sm">{feature.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeatureShowcase;
