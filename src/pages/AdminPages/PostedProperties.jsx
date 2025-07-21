import React, { useState, useEffect } from 'react'
import allAPIs from '@utils/allAPIs'
import Loader from '@components/Loader'
import { POSTED_PROPERTIES_STATUS } from '@utils/Constants'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { TbRefresh, TbSearch, TbInfoCircleFilled } from 'react-icons/tb'
import PopUp from '@components/PopUp'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const PostedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [pageContext, setPageContext] = useState({
    currentPage: 1,
    totalPages: 1,
    recordsPerPage: 10,
    totalRecords: 0,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    search: "",
    status: "0",
  });
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await allAPIs.getPostedProperties(filters);
      if (response.data.status) {
        setProperties(response.data.data);
        setPageContext(response.data.pageContext);
        setError(null);
      } else {
        setProperties([]);
        throw new Error(response.data.message || "Failed to fetch properties");
      }
    } catch (err) {
      setProperties([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageContext.totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchValue = formData.get("search").trim();
    setFilters((prev) => ({
      ...prev,
      page: 1,
      search: searchValue,
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      sort: e.target.value,
    }));
  };

  const handleStatusFilter = (e) => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      status: e.target.value,
    }));
  };

  const handleRefresh = () => {
    setFilters({
      page: 1,
      limit: 10,
      sort: "desc",
      search: "",
      status: "0",
    });
  };

  const handlePopupClose = () => {
    setSelectedProperty(null);
    fetchProperties();
  };

  return (
    <div className="min-h-screen p-6">
      {loading && <Loader />}
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          <Link
            to={"/admin/dashboard"}
            className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white  px-2 py-2 "
          >
            <BiArrowBack size={18} />
          </Link>
        </div>
        <h1 className="text-xl text-center text-blue-800 mb-6 font-semibold">Posted Properties</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            title="Refresh"
          >
            <TbRefresh className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white p-2 rounded-xl shadow-lg mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-center text-sm">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <TbSearch className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search by properties name..."
                defaultValue={filters.search}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Search
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="appearance-none pl-3 pr-8 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white w-full"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <HiOutlineChevronDown className="h-4 w-4" />
                </div>
              </div>

              <div className="relative">
                <select
                  value={filters.status}
                  onChange={handleStatusFilter}
                  className="appearance-none pl-3 pr-8 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white w-full"
                >
                  <option value="">All Status</option>
                  {Object.entries(POSTED_PROPERTIES_STATUS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <HiOutlineChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">S.No</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Client ID</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Client Name</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Property Name</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Mobile</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Whatsapp</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Address</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Status</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Posted Date</th>
                  <th className="p-2 text-left text-sm font-semibold text-blue-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.length > 0 ? (
                  properties.map((property, index) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="p-2 text-sm text-gray-500">{index + 1}</td>
                      <td className="p-2 text-sm text-gray-500">{property.id}</td>
                      <td className="p-2 text-sm text-gray-500">{property.client_name}</td>
                      <td className="p-2 text-sm font-medium text-gray-900">{property.property_name}</td>
                      <td className="p-2 text-sm text-gray-500">{property.mobile_number}</td>
                      <td className="p-2 text-sm text-gray-500">
                        {property.is_whatsapp_number === 1 ? (
                          <span className="text-green-600 font-bold text-lg">✅</span>
                        ) : (
                          <span className="text-red-500 font-bold text-lg">❌</span>
                        )}
                      </td>
                      <td className="p-2 text-sm text-gray-500">{property.address}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-2 w-32 inline-flex justify-center text-xs leading-5 font-semibold rounded-full ${property.status === 0
                            ? "bg-blue-100 text-blue-800"
                            : property.status === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : property.status === 2
                                ? "bg-orange-100 text-orange-800"
                                : property.status === 3
                                  ? "bg-green-100 text-green-800"
                                  : property.status === 4
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {POSTED_PROPERTIES_STATUS[property.status] || "Colive"}
                        </span>
                      </td>
                      <td className="p-2 text-sm text-gray-500">
                        {new Date(property.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-sm font-medium">
                        <div className="flex items-center gap-2 relative group">
                          <button className="bg-blue-600 py-1 px-2 text-center text-sm text-white rounded-lg" onClick={() => setSelectedProperty(property)}>
                            Actions
                          </button>

                          <div className="relative">
                            <TbInfoCircleFilled className="text-blue-500 w-5 h-5 cursor-pointer" />
                            <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                              {property.comments}
                            </div>
                          </div>
                        </div>
                        {selectedProperty?.id === property.id && (
                          <PopUp
                            from="postProperty"
                            data={selectedProperty}
                            onClose={handlePopupClose}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center px-6 py-4 text-sm text-gray-500">
                      No properties found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pageContext.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(pageContext.currentPage - 1) * pageContext.recordsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pageContext.currentPage * pageContext.recordsPerPage,
                      pageContext.totalRecords
                    )}
                  </span>{" "}
                  of <span className="font-medium">{pageContext.totalRecords}</span> results
                </p>
                <nav className="inline-flex -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pageContext.currentPage - 1)}
                    disabled={pageContext.currentPage === 1}
                    className="px-3 py-2 border border-gray-300 text-sm rounded-l-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    &larr;
                  </button>
                  {Array.from({ length: pageContext.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 border text-sm font-medium ${pageNum === pageContext.currentPage
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(pageContext.currentPage + 1)}
                    disabled={pageContext.currentPage === pageContext.totalPages}
                    className="px-3 py-2 border border-gray-300 text-sm rounded-r-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostedProperties;
