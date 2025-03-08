import React, { useState } from "react";
import {
  locality,
  gender,
  occupancy,
  amenties,
  services,
  bhk,
  parking,
  accessibility,
} from "../utils/Constants";

const Filters = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (item) => {
    if (selectedButtons.includes(item)) {
      setSelectedButtons(
        selectedButtons.filter((selected) => selected !== item)
      );
    } else {
      setSelectedButtons([...selectedButtons, item]);
    }
  };

  return (
    <div className="text-[#909090]  gap-4 pl-4">
      <h1 className="text-black place-self-center text-4xl ">Filters</h1>
      <div>
        <h1 className="text-xl">Localities</h1>
        <div className="grid  grid-cols-3 mt-4 gap-4">
          {locality.map((local) => (
            <div key={local}>
              <input
                type="checkbox"
                name="locality"
                className="text-[#005ca8]  checked:bg-[#1D9BFF] checked:text-[#1D9BFF]"
              />
              <label>{local}</label>
            </div>
          ))}
          <div>
            <button className="text-[#005ca8]">+ More...</button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Price Range</h1>
        <div className=" place-self-center w-full pl-16 pr-8">
          <input type="range" className="w-full " min={5000} max={15000} />
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="relative border border-[#1177FF] rounded-md ">
            <label className="absolute text-[10px] left-2 top-2 transform -translate-y-1/2 text-gray-500">
              Min Price
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded-md pl-8 pr-2 pt-3  focus:outline-[#ff0000]"
              min={5000}
              max={15000}
              step={500}
            />
          </div>
          <div className="relative border border-[#1177FF] rounded-md focus-within:border-[#1177FF]">
            <label className="absolute text-[10px] left-2 top-2 transform -translate-y-1/2 text-gray-500">
              Max Price
            </label>
            <input
              type="number"
              className="border border-gray-300 rounded-md pl-8 pr-2 pt-3 focus:outline-red-600"
              min={5000}
              max={15000}
              step={500}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Gender</h1>
        <div className="flex space-x-4 mt-4">
          {gender.map((gen) => (
            <div key={gen}>
              <input type="radio" id={gen} name="gender" />
              <label htmlFor={gen}>{gen}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Occupancy</h1>
        <div className="grid  grid-cols-2 mt-4 gap-4">
          {occupancy.map((occ) => (
            <div key={occ}>
              <input type="checkbox" name="occupancy" id={occ} />
              <label htmlFor={occ}>{occ}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Amenties</h1>
        <div className="grid  grid-cols-2 mt-4 gap-4">
          {amenties.map((amen) => (
            <button
              key={amen}
              className={`border border-[#909090] rounded-md w-36 p-1 ${
                selectedButtons.includes(amen)
                  ? "bg-[#005ca8] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick(amen)}
            >
              {amen}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Services</h1>
        <div className="grid  grid-cols-2 mt-4 gap-4">
          {services.map((serv) => (
            <button
              key={serv}
              className={`border border-[#909090] rounded-md w-36 p-1 ${
                selectedButtons.includes(serv)
                  ? "bg-[#005ca8] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick(serv)}
            >
              {serv}
            </button>
          ))}
          <button className="text-[#005ca8]">+ More...</button>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">BHK Type</h1>
        <div className="flex space-x-4">
          {bhk.map((bhk) => (
            <div key={bhk}>
              <input type="checkbox" name="bhk" id={bhk} />
              <label htmlFor={bhk}>{bhk}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Room Type</h1>
        <div className="flex mt-4 gap-4">
          <div>
            <input type="radio" name="type" id="ac" />
            <label htmlFor="ac">AC</label>
          </div>
          <div>
            <input type="radio" name="type" id="non-ac" />
            <label htmlFor="non-ac">NON AC</label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Parking Availability</h1>
        <div className="flex space-x-4">
          {parking.map((park) => (
            <div key={park}>
              <input type="checkbox" name="parking" id={park} />
              <label htmlFor={park}>{park}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Accessibility Filters</h1>
        <div className="flex space-x-4">
          {accessibility.map((access) => (
            <div key={access}>
              <input type="checkbox" name="accessibility" id={access} />
              <label htmlFor={access}>{access}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">More Filters</h1>
        <button
          className={`border border-[#909090] rounded-md w-36 p-1 ${
            selectedButtons.includes("selfcook")
              ? "bg-[#005ca8] text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleButtonClick("selfcook")}
        >
          Self Cooking
        </button>
      </div>
    </div>
  );
};

export default Filters;
