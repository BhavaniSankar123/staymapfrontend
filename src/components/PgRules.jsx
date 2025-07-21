import React from "react";

const PgRules = ({ rule, index }) => {
  return (
    <li
      key={index}
      className="flex items-center justify-center bg-white gap-4 py-6 rounded-xl shadow-sm shadow-gray-400"
    >
      <p className="text-5xl text-blue-800">{rule.icon}</p>
      <div className="flex flex-col items-center justify-center text-black">
        <h2 className=" text-sm">{rule.title}</h2>
        <span className="font-medium text-lg text-black">{rule.value}</span>
      </div>
    </li>
  );
};

export default PgRules;
