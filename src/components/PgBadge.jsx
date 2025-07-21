import React from "react";
import { categoryMap } from "@utils/Constants";

const PgBadge = ({ category, wid }) => {
  const categoryLabel =
    categoryMap.find((item) => item.category === category)?.label || "Colive";
  return (
    <span
      className={`inline-block text-white text-xs text-center px-2 py-0.5 rounded-full font-medium ml-2
     ${category === 0
          ? "bg-[#1D3986]"
          : category === 1
            ? "bg-[#F19]"
            : `bg-[#38B2AC] ${wid === "20" ? "w-20" : "w-18"}`
        }
    `}
    >
      {categoryLabel}
    </span>
  );
};

export default PgBadge;
