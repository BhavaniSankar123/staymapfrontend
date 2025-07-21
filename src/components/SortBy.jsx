import React, { useState, useEffect, useRef } from "react";
import { MdSort } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const SortBy = ({ onSortChange, location = "Hyderabad" }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Newest First");

    const sortbyRef = useRef();

    const handleToggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleSortChange = (value) => {
        setSelectedSort(value);
        setDropdownOpen(false);
        if (onSortChange) onSortChange(value === "Newest First" ? "DESC" : "ASC");
    };

    const handleClickOutside = (event) => {
        if (sortbyRef.current && !sortbyRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-row md:w-3/4 justify-between items-center md:mx-auto gap-2 sm:gap-0 px-2 md:px-0 py-3 h-auto text-lg sm:text-xl text-gray-600  rounded-md">
            <div className="text-base text-black font-bold">
                <p>Best PG's in {location || "Hyderabad"} </p>
            </div>

            <div className="relative" ref={sortbyRef}>
                <button
                    className="flex items-center text-sm w-28 md:w-auto font-medium space-x-1 px-2 py-1  rounded-md hover:bg-gray-100"
                    onClick={handleToggleDropdown}
                >
                    <MdSort className="text-lg sm:text-xl" />
                    <span>Sort By </span>
                    <span className="hidden md:block">{selectedSort}</span>
                    {dropdownOpen ? (
                        <IoIosArrowUp />
                    ) : (
                        <IoIosArrowDown />
                    )}

                </button>

                {dropdownOpen && (
                    <div className="absolute top-10 right-0 w-40 bg-white rounded-md shadow-md text-sm z-50">
                        {["Newest First", "Oldest First"].map((option) => (
                            <button
                                key={option}
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${selectedSort === option ? "bg-gray-100 font-semibold" : ""
                                    }`}
                                onClick={() => handleSortChange(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortBy;
