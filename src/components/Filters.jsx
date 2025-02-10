import React, { useState } from "react";

const Filters = () => {
  const [Localities, setLocalities] = useState({
    Madhapur: false,
    Gachibowli: false,
    HiTechCity: false,
    Ameerpet: false,
    Secunderabad: false,
  });
  const [PriceRange, setPriceRange] = useState({
    MinPrice: 5000,
    MaxPrice: 15000,
  });
  const [gender, setGender] = useState({
    Male: false,
    Female: false,
    CoLive: false,
  });
  const [Occupancy, setOccupancy] = useState({
    SingleOccupancy: false,
    DoubleOccupancy: false,
    TripleOccupancy: false,
    QuadrapleOccupancy: false,
    QuintupleOccupancy: false,
  });
  const [Amenties, setAmenties] = useState({
    AttachedBathroom: false,
    AirConditioner: false,
    AttachedWashroom: false,
    StorgeShelf: false,
    SpaciousCupboard: false,
    Cooler: false,
  });
  const [Services, setServices] = useState({
    HotandDeliciousMeals: false,
    HighSpeedWIFI: false,
    PowerBackup: false,
    WorkoutZone: false,
    WashingMachine: false,
  });
  const [BHKType, setBHKType] = useState({
    OneBHK: false,
    TwoBHK: false,
    ThreeBHK: false,
    FourBHK: false,
  });
  const [RoomType, setRoomType] = useState({
    AC: false,
    NonAC: false,
  });
  const [ParkingAvailability, setParkingAvailability] = useState({
    TwoWheeler: false,
    ThreeWheeler: false,
    FourWheeler: false,
  });
  const [AccessibilityFilters, setAccessibilityFilters] = useState({
    Lift: false,
    WheelchairFriendly: false,
  });
  const [MoreFilters, setMoreFilters] = useState({
    SelfCooking: false,
  });
  return (
    <div className="text-[#909090]  gap-4 pl-4">
      <h1 className="text-black place-self-center text-4xl ">Filters</h1>
      <div>
        <h1 className="text-xl">Localities</h1>
        <div className="grid  grid-cols-3 mt-4 gap-4">
          <div>
            <input type="checkbox" name="locality" />
            <label>Madhapur</label>
          </div>
          <div>
            <input type="checkbox" name="locality" />
            <label>Gachibowli</label>
          </div>
          <div>
            <input type="checkbox" name="locality" />
            <label>Hi-Tech City</label>
          </div>
          <div>
            <input type="checkbox" name="locality" />
            <label>Ameerpet</label>
          </div>
          <div>
            <input type="checkbox" name="locality" />
            <label>Secunderabad</label>
          </div>
          <div>
            <button className="text-[#1D9BFF]">+ More...</button>
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
          <div>
            <input type="radio" id="male" name="gender" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="gender" />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input type="radio" id="co-live" name="gender" />
            <label htmlFor="co-live">Co-live</label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Occupancy</h1>
        <div className="grid  grid-cols-2 mt-4 gap-4">
          <div>
            <input type="checkbox" name="occupancy" id="single" />
            <label htmlFor="single">Single Occupancy</label>
          </div>
          <div>
            <input type="checkbox" name="occupancy" id="double" />
            <label htmlFor="double">Double Occupancy</label>
          </div>
          <div>
            <input type="checkbox" name="occupancy" id="triple" />
            <label htmlFor="single">Triple Occupancy</label>
          </div>
          <div>
            <input type="checkbox" name="occupancy" id="quadruple" />
            <label htmlFor="single">Quadraple Occupancy</label>
          </div>
          <div>
            <input type="checkbox" name="occupancy" id="quintuple" />
            <label htmlFor="single">Quintuple Occupancy</label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Amenties</h1>
        <div className="grid  grid-cols-2 mt-4 gap-4">
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Attached Bathroom
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Air Conditioner
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Attached Washroom
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Storge Shelf
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Spacious Cupboard
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Cooler
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Services</h1>
        <div className="grid  grid-cols-2 mt-4 gap-4">
          <button className="border border-[#909090] bg-white rounded-md w-44 p-1">
            Hot and Delicious Meals
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            High-Speed WIFI
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Power Backup
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Workout Zone
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Washing Machine
          </button>
          <button className="text-[#1D9BFF]">+ More...</button>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">BHK Type</h1>
        <div className="flex space-x-4">
          <div>
            <input type="checkbox" name="bhk" id="1bhk" />
            <label htmlFor="1bhk">1 BHK</label>
          </div>
          <div>
            <input type="checkbox" name="bhk" id="2bhk" />
            <label htmlFor="2bhk">2 BHK</label>
          </div>
          <div>
            <input type="checkbox" name="bhk" id="3bhk" />
            <label htmlFor="3bhk">3 BHK</label>
          </div>
          <div>
            <input type="checkbox" name="bhk" id="4bhk" />
            <label htmlFor="4bhk">4 BHK</label>
          </div>
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
          <div>
            <input type="checkbox" name="parking" id="2w"></input>
            <label htmlFor="2w">2 Wheeler</label>
          </div>
          <div>
            <input type="checkbox" name="parking" id="3w"></input>
            <label htmlFor="3w">3 Wheeler</label>
          </div>
          <div>
            <input type="checkbox" name="parking" id="4w"></input>
            <label htmlFor="4w">4 Wheeler</label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">Accessibility Filters</h1>
        <div className="flex space-x-4">
          <button className="border border-[#909090] bg-white rounded-md w-24 p-1">
            Lift
          </button>
          <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
            Wheelchair Friendly
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl">More Filters</h1>
        <button className="border border-[#909090] bg-white rounded-md w-36 p-1">
          Self Cooking
        </button>
      </div>
    </div>
  );
};

export default Filters;
