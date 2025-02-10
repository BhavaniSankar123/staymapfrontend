import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#005CA8] text-white p-6 h-72 mt-4">
      <div className="mx-auto pt-10 flex flex-col gap-8 justify-center items-center">
        <div className="flex space-x-8 w-300 justify-between">
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Careers</p>
          <p>Subscribe</p>
          <p>Help Center</p>
          <p>Site Map</p>
        </div>
        <div className="flex space-x-10 text-sm">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black  text-2xl hover:text-blue-500"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-green-600"
          >
            <IoLogoWhatsapp size={24} />
          </a>
          <a
            href="mailto:info@staymap.com"
            className="text-black hover:text-white"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
        <div className="mt-4 text-center text-white">
          <p>&copy;2025 | All Rights Reserved by Staymap Pvt Ltd.</p>
        </div>
      </div>
      <div className="flex justify-center items-center text-[#004080] fixed bottom-[10%] bg-white size-20 rounded-full right-16 ">
        {/* <FaMapMarkerAlt className="text-[#004080] text-5xl" /> */}
        <img src="https://tinyurl.com/5538h3kf" alt="StayBot" />
      </div>
    </div>
  );
};

export default Footer;
