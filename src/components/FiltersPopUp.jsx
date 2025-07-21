import { X } from "lucide-react";
import { useState, useImperativeHandle, forwardRef } from "react";
import ReactSlider from "react-slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { facilities, parkingOptions, tenantOptions } from "@utils/Constants";
import { motion, AnimatePresence } from "framer-motion";

const FiltersPopUp = forwardRef(({ onClose, onApply, popupPayload }, ref) => {
    const {
        priceRange: initialPriceRange,
        selectedTenant: initialSelectedTenant,
        selectedFood: initialSelectedFood,
        parkingValues: initialParkingValues,
        selectedFacilities: initialSelectedFacilities,
    } = popupPayload.currentFilters;


    const [priceRange, setPriceRange] = useState(initialPriceRange);
    const [selectedTenant, setSelectedTenant] = useState(initialSelectedTenant);
    const [selectedFood, setSelectedFood] = useState(initialSelectedFood);
    const [parkingValues, setParkingValues] = useState(initialParkingValues);
    const [selectedFacilities, setSelectedFacilities] = useState(initialSelectedFacilities);

    useImperativeHandle(ref, () => ({
        priceRange,
        selectedTenant,
        selectedFood,
        parkingValues,
        selectedFacilities,
    }));
    const toggleFacility = (id) => {
        setSelectedFacilities((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    const handleParkingSelection = (value) => {
        setParkingValues((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };
    const handleTenantSelection = (value) => {
        setSelectedTenant((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleFoodSelection = (value) => {
        if (value === 0 && selectedFood.includes(1)) {
            setSelectedFood([0]);
        } else if (value === 1 && selectedFood.includes(0)) {
            setSelectedFood([1]);
        } else {
            setSelectedFood((prev) =>
                prev.includes(value)
                    ? prev.filter((item) => item !== value)
                    : [...prev, value]
            );
        }
    };
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-0 sm:p-6 md:p-10 lg:p-12"
            >
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-white w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-[80vh] p-6 rounded-t-2xl shadow-lg relative flex flex-col"
                >
                    <div className="absolute top-4 right-4">
                        <X
                            size={32}
                            className="cursor-pointer text-white bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition"
                            onClick={onClose}
                        />
                    </div>

                    <h2 className="text-md md:text-lg text-center font-semibold text-blue-800 mb-4">
                        {popupPayload.header}
                    </h2>

                    <div className="overflow-y-auto flex-1 px-2">
                        {popupPayload.fromComponent === "filters" && (
                            <div className="space-y-6">
                                <div className="p-4 border rounded-lg shadow">
                                    <h3 className="text-sm md:text-md font-semibold mb-4">Price Range</h3>
                                    <ReactSlider
                                        className="w-full h-2 rounded-lg"
                                        thumbClassName="h-5 w-5 bg-blue-600 rounded-full cursor-pointer -mt-2"
                                        value={priceRange}
                                        min={0}
                                        max={50000}
                                        step={1}
                                        onChange={(newRange) => setPriceRange(newRange)}
                                        pearling
                                        minDistance={1}
                                        renderTrack={(props, state) => (
                                            <div
                                                {...props}
                                                className={`h-1 rounded-lg ${state.index === 1 ? "bg-blue-600" : "bg-neutral-300"}`}
                                            />
                                        )}
                                    />
                                    <div className="flex justify-between items-center mt-4 gap-4">
                                        <div className="flex flex-col items-center border p-3 rounded-md w-36 shadow">
                                            <span className="text-xs font-semibold">Min Price</span>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-md font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full text-sm text-center outline-none"
                                                    value={priceRange[0]}
                                                    onChange={(e) =>
                                                        setPriceRange([
                                                            Math.min(Number(e.target.value), priceRange[1] - 1),
                                                            priceRange[1],
                                                        ])
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <span className="text-lg">—</span>
                                        <div className="flex flex-col items-center border p-3 rounded-md w-36 shadow">
                                            <span className="text-xs font-semibold">Max Price</span>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-md font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    className="w-full text-sm text-center outline-none"
                                                    value={priceRange[1]}
                                                    onChange={(e) =>
                                                        setPriceRange([
                                                            priceRange[0],
                                                            Math.max(Number(e.target.value), priceRange[0] + 1),
                                                        ])
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg shadow">
                                    <h3 className="text-sm md:text-md font-semibold mb-3">Tenants Preferred</h3>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {tenantOptions.map(({ value, label, icon }) => (
                                            <button
                                                key={value}
                                                className={`flex text-sm md:text-md justify-center items-center gap-2 px-6 py-2 border border-blue-800 rounded-lg transition font-medium ${selectedTenant.includes(value) ? "bg-blue-800 text-white" : "text-blue-800 bg-transparent"
                                                    }`}
                                                onClick={() => handleTenantSelection(value)}
                                            >
                                                {icon} {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg shadow">
                                    <h3 className="text-sm md:text-md font-semibold mb-3">Parking Availability</h3>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {parkingOptions.map(({ value, label, icon }) => (
                                            <button
                                                key={value}
                                                className={`flex text-sm md:text-md justify-center items-center gap-2 px-6 py-2 border border-blue-800 rounded-lg transition font-medium ${parkingValues.includes(value) ? "bg-blue-800 text-white" : "text-blue-800 bg-transparent"
                                                    }`}
                                                onClick={() => handleParkingSelection(value)}
                                            >
                                                {icon} {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg shadow">
                                    <h3 className="text-sm md:text-md font-semibold mb-3">Food</h3>
                                    <div className="flex gap-6">
                                        <label className="flex text-sm md:text-md items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={0}
                                                checked={selectedFood.includes(0)}
                                                onChange={() => handleFoodSelection(0)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            Yes
                                        </label>
                                        <label className="flex text-sm md:text-md items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={1}
                                                checked={selectedFood.includes(1)}
                                                onChange={() => handleFoodSelection(1)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            No
                                        </label>
                                        <label className="flex text-sm md:text-md items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={2}
                                                checked={selectedFood.includes(2)}
                                                onChange={() => handleFoodSelection(2)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            Outside Food
                                        </label>
                                    </div>
                                </div>

                                <div className="p-4 border rounded-lg shadow">
                                    <h3 className="text-sm md:text-md font-semibold mb-3">Facilities & Services</h3>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {facilities.map(({ id, name, icon }) => (
                                            <button
                                                key={id}
                                                className={`flex text-sm md:text-md justify-center items-center gap-2 px-4 py-2 border border-blue-800 rounded-lg transition font-medium ${selectedFacilities.includes(id) ? "bg-blue-800 text-white" : "text-blue-800 bg-transparent"
                                                    }`}
                                                onClick={() => toggleFacility(id)}
                                            >
                                                {icon} {name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex flex-row justify-center gap-4 py-4 bg-white sticky bottom-0">
                        <button className="text-sm md:text-md w-32 md:w-40 px-4 py-2 border border-blue-800 text-blue-800 rounded-full font-medium" onClick={onClose}>
                            Clear Filters
                        </button>
                        <button
                            className="text-sm md:text-md w-32 md:w-40 px-4 py-2 bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b text-white rounded-full font-medium hover:bg-blue-900"
                            onClick={() => onApply()}
                        >
                            Apply
                        </button>


                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

export default FiltersPopUp;
