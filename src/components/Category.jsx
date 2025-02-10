import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaTransgenderAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaBed } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Filters from "./Filters";

const Category = () => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <div className="flex  h-12 mr-8 text-[#005ca8] text-sm items-center space-x-4 p-0">
      <div className="flex items-center space-x-4 text-sm">
        <FaLocationDot className="text-2xl text-[#005ca8]" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Locality</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            <option value="Madhapur">Madhapur</option>
            <option value="Gachibowli">Gachibowli</option>
            <option value="Hi-Tech City">Hi-Tech City</option>
            <option value="Ameerpet">Ameerpet</option>
            <option value="Secunderabad">Secunderabad</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <FaTransgenderAlt className="text-2xl text-blue-800" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Gender</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Co-live">Co-live</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4v text-sm">
        <IoMdPerson className="text-2xl text-blue-800" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Sharing</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm w-36">
        <FaBed className="text-2xl text-blue-800" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Room Type</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            <option value="Male">AC</option>
            <option value="Female">Non-AC</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm w-44">
        <FaFilter className="text-2xl text-blue-800" />
        <div className="flex space-x-2">
          <button
            className="text-lg font-bold text-[#005ca8]"
            onClick={toggleFilters}
          >
            More Filters
          </button>
          <RiArrowDropDownLine className="text-[#1c1c1c]/60 mt-1 text-2xl " />
        </div>
      </div>
      {showFilters && ( // Add this line  bg-[#9EC9FF4D] to the div
        <div className="popup absolute top-36 right-0 bg-[#110077]  shadow-lg p-4 z-50">
          <Filters />
          <button
            className="absolute top-2 right-2 text-lg font-bold text-[#005ca8]"
            onClick={toggleFilters}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
