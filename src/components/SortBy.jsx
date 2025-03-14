import { React, useState, useEffect, useRef } from "react";
import { MdSort } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const SortBy = () => {
  const [sortby, setSortby] = useState({
    dropdown: false,
    isSortby: false,
  });
  const handleToggleSortby = () => {
    setSortby({
      dropdown: !sortby.dropdown,
      isSortby: !sortby.isSortby,
    });
  };
  const sortbyRef = useRef();
  const handleClickOutside = (event) => {
    if (sortbyRef.current && !sortbyRef.current.contains(event.target)) {
      setSortby({
        dropdown: false,
        isSortby: false,
      });
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex justify-between  ml-8 mr-8 h-12 text-2xl text-gray-600  bg-yellow-100/20 border border-[#808080] rounded-md">
      <div className="flex justify-center text-xl items-center p-4">
        <p>144 Best PG's in Madhapur, Telangana.</p>
      </div>
      <div className="flex items-center space-x-2 p-0" ref={sortbyRef}>
        <div className="relative  -right-36 top-16">
          {sortby.dropdown && (
            <div className="relative text-sm  w-36 flex-col  bg-white rounded-md shadow-md shadow-black">
              <button className="py-1 w-36 text-gray-800 hover:bg-gray-200">
                Price(High-Low)
              </button>
              <button className="py-1 w-36 text-gray-800 hover:bg-gray-200">
                Price(Low-High)
              </button>
              <button className="py-1 w-36 text-gray-800 hover:bg-gray-200">
                Nearest First
              </button>
            </div>
          )}
        </div>

        <button
          className="flex items-center text-sm font-bold space-x-2"
          onClick={() => handleToggleSortby()}
        >
          <MdSort className="mt-0.5 mr-0.5" />
          Sort By
          {sortby.isSortby ? (
            <IoIosArrowUp className="mt-1" />
          ) : (
            <IoIosArrowDown className="mt-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SortBy;
