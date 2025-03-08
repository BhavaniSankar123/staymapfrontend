import React, { useState } from "react";
import { FaLocationDot, FaBed } from "react-icons/fa6";
import { FaTransgenderAlt, FaFilter } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import Filters from "./Filters";
import { locality, gender, sharing } from "../utils/Constants";

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
            {locality.map((local) => (
              <option key={local} value={local}>
                {local}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <FaTransgenderAlt className="text-2xl text-blue-800" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Gender</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            {gender.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4v text-sm">
        <IoMdPerson className="text-2xl text-blue-800" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Sharing</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            {sharing.map((share) => (
              <option key={share} value={share}>
                {share}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm w-36">
        <FaBed className="text-2xl text-blue-800" />
        <div className="flex flex-col mt-4 text-sm">
          <p className="text-lg font-bold text-[#005ca8] p-1">Room Type</p>
          <select className="border-none bg-transparent text-[#1c1c1c]/60">
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
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
