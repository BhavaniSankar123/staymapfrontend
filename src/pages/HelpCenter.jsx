import { useState } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaComments,
  FaChevronDown,
  FaChevronUp,
  FaPhone,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { faqCategories, allFaqs } from "@utils/Constants";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedFaqs, setExpandedFaqs] = useState([]);

  const toggleFaq = (id) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter((item) => item !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };

  const filteredFaqs = allFaqs[activeCategory].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How can we help you today?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search our help center..."
              className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg bg-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {faqCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center py-6 px-4 rounded-xl shadow-md transition-colors ${activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-blue-50"
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {faqCategories.find((c) => c.id === activeCategory).name}
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-6">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    {expandedFaqs.includes(faq.id) ? (
                      <FaChevronUp className="text-blue-600" />
                    ) : (
                      <FaChevronDown className="text-blue-600" />
                    )}
                  </button>
                  {expandedFaqs.includes(faq.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">
                  No results found for your search. Try different keywords.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Call Support
            </h3>
            <p className="text-gray-600 mb-4">
              Speak directly with our support team
            </p>
            <a
              href="tel:6281333937"
              className="text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              +91 62813 333937
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Get a response within 24 hours</p>
            <a
              href="mailto:support@staymap.in"
              className="text-blue-600 hover:text-blue-800 font-medium text-lg"
            >
              support@staymap.in
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaComments className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">
              Instant messaging with our team
            </p>
            <a href="https://wa.me/916281333937"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg">
              Start Chat
            </a>
          </motion.div>
        </div>

        {/* <div className="mt-16 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.a
              whileHover={{ y: -5 }}
              href="#"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Getting Started Guide
              </h3>
              <p className="text-gray-600">
                Learn how to make the most of our platform
              </p>
            </motion.a>
            <motion.a
              whileHover={{ y: -5 }}
              href="#"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Video Tutorials
              </h3>
              <p className="text-gray-600">Watch step-by-step video guides</p>
            </motion.a>
            <motion.a
              whileHover={{ y: -5 }}
              href="#"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Community Forum
              </h3>
              <p className="text-gray-600">Connect with other users</p>
            </motion.a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HelpCenter;
