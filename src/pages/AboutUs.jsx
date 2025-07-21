import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import WhyChooseUsSection from '@components/WhyChooseUsSection'
import { howItWorks } from '@utils/Constants'
import Loader from '@components/Loader'
import allAPIs from '@utils/allAPIs'
import { Link } from "react-router-dom";
import { useToast } from '@components/ToastProvider'
const AboutUs = () => {
  const [loading, setLoading] = useState(false);
  const [aboutUsData, setAboutUsData] = useState({
    citiesCount: 0,
    usersCount: 0,
    verifiedPgs: 0,
  });
  const { showToast } = useToast();

  const fetchClientData = async () => {
    try {
      setLoading(true);
      const res = await allAPIs.getAboutUsData();
      if (res.data.status) {
        setAboutUsData({
          citiesCount: res.data.data.totalCities,
          usersCount: res.data.data.totalUsers,
          verifiedPgs: res.data.data.totalVerifiedProperties,
        });
      }
      setLoading(false);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      showToast(message, "error");
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return (
    <div className="bg-gray-50">
      {loading && <Loader />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-72 bg-gray-900/50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img
          src="/assets/Images/about-us2.webp"
          alt="Modern apartment building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Accommodation
            </h1>
            <p className="text-md text-white mb-8">
              Safe, comfortable and affordable living spaces
            </p>
          </div>
        </div>
      </motion.div>

      <main className="container mx-auto px-8 py-12">
        <section id="about" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Welcome to Staymap
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-700">
              At <span className="font-bold text-blue-700">Staymap</span>, we
              believe that finding the perfect accommodation
              shouldn't be a hassle. We're here to make your search experience
              easy, transparent and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="/assets/Images/about-us.webp"
                alt="Happy roommates"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                Our Story
              </h3>
              <p className="text-gray-700 mb-4">
                The idea for{" "}
                <span className="font-bold text-blue-700">Staymap</span> was
                born out of a real and challenging experience. In the year 2024,
                our founders moved to Hyderabad from their home town,
                eager to start a new chapter in their careers.
              </p>
              <p className="text-gray-700 mb-4">
                They encountered high prices, subpar facilities and unhygienic conditions.
                Online searches offered little help, with outdated listings and unclear information.
              </p>
              <p className="text-gray-700">
                Determined to create a better solution, they founded Staymap
                with a clear vision: To build a platform where finding the right
                accommodation is simple and transparent.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 shadow-sm mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              Our Mission
            </h3>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              To connect you with high-quality accommodations through a
              platform built on trust, transparency and convenience. We believe
              that everyone deserves a safe and comfortable living environment.
            </p>
          </div>
        </section>

        <section id="feature" className="mb-16">
          <WhyChooseUsSection pos="center" />
        </section>

        <section id="how-it-works" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 rounded-xl shadow-lg mb-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-2"> {aboutUsData.citiesCount}+</div>
                <div className="text-lg">Cities</div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-2">{aboutUsData.usersCount}+</div>
                <div className="text-lg">Happy Users</div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-2">{aboutUsData.verifiedPgs}</div>
                <div className="text-lg">Verified Properties</div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-lg">Support</div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Get Started Today
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied tenants and property owners who trust
            Staymap for their accommodation needs.
          </p>
          <Link to={"/"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-sm"
            >
              Find Your PG Now
            </motion.button>
          </Link>
        </section>
      </main>

    </div>
  );
};

export default AboutUs;
