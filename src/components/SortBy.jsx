import React from "react";
import { MdSort } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
const SortBy = () => {
  const [dropdownSortby, setDropdownSortby] = React.useState(false);
  return (
    <div className="flex justify-between  ml-8 pr-4 mr-8 h-12 text-2xl text-gray-600  bg-yellow-100/20 border border-[#808080] rounded-md">
      <div className="flex justify-center text-xl items-center p-4">
        <p>144 Best PG's in Madhapur, Telangana.</p>
      </div>
      <div className="flex items-start space-x-2 p-0">
        <div className="relative  -right-36 -top-24">
          {dropdownSortby && (
            <div className="relative p-1   text-sm  w-[130px] bg-white rounded-md shadow-md shadow-black z-10">
              <a
                href="#"
                className="block px-4 py-1 w-40 text-gray-800 hover:bg-gray-200"
              >
                Price(High-Low)
              </a>
              <a
                href="#"
                className="block px-4 py-1 w-40 text-gray-800 hover:bg-gray-200"
              >
                Price(Low-High)
              </a>
              <a
                href="#"
                className="block px-4 py-1 w-40 text-gray-800 hover:bg-gray-200"
              >
                Nearest First
              </a>
            </div>
          )}
        </div>
        <MdSort />
        <button
          className="flex items-center text-sm font-bold pt-0 space-x-3"
          onClick={() => setDropdownSortby(!dropdownSortby)}
        >
          Sort By
          <IoIosArrowUp />
        </button>
      </div>
    </div>
  );
};

export default SortBy;
