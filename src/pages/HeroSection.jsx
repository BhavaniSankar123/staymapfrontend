import { useEffect, useState, useRef } from 'react'
import { FiHome, FiUser, FiSearch, FiFilter } from 'react-icons/fi'
import { motion } from 'framer-motion'
import PgCard from '@components/PgCard'
import { filterOptions } from '@utils/Constants'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PopUp from '@components/PopUp'
import SortBy from '@components/SortBy'
import FiltersPopUp from '@components/FiltersPopUp'
import { SlidersHorizontal } from 'lucide-react'
import allAPIs from '@utils/allAPIs'
import Loader from '@components/Loader'
import { useToast } from '@components/ToastProvider'
import PhoneCard from '@components/PhoneCard'
import RecentlyAdded from '@components/RecentlyAdded'
import WhyChooseUsSection from '@components/WhyChooseUsSection'
import CryptoJS from 'crypto-js';

const useQuery = () => new URLSearchParams(useLocation().search);

const HeroSection = () => {
  const query = useQuery();
  const cityFilter = query.get("city");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [properties, setProperties] = useState([]);
  const [pageContext, setPageContext] = useState({});
  const [searchVal, setSearchVal] = useState("");
  const searchInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate()
  const filtersRef = useRef();

  const [formData, setFormdata] = useState({
    page: 1,
    limit: 10,
    sort: "DESC",
    searchValue: cityFilter ? cityFilter : "",
    location: "",
    category: null,
    sharing: null,
    roomType: null,
    tenantsPreferred: [],
    parkingAvailability: [],
    food: [],
    facilityAndServices: [],
    minPrice: null,
    maxPrice: null
  })

  const handleClick = (id) => {
    const secretKey = "staymap123";
    const encryptedId = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
    navigate(`/property/${encodeURIComponent(encryptedId)}`);
  };
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    category: 0,
    sharing: 0,
    roomType: 0,
  });
  const popupPayload = {
    header: "More Filters",
    fromComponent: "filters",
    currentFilters: {
      priceRange: [formData.minPrice || 1, formData.maxPrice || 50000],
      selectedTenant: formData.tenantsPreferred || [],
      selectedFood: formData.food || [],
      parkingValues: formData.parkingAvailability || [],
      selectedFacilities: formData.facilityAndServices || [],
    },
  };
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const validFormData = Object.fromEntries(
        Object.entries(formData).filter(
          ([_, value]) =>
            value !== null &&
            value !== undefined &&
            (Array.isArray(value) ? value.length > 0 : value !== "")
        )
      );


      const response = await allAPIs.getVerifiedProperties(validFormData);
      if (response.data.status) {
        setProperties(response.data.data);
        setPageContext(response.data.pageContext || {});
      } else {
        setProperties([]);
        showToast("Something went wrong", "Error");
      }
    } catch (err) {
      setProperties([]);
      showToast("Failed to fetch properties", "Error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  useEffect(() => {
    fetchProperties();
  }, [formData]);

  useEffect(() => {

    if (cityFilter) {
      setSearchVal(cityFilter.toLowerCase());
    }
    else {
      setSearchVal("");
    }
  }, [cityFilter]);

  const handlePageChange = (direction) => {
    setFormdata((prev) => ({
      ...prev,
      page: direction === "next" ? prev.page + 1 : Math.max(1, prev.page - 1),
    }));
  };

  useEffect(() => {
    const isUserCreatedFirstTime = localStorage.getItem("isUserCreatedFirstTime");
    const value = localStorage.getItem("accessToken") + localStorage.getItem("refreshToken");
    if (isUserCreatedFirstTime == value) {
      setShowPopup(true);
    }
  }, [location.state]);

  useEffect(() => {
    const handleFocusInput = () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };

    window.addEventListener("focusSearchInput", handleFocusInput);

    return () => {
      window.removeEventListener("focusSearchInput", handleFocusInput);
    };
  }, [navigate]);

  const handleSearch = () => {
    const focusEvent = new Event("focusSearchInput");
    window.dispatchEvent(focusEvent);
  }

  const handleSortChange = (sortOrder) => {
    setFormdata((prev) => ({
      ...prev,
      sort: sortOrder,
    }));
  };

  const handleFilterChange = (filterName, value) => {
    const updatedValue = value;
    setFilters((prev) => ({ ...prev, [filterName]: updatedValue }));
    setFormdata((prev) => ({ ...prev, [filterName]: updatedValue }));
  };
  const handleApplyFilters = () => {
    if (filtersRef.current) {
      const {
        priceRange,
        selectedTenant,
        selectedFood,
        parkingValues,
        selectedFacilities,
        searchVal = formData.searchValue,
      } = filtersRef.current;

      const popupFilters = {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        tenantsPreferred: selectedTenant,
        parkingAvailability: parkingValues,
        food: selectedFood,
        facilityAndServices: selectedFacilities,
        searchValue: searchVal,
      };

      setFormdata((prev) => ({
        ...prev,
        ...popupFilters,
      }));

      setShowMoreFilters(false);

      // Trigger fetchProperties after updating formData
      fetchProperties();
    }
  };
  // const dropdownFilters = {};
  // filterOptions.forEach(({ id }) => {
  //   if (filters[id]) {
  //     dropdownFilters[id] = filters[id];
  //   }
  // });


  // setFormdata((prev) => ({
  //   ...prev,
  //   ...popupFilters,
  //   ...dropdownFilters,
  // }));

  const toggleMoreFilters = () => setShowMoreFilters(!showMoreFilters);

  return (
    <div className="min-h-screen bg-gray-50">
      {showPopup && <PopUp from="signup" onClose={false} />}
      {loading && <Loader />}
      <div className="relative pt-8 md:pt-20 pb-5 -mt-2 md:m-0 px-4 bg-white overflow-hidden">
        <div className="hidden md:block absolute inset-0 z-0">
          <div className="absolute inset-0 "></div>
          <img
            src="/assets/Images/home.webp"
            alt="HomeSection"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-600 bg-clip-text text-transparent"
          >
            Find Your Perfect Stay with Staymap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-md md:text-xl mb-8 text-black md:text-white"
          >
            Discover comfortable living spaces that suit your needs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white border border-blue-700 md:border-none rounded-lg overflow-hidden mb-1 md:mb-2"
          >
            <div className="flex items-center pr-4">
              <div className="flex-grow flex items-center px-4">
                <FiSearch size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);

                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setFormdata((prev) => ({ ...prev, searchValue: searchVal }))
                      navigate('/')
                    }
                  }}
                  placeholder="Search by PG Name, Locality"
                  className="w-full py-3 outline-none text-gray-700 placeholder:text-sm"
                />
              </div>
              <button className="hidden md:block bg-blue-600 hover:bg-blue-700 rounded-sm text-white px-3 py-1 transition-colors duration-300">
                Search
              </button>
              <button className="md:hidden" onClick={toggleMoreFilters}>
                <SlidersHorizontal size={18} className="text-gray-400 ml-2" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-4xl mx-auto  rounded-lg  md:p-4"
          >
            <div className="md:hidden  py-2 overflow-x-auto no-scrollbar ">
              <div className="flex space-x-2 w-max">
                {filterOptions.map(({ id, title, options }) => (
                  <select
                    key={id}
                    value={filters[id]}
                    className={`px-3 py-2 rounded-full outline-none text-sm whitespace-nowrap ${filters[id]
                      ? "bg-blue-100 text-blue-00"
                      : "bg-gray-100 text-gray-600"
                      }`}
                    onChange={(e) => handleFilterChange(title, e.target.value)}
                  >
                    {options.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                ))}
                <button
                  className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
                  onClick={toggleMoreFilters}
                >
                  <FiFilter className="mr-1" /> More Filters
                </button>
              </div>
            </div>

            <div className="hidden md:flex flex-wrap items-center justify-between gap-4">
              {filterOptions.map(({ id, title, options }) => (
                <div key={id} className="flex-1 min-w-[150px]">
                  <select
                    value={filters[id]}
                    className="w-full p-2 border border-blue-200 text-sm rounded outline-none text-gray-600"
                    onChange={(e) => handleFilterChange(title, e.target.value)}
                  >
                    {options.map(({ value, label }) => (
                      <option key={value} value={value} className="bg-white">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={toggleMoreFilters}
                className=" bg-white p-2 border min-w-[150px] border-blue-200 text-sm flex items-center justify-center"
              >
                <FiFilter className="mr-1" />
                More Filters
              </button>
            </div>

            {showMoreFilters && (
              <div className="fixed inset-0  bg-white z-20 overflow-y-auto">
                <div className="p-4 space-y-5">
                  <FiltersPopUp
                    onClose={() => setShowMoreFilters(false)}
                    onApply={handleApplyFilters}
                    popupPayload={popupPayload}
                    mobileView={true}
                    ref={filtersRef}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="px-6">
        <div className="hidden md:flex container mx-auto py-8 text-sm justify-center space-x-6">
          <Link
            to={"/postproperty"}
            className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium flex items-center transition-colors duration-300 hover:scale-105"
          >
            <FiHome className="mr-2" /> Post Property
          </Link>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors duration-300 hover:scale-105"
          >
            Get Started <FiUser className="ml-2" />
          </button>
        </div>
        <SortBy onSortChange={handleSortChange} location={formData.location} />

        <div className="flex flex-col items-center justify-center w-full gap-4 py-8">
          {loading ? (
            <Loader />
          ) : properties.length > 0 ? (
            properties.map((pg) => (
              <div key={pg.id} onClick={() => handleClick(pg.id)} className="flex flex-col items-center cursor-pointer w-full">
                <div className="hidden md:block w-3/4">
                  <PgCard data={pg} />
                </div>

                <div className="block md:hidden w-full px-0">
                  <PhoneCard data={pg} />
                </div>
              </div>
            ))
          ) : (
            <p>No properties found</p>
          )}
        </div>

        {properties.length > 0 && (
          <>
            <div className="flex items-center justify-center gap-4 text-sm">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={formData.page <= 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {formData.page} {pageContext.totalPages ? `of ${pageContext.totalPages}` : ""}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={pageContext.totalPages && formData.page >= pageContext.totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <RecentlyAdded />
          </>
        )}
        <WhyChooseUsSection />
      </div>
    </div>
  );
};

export default HeroSection;
