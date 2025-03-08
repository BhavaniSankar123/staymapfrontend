import React from "react";
import "../index.css";
import Carousels from "../components/Carousels";
import Category from "../components/Category";
import SearchContainer from "../components/SearchContainer";
import SortBy from "../components/SortBy";
import Card from "../components/Card";
import Map from "../components/Map";
import PageNo from "../components/PageNo";
const Home = () => {
  return (
    <div>
      <div className="pl-8 pr-8 bg-[#f4f5f7]">
        <div className="flex items-center">
          <SearchContainer />
          <Category />
        </div>
        <Carousels />
        <SortBy />
        <div className="flex space-x-4 ml-5 mr-8 mt-10">
          <div className="flex flex-col gap-6 pr-2 w-[75%]">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div>
            <Map />
          </div>
        </div>
        <PageNo />
      </div>
    </div>
  );
};

export default Home;
