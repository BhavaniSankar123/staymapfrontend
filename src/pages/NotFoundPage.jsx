import React from "react";
import NotFoundImage from "/assets/Images/404.svg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen -mt-10">
      <img src={NotFoundImage} alt="404 Not Found" className="w-80 md:w-96 lg:w-1/3 h-80 object-contain" />
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Sorry,</h1>
      <p className="text-md text-gray-600 mt-2">
        We're working on it <br /> and we'll get it fixed as soon as possible.
      </p>
    </div>

  );
};

export default NotFoundPage;
