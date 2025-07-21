import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiMapPin, FiWifi, FiWifiOff } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import PgBadge from "@components/PgBadge";
import allAPIs from "@utils/allAPIs";
import { TbAirConditioning, TbAirConditioningDisabled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const RecentlyAdded = () => {
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await allAPIs.getVerifiedProperties({ page: 1, limit: 3, sort: "DESC" });
        if (response.data.status) {
          setProperties(response.data.data);
        } else {
          setProperties([]);
        }
      } catch (err) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const findMinPrice = (sharingtype, sharing) => {
    const allPrices = Object.entries(sharingtype)
    const maxShare = Math.max(...sharing)
    const minPrice = allPrices[maxShare][1].nonAcWithFood || allPrices[maxShare][1].acWithFood || allPrices[maxShare][1].acWithoutFood || allPrices[maxShare][1].nonAcWithoutFood || 0;
    return minPrice;
  };
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/property/${id}`);
  };
  const mobileProperties =
    properties.length === 1 ? [...properties, { ...properties[0] }] : properties;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };
  const settings2 = {
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
        <div className="flex justify-center -mt-10 md:-mt-12">
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
  return (
    <div className="container py-12">
      <h2 className="text-2xl text-blue-700 font-bold text-center mb-2">
        Recently Added Properties
      </h2>
      <p className="text-gray-600 text-center mb-12">
        Find your perfect living space
      </p>

      <div>
        <div className="hidden md:grid grid-cols-3 gap-6">
          {properties.map((property, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}

              whileHover={{ y: -5 }}
              className="bg-white rounded-xl  shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-60 bg-blue-400">
                <Slider {...settings2}>
                  {property.pictures.map((image, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={image}
                        alt={`Image ${idx}`}
                        className="h-60 w-full object-cover"
                      />
                    </div>
                  ))}
                </Slider>
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1  rounded-br-lg tracking-wide">
                  Verified+
                </span>
                <span className="absolute top-52 left-3 bg-green-600 text-white text-xs px-2 py-1">
                  New
                </span>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold line-clamp-1">
                      {property.property_name}
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center mt-1">
                      <FiMapPin className="mr-1" />{" "}
                      <span className="line-clamp-1">{property.locality}</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <PgBadge category={property.category} wid="18" />
                  </div>
                </div>

                <div className="flex justify-between items-center my-3">
                  <span className="flex text-blue-600 font-bold text-sm">
                    <MdCurrencyRupee className="mt-1" />{" "}
                    <span>{findMinPrice(property.room_pricing.monthly, property.sharing)}/- onwards</span>
                  </span>
                </div>

                <div className="mt-4 flex justify-between">
                  <div className="flex flex-wrap gap-1">
                    <div className="flex items-center text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
                      {property.facilities_and_services?.includes(7) ? <FiWifi className="mr-2" /> : <FiWifiOff className="mr-2" />}
                      <span>Wifi</span>
                    </div>
                    <div className=" text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
                      {!property.room_type ? <span className="flex items-center mt-2"><TbAirConditioning size={12} className="mr-2 " /> <span>AC</span></span> : <span className="flex items-center mt-2"><TbAirConditioningDisabled size={18} className="mr-2" />Non-AC</span>}

                    </div>
                    <button className="flex items-center text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
                      <span>+More...</span>
                    </button>
                  </div>
                  <button onClick={() => handleClick(property.id)} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-md transition-colors duration-300 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden relative">
          <Slider ref={sliderRef} {...settings}>
            {mobileProperties.map((property, idx) => (
              <div key={idx} className="px-2">
                <div className="bg-white rounded-xl shadow-md h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-40 bg-blue-400">
                    <Slider {...settings2}>
                      {property.pictures.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`Image ${idx}`}
                          className="h-40 w-full object-cover"
                        />
                      ))}
                    </Slider>
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 z-10 rounded-br-lg uppercase">
                      Verified+
                    </span>
                    <span className="absolute top-32 left-3 bg-green-600 text-white text-xs px-2 py-1 z-10  ">
                      New
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h1 className="text-md font-bold w-3/4 text-gray-800 -mt-1 mb-1 line-clamp-2">
                        {property.property_name}
                      </h1>
                      <PgBadge category={property.category} wid="20" />
                    </div>
                    <div className="flex items-center text-blue-600 text-xs mb-2">
                      <FiMapPin className="mr-1 line-clamp-1" />
                      <span>{property.locality}</span>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <span className="flex text-blue-600 font-bold text-sm">
                        <MdCurrencyRupee className="mt-1" />{" "}
                        <span>
                          {findMinPrice(property.room_pricing.monthly, property.sharing)}/- onwards
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <div className="flex items-center text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
                        {property.facilities_and_services?.includes(7) ? <FiWifi className="mr-2" /> : <FiWifiOff className="mr-2" />}
                        <span>Wifi</span>
                      </div>
                      <div className=" text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
                        {property.room_type ? <span className="flex items-center"><TbAirConditioning size={12} className="mr-2" /> AC</span> : <span className="flex items-center"><TbAirConditioningDisabled size={18} className="mr-2" />Non-AC</span>}

                      </div>
                      <button className="flex items-center text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded">
                        <span>+More...</span>
                      </button>
                    </div>

                    <button onClick={() => handleClick(property.id)} className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
