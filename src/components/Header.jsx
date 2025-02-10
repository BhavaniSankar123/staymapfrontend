import { BsPersonCircle } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
// import "./Header.css";
const Header = () => {
  const [dropdownExplore, setDropdownExplore] = useState(false);
  const [dropdownProfile, setDropdownProfile] = useState(false);

  const handleDropdownExplore = () => {
    setDropdownExplore(!dropdownExplore);
    setDropdownProfile(false);
  };
  const handleDropdownProfile = () => {
    setDropdownProfile(!dropdownProfile);
    setDropdownExplore(false);
  };
  return (
    <div className="bg-[#005ca8] h-[75px] font-bold p-8 pl-16 flex justify-between items-center">
      <h1 className="text-white text-4xl font-bold">staymap</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-white font-bold">POST PROPERTY</p>
          <button className="bg-white text-black text-align font-bold w-10 h-6 rounded-md">
            FREE
          </button>
        </div>
        <div className="relative ">
          <button
            onClick={() => handleDropdownExplore()}
            className="flex text-white px-4 py-2 rounded"
          >
            Explore Us
            <RiArrowDropDownLine className="text-white-800 text-3xl " />
          </button>
          {dropdownExplore && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
              >
                About Us
              </a>
              <a
                href="#"
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
              >
                Our Team
              </a>
              <a
                href="#"
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
              >
                Contact Us
              </a>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => handleDropdownProfile()}
            className="flex text-white px-4 py-2 rounded"
          >
            <BsPersonCircle className="text-[#005ca8] bg-white text-2xl rounded-full" />
            <RiArrowDropDownLine className="text-white-800  text-3xl" />
          </button>
          {dropdownProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a
                href="#"
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
              >
                LOGIN/REGISTER
              </a>
              <a
                href="#"
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
              >
                Favourites
              </a>
              <a
                href="#"
                className="block px-4 py-1 text-gray-800 hover:bg-gray-200"
              >
                Recently Used
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
