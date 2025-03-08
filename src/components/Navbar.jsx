import { BsPersonCircle } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
const Navbar = () => {
  const [dropdownExplore, setDropdownExplore] = useState(false);
  const [dropdownProfile, setDropdownProfile] = useState(false);
  const exploreRef = useRef(null);
  const profileRef = useRef(null);

  const handleDropdownExplore = () => {
    setDropdownExplore(!dropdownExplore);
    setDropdownProfile(false);
  };
  const handleDropdownProfile = () => {
    setDropdownProfile(!dropdownProfile);
    setDropdownExplore(false);
  };
  const handleClickOutside = (event) => {
    if (
      exploreRef.current &&
      !exploreRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setDropdownExplore(false);
      setDropdownProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-[#005ca8] h-[75px] font-bold p-8 pl-16 flex justify-between items-center">
      <Link to={"/"} className="text-white text-4xl font-bold">
        staymap
      </Link>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-white font-bold">POST PROPERTY</p>
          <button className="bg-white text-black text-align font-bold w-10 h-6 rounded-md">
            FREE
          </button>
        </div>
        <div className="relative " ref={exploreRef}>
          <button
            onClick={() => handleDropdownExplore()}
            className="flex text-white px-4 py-2 rounded"
          >
            Explore Us
            <RiArrowDropDownLine className="text-white-800 text-3xl " />
          </button>
          {dropdownExplore && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <Link
                to={"/about"}
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownExplore(false)}
              >
                About Us
              </Link>
              <Link
                to={"/ourteam"}
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownExplore(false)}
              >
                Our Team
              </Link>
              <Link
                to={"/contact"}
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownExplore(false)}
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => handleDropdownProfile()}
            className="flex text-white px-4 py-2 rounded"
          >
            <BsPersonCircle className="text-[#005ca8] bg-white text-2xl rounded-full" />
            <RiArrowDropDownLine className="text-white-800  text-3xl" />
          </button>
          {dropdownProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <Link
                to={"/login"}
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownProfile(false)}
              >
                LOGIN/REGISTER
              </Link>
              <Link
                to={"/favourites"}
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownProfile(false)}
              >
                Favourites
              </Link>
              <Link
                to={"/recentlyused"}
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
                onClick={() => setDropdownProfile(false)}
              >
                Recently Used
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
