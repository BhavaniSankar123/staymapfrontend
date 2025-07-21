import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  FaMapMarkerAlt, FaUtensils, FaVideo, FaChevronDown,
  FaChevronUp, FaTrash
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { BiArrowBack } from 'react-icons/bi'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useToast } from '@components/ToastProvider'
import Loader from '@components/Loader'
import allAPIs from '@utils/allAPIs'
import { useAuth } from '@utils/AuthContext'
import { pgrules, facilityOptions, ACTION_LOGS_TYPES, FormPayLoad, days1, sharingOptions, tenantsPreferredOptions, roomTypeOptions, parkingAvailabilityOptions, foodOptions, categoryOptions } from '@utils/Constants';
import { defaultFormData, electric_form, pgRules } from '../../utils/Constants'

const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

const snakeToCamelObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamelObject(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[snakeToCamel(key)] = snakeToCamelObject(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

const AdminPostProperty = ({ isEditMode }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const res = await allAPIs.getClientsData();
        if (res.data.status) {
          setClientData(res.data.data);

          if (isEditMode && id) {
            const saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
            const current = saved.find((p) => p.id === id);
            if (current) {
              setFormData((prev) => ({
                ...prev,
                ...current,
              }));
              setSelectedClientId(current.clientId);
            }
          }
        } else {
          showToast("Something went wrong. Please try again", "error");
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again";
        showToast(message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id, isEditMode]);

  useEffect(() => {
    const fetchClientData = async () => {
      if (location.state?.savedData) {
        const convertedData = snakeToCamelObject(location.state.savedData);
        setSelectedClientId(convertedData.clientId);
        setFormData(convertedData);
      }
      else {
        try {
          setLoading(true);
          const res = await allAPIs.getClientsData();
          if (res.data.status) {
            setClientData(res.data.data);

            // Set selectedClientId if in edit mode
            if (isEditMode && id) {
              const saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
              const current = saved.find((p) => p.id === id);
              if (current) {
                setFormData(current);
                setSelectedClientId(current.clientId);
              }
            }
          } else {
            showToast("Something went wrong. Please try again", "error");
          }
        } catch (err) {
          const message =
            err?.response?.data?.message ||
            "Something went wrong. Please try again";
          showToast(message, "error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClientData();
  }, [id, isEditMode]);

  useEffect(() => {
    const { startDate, endDate } = formData.planDetails;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start <= end) {
        const startYear = start.getFullYear();
        const startMonth = start.getMonth();
        const endYear = end.getFullYear();
        const endMonth = end.getMonth();
        let monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
        if (end.getDate() >= start.getDate()) {
          monthDiff += 1;
        }
        const durationStr = `${monthDiff} month${monthDiff !== 1 ? 's' : ''}`;
        setFormData((prev) => ({
          ...prev,
          planDetails: {
            ...prev.planDetails,
            duration: durationStr,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          planDetails: {
            ...prev.planDetails,
            duration: '',
          },
        }));
      }
    }
  }, [formData.planDetails.startDate, formData.planDetails.endDate]);
  
  const handleFoodChange = (e, value) => {
    const { checked } = e.target;
    setFormData((prev) => {
      let updatedFood = [...prev.food];
      if (value == 0 && updatedFood.includes(1)) {
        return prev;
      }
      if (value == 1 && updatedFood.includes(0)) {
        return prev;
      }
      if (checked) {
        updatedFood.push(value);
      } else {
        updatedFood = updatedFood.filter((item) => item !== value);
      }
      return {
        ...prev,
        food: updatedFood,
      };
    });
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const isValidBase64 = (str) => {
    const base64Regex = /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/;
    return base64Regex.test(str);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = [];
    for (const file of files) {
      try {
        const base64 = await convertToBase64(file);

        // Validate base64 string
        if (!isValidBase64(base64)) {
          showToast("Invalid base64 string generated", "error");
          continue;
        }

        base64Images.push(base64);
      } catch (error) {
        console.error("Error converting to base64:", error);
        showToast("Failed to process image", "error");
      }
    }

    setFormData((prev) => ({
      ...prev,
      pictures: [...prev.pictures, ...base64Images],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
  };

  const toggleSharing = (sharing) => {
    setFormData(prev => ({
      ...prev,
      openSharing: prev.openSharing === sharing ? null : sharing
    }));
  };
  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      openDay: prev.openDay === day ? null : day
    }));
  };

  const addToLogs = async () => {
    const payload = {
      type: ACTION_LOGS_TYPES.POSTED_PROPERTY_BY_ADMIN,
      userId: user.id,
      role: user.role,
      email: user.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };
  const handleSave = async () => {
    if (selectedClientId === null) {
      showToast("Please select the client", "warning");
      return;
    }
    if (!formData.propertyName.trim()) {
      showToast("Property Name is required", "warning");
      return;
    }

    const rawData = {
      ...FormPayLoad(formData, selectedClientId),
      id: formData.id,
    };
    const payload = JSON.stringify(rawData);
    try {
      setLoading(true);
      const res = await allAPIs.postVerifiedProperty(payload);
      if (res.data.status) {
        setLoading(false);
        showToast("Property updated successfully", "success");
        navigate("/admin/savedproperties", { state: { refresh: true } });
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong. Please try again";
      setLoading(false);
      showToast(message, "error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.propertyName.trim()) {
      showToast("Property Name is required", "error");
      return;
    }

    if (!formData.ownerMobileNumber.trim()) {
      showToast("Owner Mobile Number is required", "error");
      return;
    }

    if (!formData.supervisorMobileNumber.trim()) {
      showToast("Supervisor Mobile Number is required", "error");
      return;
    }

    if (!formData.address.roadNumber.trim()) {
      showToast("Road Number is required", "error");
      return;
    }

    if (!formData.address.landmark.trim()) {
      showToast("Landmark is required", "error");
      return;
    }

    if (!formData.address.city.trim()) {
      showToast("City is required", "error");
      return;
    }

    if (!formData.address.district.trim()) {
      showToast("District is required", "error");
      return;
    }

    if (!formData.address.state.trim()) {
      showToast("State is required", "error");
      return;
    }

    if (!formData.address.pincode.trim()) {
      showToast("Pincode is required", "error");
      return;
    }

    if (!formData.locality.trim()) {
      showToast("Locality is required", "error");
      return;
    }

    if (formData.sharing.length === 0) {
      showToast("Please select at least one Sharing option", "error");
      return;
    }

    if (formData.roomType.length === 0) {
      showToast("Please select at least one Room Type", "error");
      return;
    }

    if (!formData.metadata.fixedDeposit) {
      showToast("Fixed Deposit is required", "error");
      return;
    }

    if (!formData.metadata.maintenanceAmount) {
      showToast("Maintenance Amount is required", "error");
      return;
    }

    if (formData.tenantsPreferred.length === 0) {
      showToast("Please select at least one preferred Tenant type", "error");
      return;
    }

    if (formData.parkingAvailability.length === 0) {
      showToast("Please select Parking Availability", "error");
      return;
    }

    if (formData.food.length === 0) {
      showToast("Please select at least one Food option", "error");
      return;
    }

    if (formData.facilitiesAndServices.length === 0) {
      showToast("Please select at least one Facility or Service", "error");
      return;
    }

    if (!formData.links.gpsLocationLink.trim()) {
      showToast("GPS Location Link is required", "error");
      return;
    }

    const updatedFormData = {
      ...formData,
      isSubmitted: true
    };
    setFormData(updatedFormData);

    const payload = JSON.stringify(FormPayLoad(updatedFormData, selectedClientId));
    
    try {
      setLoading(true)
      const res = await allAPIs.postVerifiedProperty(payload);
      if (res.data.status) {
        setLoading(false)
        addToLogs();
        showToast("Posted Successfully", "success");
        setFormData(defaultFormData);
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      setLoading(false)
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      {loading && <Loader />}
      <div className="flex">
        <Link
          to={"/admin/dashboard"}
          className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white  px-2 py-2 "
        >
          <BiArrowBack size={18} />
        </Link>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-md text-center">
          <h1 className="text-2xl font-bold">PG Management System</h1>
          <p className="mt-2 opacity-90 text-md">Fill in the details of your PG accommodation</p>
        </header>

        <form className="p-6 space-y-8" onSubmit={handleSubmit}>

          <select
            value={selectedClientId || ""}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            disabled={isEditMode}
          >
            <option value="" disabled>
              Select a client
            </option>
            {clientData.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>


          {/* 1. Basic Information Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PG Name</label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData?.propertyName || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, propertyName: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter PG name"
                  required
                />
              </div>

            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">PG Type</label>
              <div className="flex flex-wrap gap-4">
                {categoryOptions.map((type) => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${type.value}`}
                      name="category"
                      value={type.value}
                      checked={formData.category === type.value}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev, category: Number(e.target.value)
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor={`category-${type.value}`} className="ml-2 block text-sm text-gray-700">{type.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Types of Sharing Available</label>
              <div className="flex flex-wrap gap-4">
                {sharingOptions?.map((sharing) => (
                  <div key={sharing} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`sharing-${sharing}`}
                      name="sharing[]"
                      value={sharing ?? ""}
                      checked={formData?.sharing?.includes(sharing)}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev, sharing: e.target.checked
                          ? [...prev.sharing, sharing]
                          : prev.sharing.filter(item => item !== sharing)
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`sharing-${sharing}`} className="ml-2 block text-sm text-gray-700">{sharing + 1} Sharing</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenants Preferred</label>
              <div className="flex flex-wrap gap-4">
                {tenantsPreferredOptions.map((type) => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tenant-${type.value}`}
                      name="tenantsPreferred[]"
                      value={type.value ?? ""}
                      checked={formData?.tenantsPreferred?.includes(type.value)}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        tenantsPreferred: e.target.checked
                          ? [...prev.tenantsPreferred, type.value]
                          : prev.tenantsPreferred.filter(item => item !== type.value)
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`tenant-${type.value}`} className="ml-2 block text-sm text-gray-700">{type.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beds Availability</label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="beds-yes"
                      name="isBedsAvailable"
                      value={1}
                      checked={formData.isBedsAvailable == 1}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isBedsAvailable: e.target.value }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="beds-yes" className="ml-2 block text-sm text-gray-700">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="beds-no"
                      name="isBedsAvailable"
                      value={0}
                      checked={formData.isBedsAvailable == 0}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isBedsAvailable: e.target.value }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="beds-no" className="ml-2 block text-sm text-gray-700">No</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <div className="flex flex-wrap gap-4">
                  {roomTypeOptions.map((type) => (
                    <div key={type.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`room-type-${type.value}`}
                        name="roomType[]"
                        value={type.value}
                        checked={formData?.roomType?.includes(type.value)}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          roomType: e.target.checked
                            ? [...prev.roomType, type.value]
                            : prev.roomType.filter(item => item !== type.value)
                        }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`room-type-${type.value}`} className="ml-2 text-sm text-gray-700 flex items-center">
                        <span className="mr-1">{type.icon}</span>
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Options</label>
                <div className="flex flex-wrap gap-4">
                  {foodOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`food-option-${option.value}`}
                        name="food[]"
                        value={option.value ?? ""}
                        checked={formData.food.includes(option.value)}
                        onChange={(e) => handleFoodChange(e, option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`food-option-${option.value}`} className="ml-2 block text-sm text-gray-700">{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Contact Information Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Phone</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="ownerMobileNumber"
                    value={formData.ownerMobileNumber || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ownerMobileNumber: e.target.value }))}
                    className="flex-1 min-w-0 block w-full p-2 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Phone</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="supervisorMobileNumber"
                    value={formData.supervisorMobileNumber || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, supervisorMobileNumber: e.target.value }))}
                    className="flex-1 min-w-0 block w-full p-2 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="whatsapp-available"
                name="isWhatsappAvailable"
                checked={formData.isWhatsappAvailable || false}
                onChange={(e) => setFormData((prev) => ({ ...prev, isWhatsappAvailable: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="whatsapp-available" className="ml-2 block text-sm text-gray-700">Is WhatsApp available for Owner Number</label>
            </div>
          </section>

          {/* 3. Pricing Information Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Pricing Information</h2>

            <div className="space-y-4">
              {formData.sharing.length > 0 && formData.sharing.map((sharing, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSharing(sharing)}
                    className="w-full flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    <span className="font-medium text-blue-800">{Number(sharing) + 1} Sharing</span>
                    {formData.openSharing === sharing ? (
                      <FaChevronUp className="text-blue-600" />
                    ) : (
                      <FaChevronDown className="text-blue-600" />
                    )}
                  </button>

                  {formData.openSharing === sharing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {/* Monthly Pricing */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-700">Monthly Pricing</h3>

                        {["nonAcWithFood", "nonAcWithoutFood", "acWithFood", "acWithoutFood"].map((category) => (
                          <div key={category}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {category
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <input
                              type="text"
                              name={`roomPricing.monthly.${sharing}.${category}`}
                              value={formData.roomPricing.monthly[sharing][category] || ""}
                              onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                roomPricing: {
                                  ...prev.roomPricing,
                                  monthly: {
                                    ...prev.roomPricing.monthly,
                                    [sharing]: {
                                      ...prev.roomPricing.monthly[sharing],
                                      [category]: e.target.value
                                    }
                                  }
                                }
                              }))}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter price"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Daily Pricing */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-700">Daily Pricing</h3>

                        {["nonAcWithFood", "nonAcWithoutFood", "acWithFood", "acWithoutFood"].map((category) => (
                          <div key={category}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {category
                                .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
                                .replace(/^./, (str) => str.toUpperCase())} {/* Capitalize the first letter */}
                            </label>
                            <input
                              type="text"
                              name={`roomPricing.daily.${sharing}.${category}`}
                              value={formData.roomPricing.daily[sharing][category] || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  roomPricing: {
                                    ...prev.roomPricing,
                                    daily: {
                                      ...prev.roomPricing.daily,
                                      [sharing]: {
                                        ...prev.roomPricing.daily[sharing],
                                        [category]: e.target.value,
                                      },
                                    },
                                  },
                                }))
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter price"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Deposit</label>
                <input
                  type="number"
                  name="metadata.fixedDeposit"
                  value={formData.metadata.fixedDeposit || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev, metadata: { ...prev.metadata, fixedDeposit: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Amount</label>
                <input
                  type="number"
                  name="metadata.maintenanceAmount"
                  value={formData.metadata.maintenanceAmount || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev, metadata: { ...prev.metadata, maintenanceAmount: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Electrical Charges</label>
              <div className="flex gap-4">
                {electric_form.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name="metadata.electricCharges"
                      value={option.value}
                      checked={formData.metadata.electricCharges == option.value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metadata: { ...prev.metadata, electricCharges: e.target.value },
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={option.id} className="ml-2 block text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Availability Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Availability Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                <div className="relative">
                  <input
                    type="date"
                    name="metadata.availableFrom"
                    value={formData.metadata.availableFrom || ""}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev, metadata: { ...prev.metadata, availableFrom: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lock-in Period</label>
                <input
                  type="text"
                  name="metadata.lockInPeriod"
                  value={formData.metadata.lockInPeriod || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev, metadata: { ...prev.metadata, lockInPeriod: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 3 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Floors</label>
                <input
                  type="number"
                  name="metadata.noOfFloors"
                  value={formData.metadata.noOfFloors || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev, metadata: { ...prev.metadata, noOfFloors: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Since</label>
                <div className="relative">
                  <input
                    type="date"
                    name="metadata.operatingSince"
                    value={formData.metadata.operatingSince}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev, metadata: { ...prev.metadata, operatingSince: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>
              </div>
            </div>
          </section>

          {/* 5. Weekly Food Menu Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <FaUtensils className="mr-2" /> Weekly Food Menu
            </h2>

            {/* Days Navigation */}
            <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
              <div className="flex space-x-2">
                {days1.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center ${formData.openDay === day
                      ? "bg-blue-600 text-white shadow-md border border-white"
                      : "bg-white text-blue-800 hover:bg-blue-100 border border-blue-800"
                      } ${formData?.foodMenu?.[day]?.breakfast ||
                        formData?.foodMenu?.[day]?.lunch ||
                        formData?.foodMenu?.[day]?.dinner
                        ? ""
                        : ""
                      }`}
                  >
                    <span>{day.charAt(0).toUpperCase() + day.slice(1, 3)}</span>
                    {formData.openDay === day ? (
                      <FaChevronUp className="ml-1 text-sm" />
                    ) : (
                      <FaChevronDown className="ml-1 text-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Menu for Selected Day */}
            <AnimatePresence>
              {formData.openDay && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 mb-6"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">
                    {formData.openDay.charAt(0).toUpperCase() + formData.openDay.slice(1)} Menu
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <FaUtensils className="mr-2 text-blue-500" /> Breakfast
                      </label>
                      <input
                        type="text"
                        name={`foodMenu.${formData.openDay}.breakfast`}
                        value={formData.foodMenu[formData.openDay].breakfast}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          foodMenu: {
                            ...prev.foodMenu,
                            [formData.openDay]: {
                              ...prev.foodMenu[formData.openDay],
                              breakfast: e.target.value
                            }
                          }
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Idli, Dosa"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className=" text-sm font-medium text-gray-700 flex items-center">
                        <FaUtensils className="mr-2 text-blue-500" /> Lunch
                      </label>
                      <input
                        type="text"
                        name={`foodMenu.${formData.openDay}.lunch`}
                        value={formData.foodMenu[formData.openDay].lunch}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          foodMenu: {
                            ...prev.foodMenu,
                            [formData.openDay]: {
                              ...prev.foodMenu[formData.openDay],
                              lunch: e.target.value
                            }
                          }
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Rice, Dal, Curry"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <FaUtensils className="mr-2 text-blue-500" /> Dinner
                      </label>
                      <input
                        type="text"
                        name={`foodMenu.${formData.openDay}.dinner`}
                        value={formData.foodMenu[formData.openDay].dinner || ""}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          foodMenu: {
                            ...prev.foodMenu,
                            [formData.openDay]: {
                              ...prev.foodMenu[formData.openDay],
                              dinner: e.target.value
                            }
                          }
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Roti, Sabzi, Salad"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>



          </section>

          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Facilities and Services</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {facilityOptions.map((facility) => (
                <div key={facility.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`facility-${facility.id}`}
                    name="facilitiesAndServices[]"
                    value={facility.id}
                    checked={formData?.facilitiesAndServices?.includes(facility.id) || false}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      facilitiesAndServices: e.target.checked
                        ? [...prev.facilitiesAndServices, facility.id]
                        : prev.facilitiesAndServices.filter((id) => id !== facility.id)
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`facility-${facility.id}`} className="ml-2 text-sm text-gray-700 flex items-center">
                    <span className="mr-2">{facility.icon}</span>
                    {facility.label}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Rules Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">PG Rules and Policies</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                <input
                  type="text"
                  name="metadata.pgRules.noticePeriod"
                  value={formData?.metadata?.pgRules[0] || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    metadata: {
                      ...prev.metadata,
                      pgRules: {
                        ...prev.metadata.pgRules,
                        [0]: e.target.value
                      }
                    }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 1 month"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gate Closing Time</label>
                <div className="relative">
                  <input
                    type="time"
                    name="metadata.pgRules.gateClosingTime"
                    value={formData?.metadata?.pgRules[1] || ""}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      metadata: {
                        ...prev.metadata,
                        pgRules: {
                          ...prev.metadata.pgRules,
                          [1]: e.target.value
                        }
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />

                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pgrules.map((rule, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rule-${index + 2}`}
                      name={`metadata.pgRules.${index + 2}`} // Use the numeric index
                      checked={formData.metadata.pgRules[index + 2] === true} // Bind to the numeric index
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          pgRules: {
                            ...prev.metadata.pgRules,
                            [index + 2]: e.target.checked // Update the numeric index
                          }
                        }
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`rule-${index + 2}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      <span className="mr-2">{rule.icon}</span>
                      {rule.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Location Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Location Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Road Number</label>
                  <input
                    type="text"
                    name="address.roadNumber"
                    value={formData?.address?.roadNumber}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        roadNumber: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Road Number 24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                  <input
                    type="text"
                    name="address.landmark"
                    value={formData?.address?.landmark}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        landmark: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter nearby landmark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Locality (e.g. Madhapur, Gachibowli)</label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, locality: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter locality"
                    required
                  />

                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData?.address?.city}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        city: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    name="address.district"
                    value={formData.address.district}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        district: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter district"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        state: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="number"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        pincode: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter pincode"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        country: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter country"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> GPS Location Link
                </label>
                <input
                  type="url"
                  name="links.gpsLocationLink"
                  value={formData.links.gpsLocationLink}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    links: {
                      ...prev.links,
                      gpsLocationLink: e.target.value
                    }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Google Maps link"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaVideo className="mr-2" /> 360° Virtual Tour Link
                </label>
                <input
                  type="url"
                  name="links.virtualTour"
                  value={formData.links.virtualTour}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    links: {
                      ...prev.links,
                      virtualTour: e.target.value
                    }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter YouTube or virtual tour link"
                />
              </div>
            </div>
          </section>

          {/* 9. Photos Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Upload Photos and Videos</h2>

            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Preview Images ({formData.pictures.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {formData.pictures.map((picture, index) => (
                    <div key={index} className="relative border rounded-lg p-2">
                      <img
                        src={picture}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-4 right-4 bg-neutral-200 p-2 rounded-full"
                      >
                        <FaTrash className="text-red-600" size={12}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          {/* 10. Parking Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Parking Availability</h2>

            <div className="flex flex-wrap gap-4">
              {parkingAvailabilityOptions?.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`parking-${option.value}`}
                    name="parkingAvailability[]"
                    value={option.value ?? ""}
                    checked={formData?.parkingAvailability?.includes(option.value)}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      parkingAvailability: e.target.checked
                        ? [...prev.parkingAvailability, option.value]
                        : prev.parkingAvailability.filter((val) => val !== option.value)
                    }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`parking-${option.value}`} className="ml-2  text-sm text-gray-700 flex items-center">
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Plan Details Section */}
          <section className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Plan Details</h2>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isPlanAvailable"
                name="isPlanAvailable"
                checked={formData.isPlanAvailable}
                onChange={(e) => setFormData((prev) => ({
                  ...prev,
                  isPlanAvailable: e.target.checked,
                }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPlanAvailable" className="ml-2 block text-sm text-gray-700">Plan Available</label>
            </div>

            {!!formData.isPlanAvailable && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    name="planDetails.planName"
                    value={formData.planDetails.planName || ""}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      planDetails: {
                        ...prev.planDetails,
                        planName: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter plan name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    name="planDetails.duration"
                    value={formData?.planDetails?.duration || ""}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      planDetails: {
                        ...prev.planDetails,
                        duration: e.target.value
                      }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 3 months"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="planDetails.startDate"
                      value={formData?.planDetails?.startDate || ""}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        planDetails: {
                          ...prev.planDetails,
                          startDate: e.target.value
                        }
                      }))}
                      placeholder="Enter start date"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="planDetails.endDate"
                      value={formData?.planDetails?.endDate || ""}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        planDetails: {
                          ...prev.planDetails,
                          endDate: e.target.value
                        }
                      }))}
                      placeholder="Enter end date"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="flex justify-end gap-4 text-md mt-6">
            <button
              type="button"
              onClick={handleSave}
              className={`border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2.5 px-5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all`}
            >
              {isEditMode ? "Update Property Details" : "Save Property Details"}
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
            >
              Submit Property Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPostProperty;