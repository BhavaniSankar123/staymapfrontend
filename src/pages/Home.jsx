import React from "react";
import "../index.css";
import Header from "../components/Header";
import Carousels from "../components/Carousels";
import Category from "../components/Category";
import SearchContainer from "../components/SearchContainer";
import SortBy from "../components/SortBy";
import Card from "../components/Card";
import Map from "../components/Map";
import PageNo from "../components/PageNo";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="pl-8 pr-8 bg-gray-200/80">
        <div className="flex items-center">
          <SearchContainer />
          <Category />
        </div>
        <Carousels />
        <SortBy />
        <div className="flex space-x-4 ml-5 mr-8 mt-10">
          <div className="flex flex-col gap-6 pr-2">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className=" w-96">
            <Map />
          </div>
        </div>
        <PageNo />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
