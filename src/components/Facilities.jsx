import React from "react";

const Facilities = ({ facility, index }) => {
  return (
    <li key={index} className="flex items-center justify-center gap-3 px-2 py-6 md:py-6 bg-white shadow-md shadow-gray-400 rounded-lg">
      <p className="text-4xl text-blue-800 animate-bounce">{facility.icon}</p>
      <p className=" text-gray-700 text-xs md:text-sm font-medium">{facility.title}</p>
    </li>
  );
};

export default Facilities;
