import { useState, useEffect } from "react";
import { FiMapPin, FiWifi, FiWifiOff } from "react-icons/fi";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { Md360 } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";
import { categoryMap, CustomNextArrow, CustomPrevArrow } from '@utils/Constants';
import { TbAirConditioning, TbAirConditioningDisabled } from "react-icons/tb";
import allAPIs from '@utils/allAPIs'
const PgCard = ({ data }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isFavourite, setIsFavorite] = useState(false);
  const handleFavorite = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedFav = !isFavourite;
    setIsFavorite(updatedFav);

    try {
      await allAPIs.toggleAddToFavourites({ id: data.id });

      let storedFavourites = JSON.parse(localStorage.getItem("userFavourites")) || [];

      if (updatedFav) {
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


  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsToggle(!isToggle);
  };
  useEffect(() => {
    try {
      const stored = localStorage.getItem("userFavourites");

      if (!stored || stored === "undefined" || stored === "null") {
        localStorage.removeItem("userFavourites");
        setIsFavorite(false);
        return;
      }

      const storedFavourites = JSON.parse(stored);

      if (!Array.isArray(storedFavourites)) {
        localStorage.removeItem("userFavourites");
        setIsFavorite(false);
        return;
      }

      const isFav = storedFavourites.includes(data?.id);
      setIsFavorite(isFav);
    } catch (err) {
      console.error("Error parsing userFavourites from localStorage:", err);
      localStorage.removeItem("userFavourites");
      setIsFavorite(false);
    }
  }, [data?.id]);

  const categoryLabel =
    categoryMap.find((item) => item.category === data.category)?.label ||
    "Colive";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const sharingTypes = data.sharing
  sharingTypes.sort();
  const pricingData = data?.room_pricing?.monthly
  return (
    <div className="w-full">
      <div className="bg-blue-50 w-full rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 relative overflow-visible">
            <Slider {...settings}>
              {data?.pictures?.map((img, index) => (
                <div key={index} className="w-full h-52 z-10">
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-span-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-2 uppercase">
                    Verified+
                  </span>
                  <h3 className="text-xl font-bold text-blue-900">
                    {data.property_name}
                  </h3>
                </div>
                <div className="flex items-center text-xs text-blue-700 mb-4">
                  <FiMapPin className="mr-1" />
                  <span>{data.locality}</span>
                </div>
              </div>
              <div className="flex items-center cursor-pointer">
                <div
                  onClick={handleFavorite}
                  className="text-blue-700 text-2xl"
                >
                  {isFavourite ? (
                    <PiHeartStraightFill />
                  ) : (
                    <PiHeartStraightLight />
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 py-2 w-full border border-x-0 border-y-gray-300 bg-blue-50 divide-x-[1px] divide-[#909090] overflow-x-auto">

              {sharingTypes?.map((shareCount, index) => {
                const price = isToggle
                  ? pricingData[shareCount]?.acWithFood
                  : pricingData[shareCount]?.nonAcWithFood;

                return (
                  <div className="text-blue-800 text-sm px-3 min-w-fit" key={index}>
                    <p>{shareCount + 1} Sharing</p>
                    <span className="flex font-semibold text-sm text-black">
                      <MdCurrencyRupee className="mt-0.5" /> {price || "N/A"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center mb-2 mt-2">
              <span className="font-medium text-blue-800 text-sm">Non-AC</span>
              <div className="-mt-1.5">
                {data.room_type.includes(0) ? (
                  !isToggle ? (
                    <BsToggleOff
                      onClick={handleToggle}
                      className="text-3xl text-gray-400 pl-2 pt-1 cursor-pointer"
                    />
                  ) : (
                    <BsToggleOn
                      onClick={handleToggle}
                      className="text-3xl text-blue-600 pl-2 pt-1 cursor-pointer"
                    />
                  )
                ) : (
                  <BsToggleOff className="text-3xl text-gray-400 pl-2 pt-1 cursor-not-allowed opacity-50" />
                )}
              </div>
              <span className="font-medium text-blue-800 ml-2 text-sm">AC</span>
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex space-x-4 mb-4 md:mb-0 text-sm">
                <a href={`tel:${data.owner_mobile_number}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 transform hover:scale-105">
                  Contact Owner
                </a>
                <a href={`tel:${data.supervisor_mobile_number}`} className="border border-blue-800 text-blue-800 px-4 py-1.5 rounded-md transition-colors duration-300 transform hover:scale-105">
                  Contact Supervisor
                </a>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <a href={data.links.gpsLocationLink} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <span className="underline">view on map</span>
                  <FiMapPin className="ml-1" />
                </a>
                <a href={data.links.virtualTour} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <span className="underline">view on</span>
                  <Md360 className="ml-1 text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between">
          <div className="flex gap-4">
            <div
              className={`flex items-center text-white px-3 py-1 rounded-md ${data.category === 0
                ? "bg-[#1D3986]"
                : data.category === 1
                  ? "bg-[#F19]"
                  : "bg-[#38B2AC]"
                }`}
            >
              <span className="font-medium text-sm">{categoryLabel}</span>
            </div>
            <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-md">
              <FaBed className="mr-2" />
              <span className="font-medium uppercase text-sm">
                {data.is_beds_available ? "Beds Available" : "Beds Not Available"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-blue-600">
              {data.facilities_and_services.includes(7) ? <FiWifi className="mr-2" /> : <FiWifiOff className="mr-2" />}
              <span>WiFi</span>
            </div>
            <div className=" text-blue-600">
              {data.room_type ? <span className="flex items-center"><TbAirConditioning size={12} className="mr-2" /> AC</span> : <span className="flex items-center"><TbAirConditioningDisabled size={18} className="mr-2" />Non-AC</span>}

            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <span>+More...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgCard;
