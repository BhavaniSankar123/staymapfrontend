import { motion } from "framer-motion";
import { whyChooseUs } from "@utils/Constants";

const WhyChooseUsSection = ({ pos = "start" }) => {
  return (
    <div className="container mx-auto  py-12">
      <h2 className="text-2xl text-blue-800 font-bold text-center mb-12">
        Why Choose Us?
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center md:items-${pos}`}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-700">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;