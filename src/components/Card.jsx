import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { CgToggleOn } from "react-icons/cg";
import { FaToggleOn } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { TbView360Number } from "react-icons/tb";
import { IoWifi } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
const Card = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <div className="ml-2 relative w-[100%] h-72">
      <button className=" absolute -top-2 -left-2 bg-[#1D9BFF] opacity-70 text-white p-2">
        Verified+
      </button>
      <div className="flex p-2 bg-gradient-to-t from-[#67BDFF]  via-white to-[#67BDFF] from-2% via-98% to-2% items-center w-[100%] rounded-md border-black shadow-md">
        {/* bg-gradient-to-t from-[#67BDFF]  via-white to-*/}
        <div className="relative">
          <img
            src="https://tinyurl.com/3y3888sn"
            alt="https://placehold.co/266x165"
          />
          <div className=" relative bg-[#008EFF]/40 -mt-8 rounded-full text-white w-48 h-12 p-2 flex items-cwnter justify-center">
            <IoBedOutline /> <p>Beds Available</p>
          </div>
        </div>
        <div className="p-4 ">
          <div className="flex space-x-3 text-gray-500">
            <p>Joy stayz premium coliving spaces PG/Paying Guest </p>
            <CiLocationOn className="text-xl text-green-700" />
            <p>Madhapur</p>
            <div className="relative -mt-12 -right-40">
              <FaBookmark className="text-blue-700 text-7xl p-0" />
              <p className="text-white -mt-10 ml-4">Boys</p>
            </div>
          </div>
          <hr className="border border-[#909090] mt-4" />
          <div className="flex space-x-3 m-4 divide-x-2 divide-[#909090] text-[#303030]">
            <div className="pl-4">
              <p className="text-[#909090]">Single</p>
              <span>₹15,000</span>
            </div>
            <div className="pl-4">
              <p className="text-[#909090]">Two Sharing</p>
              <span>₹15,000</span>
            </div>
            <div className="pl-4">
              <p className="text-[#909090]">Three Sharing</p>
              <span>₹15,000</span>
            </div>
            <div className="pl-4">
              <p className="text-[#909090]">Four Sharing</p>
              <span>₹15,000</span>
            </div>
            <div className="pl-4">
              <p className="text-[#909090]">Five Sharing</p>
              <span>₹15,000</span>
            </div>
            <div className="flex pl-4">
              {/* <CgToggleOn className="text-blue-600 text-2xl w-5" /> */}
              <p>AC</p>
              <div className="-mt-2">
                {isToggle ? (
                  <FaToggleOn
                    onClick={() => setIsToggle(!isToggle)}
                    className="text-4xl text-[#1177FF] pl-2 "
                  />
                ) : (
                  <CgToggleOn
                    onClick={() => setIsToggle(!isToggle)}
                    className="text-4xl text-[#1177FF] pl-2 "
                  />
                )}
              </div>
              <p className="ml-2">Non-AC</p>
            </div>
          </div>
          <hr className="border border-[#909090]" />
          <div className=" flex items-center p-4 space-x-2 text-[#1177FF] font-bold text-sm">
            <button className="w-36 bg-gradient-to-b  from-[#2667FF] to-[#87BFFF] text-white rounded-md p-2">
              Contact Owner
            </button>
            <button className="w-44 bg-gradient-to-b  from-[#2667FF] to-[#369FF6] text-white text-sm rounded-md p-2">
              Contact Supervisor
            </button>
            <button className="flex w-32 text-blue-500 ">
              <u>view on map</u> <IoIosSend className="pl-3  text-3xl" />
            </button>

            <button className="flex w-24 text-blue-500  ">
              <u>view on</u> <TbView360Number className="pl-3 text-3xl" />
            </button>
            <div className="flex space-x-2">
              <IoWifi className="text-3xl" />
              <TbAirConditioning className="text-3xl" />
              <p className="text-[#909090]">+More...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
