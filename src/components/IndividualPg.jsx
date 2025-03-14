import React from "react";
import { FaShareAltSquare } from "react-icons/fa";
import { PiHeartStraightThin, PiHeartStraightFill } from "react-icons/pi";
import { LuMapPin } from "react-icons/lu";
import { TbView360Number } from "react-icons/tb";
import { MdCurrencyRupee } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import {
  Facilities,
  pgsharing,
  shareheading,
  sharingdata,
  menuheading,
  menudata,
  facilityNames,
} from "../utils/Constants";

const IndividualPg = () => {
  return (
    <div className="text-sm px-16 py-8 gap-4">
      <div className="flex border items-start justify-between p-2 border border-black mb-4 text-md">
        <div className="flex gap-4">
          <div className="h-auto">
            <h1 className="font-bold">R3 Lexus Coliving PG / PayingGuest</h1>
            <p>in Madhapur</p>
          </div>
          {true ? (
            <span className="flex text-[#009681] text-[10px] h-6 px-4 border border-[#009681] rounded-md">
              BEDS AVAILABLE
            </span>
          ) : (
            <span className="text-red-400 text-[10px] h-6 border p-0 px-2 border-red-400">
              BEDS NOT AVAILABLE
            </span>
          )}
          <span className="text-red-400 border p-0 px-2 h-6 border-red-400 rounded-md text-[10px]">
            STUDENTS & WORKING PROFESSIONALS
          </span>
        </div>

        <div className="flex text-2xl p-2 items-center gap-4">
          <FaShareAltSquare className="text-gray-500  text-2xl outline outline-gray-500" />
          {true ? (
            <PiHeartStraightThin className="text-2xl" />
          ) : (
            <PiHeartStraightFill />
          )}
        </div>
      </div>
      <div className="flex">
        <div
          style={{ backgroundImage: `url("https://placehold.co/1000x500")` }}
          className="relative w-[80%] h-96 bg-cover"
        ></div>

        <div className="border border-black m-2 ml-12 mr-0 mt-0">
          <div className="grid grid-cols-2">
            {Facilities.map((facility) => (
              <div
                key={facility.title}
                className="flex items-center p-3 gap-2 border border-black"
              >
                <span className="text-xl">{facility.icon}</span>
                <div className="flex flex-col justify-center items-center">
                  <span>{facility.title}</span>
                  <span className="font-bold">{facility.value}</span>
                </div>
              </div>
            ))}
          </div>
          <span className="flex items-center justify-center border border-black h-14">
            Accurate Adderss
          </span>
          <div className="flex justify-around py-1 border border-black text-xs">
            <button className="w-auto h-auto bg-gradient-to-b  from-[#2667FF] to-[#87BFFF] text-white rounded-md px-2">
              Contact Owner
            </button>
            <button className="w-auto bg-gradient-to-b  from-[#2667FF] to-[#369FF6] text-white text-xs rounded-md px-2">
              Contact Supervisor
            </button>
            <LuMapPin className="text-blue-500 text-3xl" />
            <TbView360Number className=" text-3xl" />
          </div>
        </div>
      </div>
      <div className="border border-black mt-8">
        <div className="flex justify-around items-center my-2 w-[100%]">
          {pgsharing.map((share) => (
            <button
              key={share}
              className="px-4 py-2 bg-gray-200 border border-black rounded"
            >
              {share}
            </button>
          ))}
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {shareheading.map((heading) => (
                <th key={heading} className="border border-gray-300 px-4 py-2">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sharingdata.map((data) => (
              <tr key={data.accommodation}>
                <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                  {data.accommodation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="flex items-center justify-center">
                    <MdCurrencyRupee className="mr-1" />
                    {data.monthlyRent}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="flex items-center justify-center">
                    <MdCurrencyRupee className="mr-1" />
                    {data.dailyRent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1 className="text-xl font-bold mt-6 mb-2">Menu</h1>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-100">
            {menuheading.map((heading) => (
              <th
                key={heading.label}
                className="border border-gray-300 px-4 py-2"
              >
                <div>{heading.label}</div>
                <div className="text-xs text-gray-600">{heading.time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {menudata.map((data) => (
            <tr key={data.day}>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {data.day}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.breakfast}
              </td>
              <td className="border border-gray-300 px-4 py-2">{data.lunch}</td>
              <td className="border border-gray-300 px-4 py-2">
                {data.snacks}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.dinner}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="font-bold text-xl">Facilities & Services</h1>
      <div className="grid grid-cols-5 p-16">
        {facilityNames.map((facility) => (
          <div key={facility} className="h-16  m-8">
            <span className="text-4xl text-black">{facility.icon}</span>
            <span>{facility.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualPg;
