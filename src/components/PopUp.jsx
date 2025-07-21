import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAuth } from '@utils/AuthContext'
import { POSTED_PROPERTIES_STATUS, ACTION_LOGS_TYPES } from '@utils/Constants'
import allAPIs from '@utils/allAPIs'
import { useToast } from '@components/ToastProvider'
import Loader from '@components/Loader'

const PopUp = ({ from, data = {}, onClose }) => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const uname = user?.name || "";
  const [updatePostedProperty, setUpdatePostedProperty] = useState({
    id: data.id || "",
    status: "",
    comments: "",
  });

  const handleSearch = () => {
    localStorage.removeItem("isUserCreatedFirstTime");
    setTimeout(() => {
      window.location.reload();
      onClose();
    }, 100);
  };

  const getLogTypeByStatus = (status) => {
    switch (status) {
      case '1':
        return ACTION_LOGS_TYPES.INPROGRESS_PROPERTY;
      case '2':
        return ACTION_LOGS_TYPES.PENDING_PROPERTY;
      case '3':
        return ACTION_LOGS_TYPES.VERIFIED_PROPERTY;
      case '4':
        return ACTION_LOGS_TYPES.DELETED_PROPERTY;
      default:
        return null;
    }
  };

  const addToLogs = async (type) => {
    const payload = {
      type: type,
      userId: user.id,
      role: user.role,
      email: user.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };

  const handlePostedProperty = async () => {
    if (!updatePostedProperty.id || !updatePostedProperty.status || !updatePostedProperty.comments) {
      setError("Please fill all feilds");
      return;
    }
    try {
      setLoading(true);
      const res = await allAPIs.updatePostedProperties(updatePostedProperty)
      if (res.status) {
        setError(null);
        setLoading(false);
        showToast("Updated Status", "success");
        const type = getLogTypeByStatus(updatePostedProperty.status);
        addToLogs(type);
        setTimeout(() => {
          onClose();
        }, 300);
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
      setLoading(false)
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong. Please try again";
      showToast(message, "error");
      setLoading(false)
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="relative w-96 py-6 px-6 bg-white rounded-lg shadow-xl text-black text-sm"
        >
          {from != "signup" && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-neutral-800 hover:text-gray-500"
            >
              <AiOutlineClose className="text-lg" />
            </button>
          )}
          {loading && <Loader />}
          {from === "signup" && (
            <>
              <div className="flex flex-col items-center text-center mb-4">
                <p className="font-semibold text-base">Hey, {uname}!</p>
                <h2 className="text-sm mt-1">What are you thinking about?</h2>
              </div>

              <hr className="border border-black/10 my-3" />

              <Link
                to={"/postproperty"} className="flex justify-between items-center px-2 py-3 cursor-pointer hover:bg-gray-100 rounded-lg">
                <div>
                  <h3 className="font-semibold text-sm">Post Property</h3>
                  <p className="text-xs text-gray-500">Rent out your PG</p>
                </div>
                <span className="bg-blue-600 text-white text-[10px] px-2 py-[2px] rounded-full">
                  FREE
                </span>
              </Link>

              <hr className="border border-black/10 my-3" />

              <div
                onClick={handleSearch}
                className="flex justify-between items-center px-2 py-3 cursor-pointer hover:bg-gray-100 rounded-lg">
                <div>
                  <h3 className="font-semibold text-sm">Search a PG</h3>
                  <p className="text-xs text-gray-500">Rent a PG</p>
                </div>
              </div>
            </>
          )}

          {from === "postProperty" && (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-center mb-1">Update Status for {data.property_name}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">Status</label>
                  <select
                    value={updatePostedProperty.status}
                    onChange={(e) =>
                      setUpdatePostedProperty({ ...updatePostedProperty, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                  >
                    <option value="" disabled>Select a status</option>
                    {Object.entries(POSTED_PROPERTIES_STATUS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">Comments</label>
                  <textarea
                    value={updatePostedProperty.comments}
                    onChange={(e) =>
                      setUpdatePostedProperty({ ...updatePostedProperty, comments: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded resize-none focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter comments"
                    rows={4}
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handlePostedProperty}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                </div>
                <div className="h-6 text-center font-medium">
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUp;
