import React, { useState, useEffect } from "react";
import { FiHeart, FiMapPin, FiPhone, FiMap, FiWifi, FiWifiOff } from "react-icons/fi";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaBed } from "react-icons/fa";
import PgBadge from "./PgBadge";
import { TbAirConditioning, TbAirConditioningDisabled } from "react-icons/tb";
import allAPIs from '@utils/allAPIs'

const PhoneCard = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAC, setIsAC] = useState(true);

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
        <div className="flex justify-center -mt-10 p-0">
          {dots.map((item, index) => (
            <div key={index} style={{ margin: "0 2px" }}>
              {React.cloneElement(item, {
                children: (
                  <div
                    className={`w-2 h-2 rounded-full ${item.props.className.includes("slick-active")
                      ? "bg-blue-600"
                      : "bg-gray-300"
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
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userFavourites");

      if (!stored || stored === "undefined" || stored === "null" || !stored.trim().startsWith("[") || !stored.trim().endsWith("]")) {
        localStorage.removeItem("userFavourites");
        setIsLiked(false);
        return;
      }

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        localStorage.removeItem("userFavourites");
        setIsLiked(false);
        return;
      }

      setIsLiked(parsed.includes(data?.id));
    } catch (err) {
      console.error("Error parsing userFavourites from localStorage:", err);
      localStorage.removeItem("userFavourites");
      setIsLiked(false);
    }
  }, [data?.id]);

  const toggleLike = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const updatedLike = !isLiked;
    setIsLiked(updatedLike);

    try {
      await allAPIs.toggleAddToFavourites({ id: data.id });

      let storedFavourites = JSON.parse(localStorage.getItem("userFavourites")) || [];

      if (updatedLike) {
        if (!storedFavourites.includes(data.id)) {
          storedFavourites.push(data.id);
        }
      } else {
        storedFavourites = storedFavourites.filter((id) => id !== data.id);
      }

      localStorage.setItem("userFavourites", JSON.stringify(storedFavourites));
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };
  const roomTypes = ["single", "double", "triple", "four", "five", "six"];


  const getPrice = (index) => {
    const pricingObj = data?.room_pricing?.monthly?.[index];
    if (!pricingObj) return null;

    return isAC ? pricingObj.acWithFood : pricingObj.nonAcWithFood;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <div className="relative h-40 bg-blue-400">
          <Slider {...settings}>
            {data?.pictures?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${image.id}`}
                className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"
              />
            ))}
          </Slider>
        </div>

        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-br-lg tracking-wide">
          Verified+
        </span>
        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <FiHeart
            className={`w-4 h-4 ${isLiked ? "text-blue-600 fill-blue-600" : "text-gray-400"}`}
          />
        </button>

      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="w-3/4">
            <h2 className="text-md font-bold text-gray-800 leading-tight">
              {data.property_name}
            </h2>
            <p className="text-gray-600 text-xs">Premium Coliving PG</p>
          </div>
          <PgBadge category={data.category} wid="24" />
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-blue-600 text-xs">
            <FiMapPin className="w-3 h-3 mr-1" />
            <span>{data.locality}</span>
          </div>
          <div className="flex items-center space-x-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-sm">
            <FaBed size={12} />
            <span className="font-medium text-xs">
              {data.is_beds_available ? "BEDS AVAILABLE" : "BEDS NOT AVAILABLE"}
            </span>
          </div>
        </div>

        <div className="flex mb-3 rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAC(false)
            }
            }
            className={`flex-1 py-1.5 px-2 text-xs font-medium ${!isAC ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
          >
            Non-AC
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAC(true)
            }}
            className={`flex-1 py-1.5 px-2 text-xs font-medium ${isAC ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
          >
            AC
          </button>
        </div>

        <div className="mb-3 overflow-x-auto">
          <div className="flex space-x-2 pb-1" style={{ minWidth: "max-content" }}>
            {data.sharing?.map((index) => {
              const typeLabel = roomTypes[index] || `Type ${index}`;
              const price = getPrice(index);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center bg-blue-50 rounded-lg p-2 min-w-[70px]"
                >
                  <span className="text-xs text-gray-600 capitalize">{typeLabel}</span>
                  <span className="font-semibold text-blue-600 text-xs">
                    ₹{price ? price.toLocaleString() : "N/A"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <div className="flex items-center text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
            {!data?.facilities_and_services?.includes(7) ? <FiWifi className="mr-2" /> : <FiWifiOff className="mr-2" />}
            <span>Wifi</span>
          </div>
          <div className=" text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
            {!data.room_type ? <span className="flex items-center"><TbAirConditioning size={12} className="mr-2" /> AC</span> : <span className="flex items-center"><TbAirConditioningDisabled size={18} className="mr-2" />Non-AC</span>}

          </div>
          <button className="flex items-center text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
            <span>+More...</span>
          </button>
        </div>

        <div className="flex space-x-2 mb-3">
          <button href={data?.links?.gpsLocationLink} className="flex-1 underline text-blue-600 py-1 px-3 rounded-lg text-xs font-medium flex items-center justify-center">
            <FiMap className="mr-1 text-xs" />
            View on Map
          </button>
          <button href={data?.links?.virtualTour} className="flex-1 underline text-blue-600 py-1  px-3 rounded-lg text-xs font-medium flex items-center justify-center">
            <MdOutlineZoomOutMap className="mr-1 text-xs" />
            360° Virtual Tour
          </button>
        </div>

        <div className="flex space-x-2">
          <button href={`tel:${data.owner_mobile_number}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center">
            <FiPhone className="mr-1 text-xs" />
            Owner
          </button>
          <button href={`tel:${data.supervisor_mobile_number}`} className="flex-1 bg-white border border-blue-600 text-blue-600 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center">
            <FiPhone className="mr-1 text-xs" />
            Supervisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
