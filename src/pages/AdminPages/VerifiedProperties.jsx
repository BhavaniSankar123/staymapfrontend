import React, { useEffect, useState, useRef } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import PgCard from '@components/PgCard'
import allAPIs from '@utils/allAPIs'
import Loader from '@components/Loader'
import { useToast } from '@components/ToastProvider'
const VerifiedProperties = () => {
  const [formData, setFormdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [properties, setProperties] = useState([]);
  const [pageContext, setPageContext] = useState({});

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await allAPIs.getVerifiedProperties(formData);
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
    fetchProperties();
  }, []);

  // const handlePageChange = (direction) => {
  //   setFormdata((prev) => ({
  //     ...prev,
  //     page: direction === "next" ? prev.page + 1 : Math.max(1, prev.page - 1),
  //   }));
  // };
  return (
    <div className="flex flex-col items-center justify-center" >
      {loading && <Loader />}
      <div className="flex">
        <Link
          to={"/admin/dashboard"}
          className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white  px-2 py-2 "
        >
          <BiArrowBack size={18} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 py-8 md:px-8 md:mt-8">
        <h1 className='text-3xl font-bold text-center mt-10'>Verified Properties</h1>
        {loading ? (
          <Loader />
        ) : properties.length > 0 ? (
          properties.map((pg, index) => <PgCard data={pg} key={index} id={index} />)
        ) : (
          <p>No properties found</p>
        )}
      </div>
      {/* <div className="flex justify-center gap-4 my-4">
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
      </div> */}
    </div>
  );
};

export default VerifiedProperties;
