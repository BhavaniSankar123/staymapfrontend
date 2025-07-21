import React from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_DASHBOARD_CARDS } from "@utils/Constants";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-md font-extrabold text-gray-900 sm:text-2xl mb-4">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Manage your properties and listings with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADMIN_DASHBOARD_CARDS.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 ${card.borderColor} ${card.color} transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
            >
              <div className={`p-4 rounded-full ${card.color} mb-4`}>
                {card.icon}
              </div>
              <h3 className={`text-xl md:text-lg font-bold ${card.textColor} mb-2`}>
                {card.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Click to {card.title.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;