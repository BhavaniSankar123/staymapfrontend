import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEnvelope, FaArrowLeft, FaUser, FaPhone } from "react-icons/fa";
import Loader from '@components/Loader';
import { useToast } from "@components/ToastProvider";
import allAPIs from "@utils/allAPIs";
import { FaInfoCircle } from "react-icons/fa";
import dummy from "/assets/dummy-image-square.webp"
import IndividualPGDetails from "@pages/IndividualPGDetails"
import { IoLocationOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("visitors");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const getClientProperties = async (e) => {
    try {
      setLoading(true)
      const res = await allAPIs.getClientProperties();
      if (res.data.status) {
        setListings(res.data.data)
        console.log(res.data.data)
        setLoading(false)
      } else {
        useState([]);
        showToast("Something went wrong. Please try again", "error");
      }
      setLoading(false)
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      showToast(message, "warning");
      setLoading(false)
    }
  };

  useEffect(() => {
    getClientProperties()
  }, []);

  useEffect(() => {
    if (selectedListing) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedListing]);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setActiveTab("visitors");
  };

  const handleBackToListings = () => {
    setSelectedListing(null);
  };

  return (
    <div className="min-h-scree p-4 md:p-8">
      {loading && <Loader />}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-800">
            Your PG listings
          </h1>
          <p className="text-blue-600">
            Manage your PG listings and track user interactions
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedListing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => {
                  const isVerified = listing.verified_property;

                  return (
                    <motion.div
                      key={listing.id}
                      whileHover={isVerified ? { scale: 1.03 } : {}}
                      whileTap={isVerified ? { scale: 0.98 } : {}}
                      onClick={() => isVerified && handleListingClick(listing)}
                      className={`relative ${isVerified ? "bg-white cursor-pointer" : " cursor-not-allowed"} 
                      rounded-xl shadow-md overflow-hidden transition-all duration-200 
                      ${isVerified && "hover:shadow-lg text-black"}`}
                    >
                      {!isVerified && (
                        <div className="absolute inset-0 bg-white opacity-60 z-10 rounded-xl"></div>
                      )}

                      <div className={`${!isVerified && "pointer-events-none"}`}>
                        <div className="h-48 bg-blue-100 overflow-hidden">
                          <img
                            src={`${listing.verified_property ? listing.pictures[0] : dummy}`}
                            alt={listing.property_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-blue-800 mb-2">
                            {listing.property_name}
                          </h3>
                          <p className="flex text-blue-600 mb-4">
                            <IoLocationOutline className="mt-1" /> {isVerified ? listing.address.city : listing.address}
                          </p>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center text-blue-500">
                              <FaEye className="mr-1" />
                              {isVerified ? listing.viewCountUserDetails.length : "0"} views
                            </div>
                            <div className="flex items-center text-blue-500">
                              <IoMdContact className="mr-1" size={16} />
                              {isVerified ? listing.contactCountUserDetails.length : "0"} contacts
                            </div>
                          </div>
                        </div>
                      </div>

                      {!isVerified && (
                        <div className="absolute bottom-2 right-2 group z-20">
                          <FaInfoCircle className="text-blue-800 text-lg cursor-help" />
                          <div className="absolute bottom-6 right-0 w-52 txet-center text-sm text-black font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {listing.comments}
                          </div>
                        </div>
                      )}
                    </motion.div>

                  );
                })}
              </div>

            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <button
                  onClick={handleBackToListings}
                  className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                >
                  <FaArrowLeft className="mr-1" />
                  Back to listings
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800">
                      {selectedListing.property_name}
                    </h2>
                    <p className="text-blue-600">{selectedListing.address.city}</p>
                  </div>

                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-center">
                      <div className="text-sm font-medium">Total Views</div>
                      <div className="text-2xl font-bold">
                        {selectedListing.viewCountUserDetails.length}
                      </div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-center">
                      <div className="text-sm font-medium">Total Contacts</div>
                      <div className="text-2xl font-bold">
                        {selectedListing.contactCountUserDetails.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab("visitors")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "visitors"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      Visitors ({selectedListing.viewCountUserDetails.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("contacts")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "contacts"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      Contacts ({selectedListing.contactCountUserDetails.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("pgdata")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "pgdata"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      Data
                    </button>
                  </nav>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      {activeTab !== "pgdata" && (
                        <thead className="bg-blue-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                            >
                              <div className="flex items-center">
                                <FaUser className="mr-1" /> Name
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                            >
                              <div className="flex items-center">
                                <FaPhone className="mr-1" /> Phone
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider"
                            >
                              <div className="flex items-center">
                                <FaEnvelope className="mr-1" /> Email
                              </div>
                            </th>

                          </tr>
                        </thead>
                      )}
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activeTab === "visitors" ? (
                          selectedListing.viewCountUserDetails.length > 0 ? (
                            selectedListing.viewCountUserDetails.map((visitor) => (
                              <motion.tr
                                key={visitor.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {visitor.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {visitor.mobile_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {visitor.email}
                                </td>

                              </motion.tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="4"
                                className="px-6 py-4 text-center text-sm text-gray-500"
                              >
                                No visitors yet
                              </td>
                            </tr>
                          )
                        ) : activeTab === "contacts" ? (
                          selectedListing.contactCountUserDetails.length > 0 ? (
                            selectedListing.contactCountUserDetails.map((contact) => (
                              <motion.tr
                                key={contact.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}

                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {contact.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {contact.mobile_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {contact.email}
                                </td>

                              </motion.tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="5"
                                className="px-6 py-4 text-center text-sm text-gray-500"
                              >
                                No contacts yet
                              </td>
                            </tr>
                          )
                        ) : (
                          <div className="max-w-xs md:max-w-6xl mx-0 p-0">
                            <IndividualPGDetails pgid={selectedListing.id} />
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyListings;
