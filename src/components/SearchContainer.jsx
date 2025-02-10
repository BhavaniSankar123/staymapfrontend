import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../index.css";
const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    // Add your search logic here
  };

  return (
    <div className="flex items-center w-[90%]  justify-start pl-8 pt-2 ">
      <form
        onSubmit={handleSearch}
        className="flex justify-between pl-4 w-[90%] bg-white border border-[#99CEFD] shadow-md  shadow-black/60  p-1 rounded-md inset-ring-2 inset-ring-[#005ca8] focus:outline-none focus:ring-2 focus:ring-[#005ca8]"
      >
        <FaSearch className="text-gray-500 text-xl pt-2" />
        <input
          type="text"
          className="flex-grow p-1 text-sm focus:outline-none"
          placeholder="Locality, Name, Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className=" w-20 bg-[#005ca8] border-[#99CEFD] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchContainer;
