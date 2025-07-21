import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Share2, Heart, MapPin, Utensils } from 'lucide-react'
import { MdCurrencyRupee } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import {
  categoryValues, features, pgRules, roomTypes, sharingMap, tenantsValues, facilityOptions, days,
  meals, secretKey, fadeIn, scaleUp, iconPulse, CustomPrevArrow, CustomNextArrow, ACTION_LOGS_TYPES
} from '@utils/Constants'
import allAPIs from '@utils/allAPIs'
import { useToast } from '@components/ToastProvider'
import Loader from '@components/Loader'
import { useAuth } from '@utils/AuthContext'
import { useParams } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import MvContactButtons from "@components/MvContactButtons";
import { electric_charges } from '@utils/Constants'
import { TbView360Number } from 'react-icons/tb'
import { IoLocationSharp } from 'react-icons/io5'
import CryptoJS from 'crypto-js';

const IndividualPGDetails = ({ pgid }) => {
  const [isFavourite, setIsFavorite] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [selectedShare, setSelectedShare] = useState(0);
  const [activeDay, setActiveDay] = useState("sunday");
  const [activeMeal, setActiveMeal] = useState("breakfast");
  const { user } = useAuth();
  const location = useLocation();
  const { id: encodedId } = useParams();
  const decodedUrlId = decodeURIComponent(encodedId);
  const pathId = location.pathname.split("/property/")[1];
  const showMvButtons = decodeURIComponent(pathId) == decodedUrlId;
  const bytes = CryptoJS.AES.decrypt(decodedUrlId, secretKey);
  const decodedId = bytes.toString(CryptoJS.enc.Utf8);
  const pid = decodedId ? decodedId : pgid;

  const addToLogs = async (type) => {
    const payload = {
      type: type,
      userId: user.id,
      role: user.role,
      email: user.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
      metadata: {
        propertyId: pid,
      }
    };
    allAPIs.addToLogs(payload)
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await allAPIs.getVerifiedPropertyDetailsById({ id: pid });
      if (res.data.status) {
        setLoading(false);
        addToLogs(ACTION_LOGS_TYPES.VIEWED_PROPERTY);
        setData(res.data.data);
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      showToast(message, "error");
    }
  };


  useEffect(() => {
    fetchData();
  }, [pid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pid]);

  const { metadata, category, address, food_menu } = data;
  const { viewCount, contactCount, ...filteredMetadata } = metadata || {};
  const combinedDetails = {
    category,
    ...filteredMetadata,
  };
  const addressValues = [
    address?.roadNumber,
    address?.landmark,
    address?.city,
    address?.district,
    address?.state,
    address?.pincode
  ].filter(Boolean).join(",  ");
  const getMealItems = (day, meal) => {
    const value = food_menu?.[day]?.[meal];
    return value ? value.split(",") : [];
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const handleShareClick = (shareType) => {
    setSelectedShare(shareType);
  };
  const toggleFavorite = async (e) => {
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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userFavourites");

      if (!stored || stored === "undefined" || stored === "null" || !stored.trim().startsWith("[") || !stored.trim().endsWith("]")) {
        localStorage.removeItem("userFavourites");
        setIsFavorite(false);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        localStorage.removeItem("userFavourites");
        setIsFavorite(false);
        return;
      }

      const isFav = parsed.includes(data?.id);
      setIsFavorite(isFav);
    } catch (err) {
      console.error("Error parsing userFavourites from localStorage:", err);
      localStorage.removeItem("userFavourites");
      setIsFavorite(false);
    }
  }, [data?.id]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    const shareText = `Check out this PG on StayMap!\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "PG on StayMap",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied! You can now paste it anywhere.");
      } catch (err) {
        alert("Copy failed. Please copy manually.");
      }
    }
  };



  const sharingTypes = data?.sharing;
  if (sharingTypes && sharingTypes.length > 0) {
    sharingTypes.sort();
  }
  useEffect(() => {
    setSelectedShare(sharingTypes?.[0] || 0);
  }, [sharingTypes]);

  return (
    <div className="min-h-screen w-full text-blue-900 pb-16 md:pb-0 px-0 md:px-10">
      {loading && <Loader />}
      {data && (
        <>
          <section className="relative">
            <div className="md:max-w-7xl md:mx-auto md:mt-4">
              <div className="relative h-80 md:h-[28rem] w-full overflow-hidden rounded-b-xl md:rounded-xl shadow-lg">
                {data?.pictures?.length > 0 && (
                  <Slider {...settings}>
                    {data.pictures.map((card, index) => (
                      <div key={index} className="relative h-80 md:h-[28rem] w-full z-10">
                        <img
                          src={card}
                          alt="pg images"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                )}

                <motion.button
                  whileHover={iconPulse.hover}
                  whileTap={iconPulse.tap}
                  onClick={() => handleShare()}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md"
                >
                  <Share2 size={16} />
                </motion.button>
              </div>
            </div>
          </section>
          <div className="md:max-w-7xl md:mx-auto md:mt-6">
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="px-4 md:px-0"
            >
              <div className="bg-white rounded-xl shadow-md p-6 -mt-6 md:mt-0 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold text-blue-900">
                      {data?.property_name}
                    </h1>
                    <div className="flex items-center mt-1">
                      <MapPin size={16} className="text-blue-600 mr-1" />
                      <p className="text-blue-600 text-sm">{data?.locality}</p>
                    </div>
                  </div>

                  <motion.button
                    onClick={toggleFavorite}
                    whileHover={iconPulse.hover}
                    whileTap={iconPulse.tap}
                    className="flex items-center gap-1 text-blue-800 bg-blue-100 p-2 rounded-full text-sm"
                  >
                    {isFavourite ? (
                      <Heart fill="#1e3a8a" size={20} className="text-blue-900" />
                    ) : (
                      <Heart size={20} className="text-blue-900" />
                    )}
                  </motion.button>
                </div>

                <div className="flex gap-1 md:gap-2 mt-4">

                  <span className="text-[9px] md:text-xs bg-blue-100  text-blue-800 px-2 py-1.5 rounded-full">
                    {data?.is_beds_available ? "Beds Available" : "Beds Not Available"}
                  </span>

                  {data?.tenants_preferred?.length > 0 && (
                    <span className="text-[9px] md:text-xs flex items-center bg-blue-100 text-blue-800 px-2 py-1.5 rounded-full">
                      {data?.tenants_preferred?.length == 1 ? (
                        data.tenants_preferred.map(tenant => (
                          <span key={tenant} className="bg-blue-100 text-blue-800">{tenantsValues[tenant]}</span>
                        )))
                        : <span>{tenantsValues[2]}</span>
                      }
                    </span>
                  )}

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {combinedDetails &&
                    Object.entries(combinedDetails)
                      .filter(([key]) => key !== "pgRules")
                      .map(([key, value], index) => {
                        const feature = features.find((f) => f.key === key);
                        if (feature == "contactCount" || feature == "viewCount")
                          return;
                        return (
                          <motion.div
                            key={index}
                            whileHover={scaleUp.hover}
                            className="flex items-center h-16 gap-3 p-2 bg-blue-50 rounded-lg"
                          >
                            <div className="text-blue-700 bg-blue-100 p-2 rounded-full">
                              {feature?.icon}
                            </div>
                            <div>
                              <p className="text-[11px] md:text-xs text-blue-600 text-center">
                                {feature?.title ||
                                  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                              </p>
                              <p className="font-semibold text-center text-[10px] text-blue-900">

                                {key == "category" ? categoryValues[value] : key == "electricCharges" ? electric_charges[value] : value}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-blue-900">Address</h3>
                  <p className="text-blue-700 mt-1 text-sm">
                    {addressValues}
                  </p>
                </div>

                <div className="hidden md:flex gap-4 mt-6 text-sm">
                  <motion.button
                    whileHover={scaleUp.hover}
                    whileTap={scaleUp.tap}
                    onClick={() => addToLogs(ACTION_LOGS_TYPES.CONTACTED_OWNER)}
                    className="flex-1 bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition"
                  >
                    <a href={`tel:${data?.owner_mobile_number}`}>Contact Owner</a>
                  </motion.button>
                  <motion.button
                    whileHover={scaleUp.hover}
                    whileTap={scaleUp.tap}
                    onClick={() => addToLogs(ACTION_LOGS_TYPES.CONTACTED_OWNER)}
                    className="flex-1 border border-blue-800 text-blue-800 py-3 rounded-lg hover:bg-blue-50 transition"
                  >
                    <a href={`tel:${data?.supervisor_mobile_number}`}>Contact Supervisor </a>
                  </motion.button>
                </div>
              </div>
            </motion.section>
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 px-4 md:px-0"
            >
              <div className="flex justify-center gap-28 bg-white rounded-xl shadow-md p-6">
                <a href={data?.links?.gpsLocationLink} target='_blank' ><IoLocationSharp size={28} className='text-blue-600' /> </a>
                <a href={data?.links?.virtualTour} target='_blank'> <TbView360Number size={28} className='text-blue-600' /> </a>
              </div>
            </motion.section>
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 px-4 md:px-0"
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-md font-bold text-blue-900 mb-4">
                  Pricing & Plans
                </h2>

                <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
                  {sharingTypes?.map((shareKey) => {
                    const shareItem = sharingMap.find((item) => item.key === shareKey);
                    if (!shareItem) return null;

                    return (
                      <motion.button
                        key={shareKey}
                        whileHover={scaleUp.hover}
                        whileTap={scaleUp.tap}
                        onClick={() => handleShareClick(shareKey)}
                        className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${selectedShare === shareKey
                          ? "bg-blue-800 text-white shadow-md"
                          : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {shareItem.share}
                      </motion.button>
                    );
                  })}
                </div>


                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-800 text-white text-sm">
                        <th className="text-left p-3 font-normal">Room Type</th>
                        <th className="text-left p-3 font-normal">Monthly</th>
                        <th className="text-left p-3 font-normal">Daily</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomTypes.map((room, index) => (
                        <motion.tr
                          key={room.key}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"
                            } text-sm border-b border-blue-100`}
                        >
                          <td className="p-3 text-blue-900">{room.label}</td>
                          <td className="p-3 text-blue-900 font-medium">
                            <div className="flex items-center">
                              <MdCurrencyRupee className="mr-1" size={16} />
                              {data.room_pricing?.monthly?.[selectedShare]?.[room.key] || 0}
                            </div>
                          </td>
                          <td className="p-3 text-blue-900 font-medium">
                            <div className="flex items-center">
                              <MdCurrencyRupee className="mr-1" size={16} />
                              {data.room_pricing?.daily?.[selectedShare]?.[room.key] || 0}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 px-4 md:px-0"
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-md font-bold text-blue-900">
                    Weekly Meal Plan
                  </h2>
                </div>

                <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide">
                  {days.map((day) => (
                    <motion.button
                      key={day.id}
                      whileHover={scaleUp.hover}
                      whileTap={scaleUp.tap}
                      onClick={() => setActiveDay(day.id)}
                      className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${activeDay === day.id
                        ? "bg-blue-800 text-white shadow-md"
                        : "bg-blue-100 text-blue-800"}`}
                    >
                      {day.name.substring(0, 3)}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 mt-3">
                  {meals.map((meal) => (
                    <motion.button
                      key={meal.id}
                      whileHover={scaleUp.hover}
                      whileTap={scaleUp.tap}
                      onClick={() => setActiveMeal(meal.id)}
                      className={`p-3 text-sm rounded-lg flex flex-col items-center ${activeMeal === meal.id
                        ? "bg-blue-800 text-white shadow-md"
                        : "bg-blue-100 text-blue-800"}`}
                    >
                      <Utensils size={18} className="mb-1" />
                      <span className="font-medium text-sm">{meal.name}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeDay}-${activeMeal}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-blue-50 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <h3 className="font-bold text-blue-800">
                        {days.find((d) => d.id === activeDay)?.name}'s {activeMeal}
                      </h3>
                    </div>

                    {getMealItems(activeDay, activeMeal).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {getMealItems(activeDay, activeMeal).map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-3 bg-white rounded-lg text-blue-900 shadow-sm flex items-center"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-blue-600 text-sm">
                        Menu not available for this time
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 px-4 md:px-0"
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-md font-bold text-blue-900 mb-6">
                  Facilities & Services
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.facilities_and_services?.map((index) => {
                    const facility = facilityOptions.find((f) => f.id === index);
                    return (

                      <div
                        key={facility.id}
                        className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 h-24 md:h-16 w-full bg-blue-50 rounded-lg text-blue-900 shadow-sm"
                      >
                        <div className="text-2xl">{facility.icon}</div>
                        <span className="text-sm text-center font-medium">{facility.label}</span>
                      </div>

                    );
                  })}
                </div>

              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-6 px-4 md:px-0 mb-10"
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-md font-bold text-blue-900 mb-6">
                  PG Rules
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(data?.metadata?.pgRules || {}).map(([key, value]) => {
                    const rule = pgRules.find((f) => f.id === Number(key));
                    if (!rule) return null;

                    return (
                      <motion.div
                        key={key}
                        whileHover={scaleUp.hover}
                        className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-2 rounded-full mt-1">
                            <span className="text-blue-700 text-xl">{rule.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-blue-800 text-sm">
                              {rule.label}
                            </h3>
                            <p className="text-blue-700 text-xs mt-1">{value == 1 ? "Yes" : value == 0 ? "No" : value}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            </motion.section>
          </div>
        </>
      )}
      {showMvButtons && <MvContactButtons owner={data.owner_mobile_number} supervisor={data.supervisor_mobile_number} />}
    </div>
  );
};

export default IndividualPGDetails;
