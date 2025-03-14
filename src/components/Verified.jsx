import React from "react";

const Verified = ({ isverified }) => {
  return (
    <div>
      <span className="-top-3 -left-5 bg-[#1D9BFF] w-24 h-24 text-white verified p-1  pl-4 text-sm">
        {isverified}
      </span>
    </div>
  );
};

export default Verified;
