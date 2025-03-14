import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CgToggleOn } from "react-icons/cg";
import { FaToggleOn } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { TbView360Number, TbAirConditioning } from "react-icons/tb";
import { IoWifi, IoBedOutline } from "react-icons/io5";
import { PiHeartStraightThin, PiHeartStraightFill } from "react-icons/pi";
import { image1, sharingtype } from "../utils/Constants";
import Verified from "./Verified";
import { Link } from "react-router-dom";
const Card = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isFavourite, setIsFavorite] = useState(false);
  return (
    <div className="ml-2 w-full relative">
      <Verified isverified="Verified+" />
      <Link to={"/card"}>
        <div className=" flex p-2 h-72 w-full  bg-gradient-to-t from-blue-200  via-white to-[#67BDFF] from-2% via-95%  items-center w-[100%] rounded-md border-black shadow-md">
          <div
            style={{ backgroundImage: `url(${image1})` }}
            className="relative w-72 h-52 bg-cover"
          >
            <div className="top-40 left-0 w-[75%] gap-2 relative bg-[#008EFF]/40 rounded-tr-full text-white w-48 h-12 p-2 flex items-cwnter justify-center">
              <IoBedOutline className="mt-1" /> <p>Beds Available</p>
            </div>
          </div>
          <div className="p-4 w-[80%]">
            <div className="flex space-x-3 text-[#909090]">
              <p>Joy stayz premium coliving spaces PG/Paying Guest </p>
              <CiLocationOn className="text-xl text-green-700" />
              <p>Madhapur</p>
              <div className="relative -mt-16 -right-[25%]">
                <button className=" pgtag absolute top-4  h-16 bg-[#2667FF] border-2 border-dotted border-white outline text-white p-2">
                  Boys
                </button>
                {/* <p className="text-white -mt-12 ml-4">Boys</p> */}
              </div>
            </div>
            <hr className="border border-[#909090] mt-4" />
            <div className="flex space-x-3 m-4 divide-x-2 divide-[#909090] text-[#303030]">
              {sharingtype.map((type, index) => (
                <div className="pl-4" key={index}>
                  <p className="text-[#909090]">{type}</p>
                  <span>₹{15000 - index * 1500}</span>
                </div>
              ))}

              <div className="flex pl-4">
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
            <span className="absolute text-3xl left-[95%]">
              {isFavourite ? (
                <PiHeartStraightFill
                  className="text-blue-700"
                  onClick={() => setIsFavorite(!isFavourite)}
                />
              ) : (
                <PiHeartStraightThin
                  onClick={() => setIsFavorite(!isFavourite)}
                  className="text-black"
                />
              )}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
