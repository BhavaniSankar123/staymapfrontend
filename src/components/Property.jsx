import React from "react";
import { useNavigate } from "react-router-dom";
import { properties } from "@utils/Constants";

const Property = () => {
  const navigate = useNavigate();
  const handleButtonClick = (id) => {
    if (id === 1) {
      if (window.location.pathname !== "/") {
        navigate("/", { state: { focusInput: true } });
      } else {
        const event = new Event("focusSearchInput");
        window.dispatchEvent(event);
      }
    }

    else if (id === 2) {
      navigate("/postproperty");
    } else if (id === 3) {
      window.location.href = "https://youtube.com/@staymap2024?si=nJS4ZTkZa_tjZDxm";
    }
  };

  return (
    <div className="bg-white/80 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-sm text-gray-600">
            Join thousands of happy users who found their ideal living space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`${property.color.background} rounded-xl p-8 text-center border border-gray-300 hover:shadow-lg transition-shadow`}
            >
              <div
                className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full border border-gray-300 ${property.color.text
                  } ${property.color.background.replace("50", "100")}  mb-6`}
              >
                <p className="text-xl">{property.icon}</p>
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-2">
                {property.title}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {property.description}
              </p>
              <button
                onClick={() => handleButtonClick(property.id)}
                className={`text-sm w-full text-white ${property.color.background.replace(
                  "-50",
                  "-600"
                )} hover:bg-opacity-80 py-3 px-4 rounded-lg font-medium transition-colors`}
              >
                {property.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Property;
