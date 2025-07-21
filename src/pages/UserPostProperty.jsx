import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatureShowcase from "@components/FeaturesShow";
import { signUpFeaturesForClient, ACTION_LOGS_TYPES } from "@utils/Constants";
import { BiArrowBack } from "react-icons/bi";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { IoLogoWhatsapp } from "react-icons/io";
import allAPIs from "@utils/allAPIs";
import Loader from "@components/Loader";
import { useToast } from "@components/ToastProvider";
import { isValidMobile } from "@utils/validators";
import { useAuth } from "@utils/AuthContext";

const UserPostProperty = () => {
  const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  const addToLogs = async () => {
    const payload = {
      type: ACTION_LOGS_TYPES.POSTED_PROPERTY,
      userId: user.id,
      role: 1,
      email: user.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };

  const [formData, setFormData] = useState({
    propertyName: "",
    mobileNumber: "",
    address: "",
  });

  const handlePostProperty = async (e) => {
    e.preventDefault();
    setError(null);
    for (const key in formData) {
      if (!formData[key].trim()) {
        setError(`Fill all required feilds`);
        return;
      }
    }
    const validMobile = isValidMobile(formData.mobileNumber)
    if (validMobile) {
      setError(validMobile);
      return;
    }
    try {
      setLoading(true)
      const payload = {
        ...formData,
        isWhatsappNumber: isToggle ? "1" : "0",
        userId: user.id
      }
      const res = await allAPIs.postPropertyByUser(payload);
      if (res.data.status) {
        localStorage.removeItem("user");
        user.role = 1;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("isUserCreatedFirstTime");
        setError(null);
        setLoading(false);
        addToLogs();
        showToast("Congratulations! Your property has been posted and is now under verification", "success", 8000);
        navigate("/mylistings");
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      showToast(message, "error");
      setLoading(false)
    }
  };
  return (
    <div className="flex h-screen w-screen">
      {loading && <Loader />}
      <FeatureShowcase features={signUpFeaturesForClient} />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 relative">
        <div className="flex md:hidden">
          <Link
            to={"/"}
            className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white  px-2 py-2 "
          >
            <BiArrowBack size={20} />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold text-blue-700 mb-10">
          Post Your Property for <span className="bg-blue-700 text-white px-1 rounded-md">FREE</span>
        </h2>

        <form onSubmit={handlePostProperty} className="w-full max-w-sm space-y-6 text-sm">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter PG Name"
              value={formData.propertyName}
              onChange={(e) =>
                setFormData({ ...formData, propertyName: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
            />

            <textarea
              rows="4"
              className="w-full placeholder-gray-500 p-2"
              placeholder="Enter Full Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <label
              htmlFor="terms"
              className="flex items-center space-x-1 text-gray-700 text-sm"
            >
              <span>Stay Updated on</span>
              <IoLogoWhatsapp size={16} className="text-green-600" />
              <span>Whatsapp</span>
            </label>

            <div onClick={handleToggle} className="cursor-pointer">
              {isToggle ? (
                <LiaToggleOnSolid className="text-xl text-blue-700" />
              ) : (
                <LiaToggleOffSolid className="text-xl text-gray-600/50" />
              )}
            </div>
          </div>

          <button
            className="text-white font-medium bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b w-full text-md px-2 py-2 rounded-lg tracking-wide text-center transition-all duration-300"
            type="submit"
          >
            Post Now
          </button>

          <div className="h-6 text-center font-medium">
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPostProperty;
