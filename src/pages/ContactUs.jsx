import { motion } from 'framer-motion'
import { FaComment, FaPaperPlane, FaChevronDown } from 'react-icons/fa'
import { CONTACT_INFO, USER_SUPPORT_TYPES } from '@utils/Constants'
import { useState } from 'react'
import Loader from '@components/Loader'
import allAPIs from '@utils/allAPIs'
import { useToast } from '@components/ToastProvider'
import { isValidEmail, isValidMobile } from '@utils/validators'


const ContactUs = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
    type: ""
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const emailError = isValidEmail(formData.email);
    const mobileError = isValidMobile(formData.mobileNumber);
    if (emailError) {
      setError(emailError);
      return;
    }
    if (mobileError) {
      setError(mobileError);
      return;
    }
    if (!formData.message || !formData.type || !formData.name) {
      setError("Please fill all Required feilds");
      return;
    }

    try {
      setLoading(true)
      const res = await allAPIs.requestSupport(formData);
      if (res.data.status) {
        setError(null);
        setLoading(false)
        showToast("Submitted,  Our team will review your message and contact you soon.", "success");
      } else {
        setLoading(false)
        showToast("Something went wrong. Please try again", "error");
      }
      setLoading(false)
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      setLoading(false)
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-white/80">
      {loading && <Loader />}

      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/50 z-10"></div>
        <img
          src="/assets/Images/contactus2.webp"
          alt="ContactPage"
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-4"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-md text-blue-100 max-w-3xl mx-auto">
              Feel free to reach out — our team is ready to assist you with anything related to our services.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {CONTACT_INFO.map(({ id, icon, title, link, linkText }) => (
            <motion.div
              key={id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
              <a
                href={link}
                target={title === 'Our Website' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors text-md"
              >
                {linkText}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-h-[80vh] max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 hidden md:block">
              <img
                src="/assets/Images/contactus.webp"
                alt="Customer support"
                className="w-full h-full object-cover min-h-[500px]"
              />
            </div>

            <div className="p-6 md:w-3/5">
              <div className="flex items-center mb-10">
                <FaComment className="text-blue-600 text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Get In Touch
                </h2>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter Your Full Name"
                    className="w-full px-6 py-2 text-sm rounded-xl border border-gray-300 focus:ring-0 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter Your Email Address"
                    className="w-full px-6 py-2 text-sm rounded-xl border border-gray-300 focus:ring-0 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileNumber: e.target.value })
                    }
                    placeholder="Enter Your Phone Number"
                    className="w-full px-6 py-2 text-sm rounded-xl border border-gray-300 focus:ring-0 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div className="relative">
                  <div
                    className="w-full px-6 py-2 text-sm rounded-xl border border-gray-300 focus:border-blue-500 transition-all outline-none flex items-center justify-between cursor-pointer bg-white"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {formData.type !== "" ? USER_SUPPORT_TYPES[formData.type] : "Select a subject"}
                    <FaChevronDown
                      className={`text-gray-500 transition-transform ${showDropdown ? "transform rotate-180" : ""}`}
                    />
                  </div>
                  {showDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-xl text-sm">
                      {Object.entries(USER_SUPPORT_TYPES).map(([key, value]) => (
                        <div
                          key={key}
                          className="px-2 py-2 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, type: key });
                            setShowDropdown(false);
                          }}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-6 py-2 text-sm rounded-xl border border-gray-300 focus:ring-0 focus:border-blue-500 transition-all outline-none"
                  ></textarea>
                </div>
                <button
                  className="text-white text-sm flex items-center justify-center font-medium bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b w-full text-md px-2 py-2 rounded-lg tracking-wide text-center transition-all duration-300"
                  type="submit"
                >
                  <FaPaperPlane className="mr-3 text-sm" />
                  Send Your Message
                </button>
                <div className="h-6 text-center font-medium">
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
