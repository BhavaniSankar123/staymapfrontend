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
      <div className="flex justify-center items-center text-[#004080] fixed bottom-[5%] bg-white size-16 rounded-full right-2 ">
        {/* <FaMapMarkerAlt className="text-[#004080] text-5xl" /> */}
        <img
          src="https://s3-alpha-sig.figma.com/img/25ac/3374/4f7fb7989e767db6b0c43ff63dbd542d?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=e99~INFN0j1RhJIvhfbPxwywpjpTiqVgZ9IPgYVPeAROfZ5jTaXZofcUZBI4KpH5uXv9ALYgJYT-JbB5jAR-Si~SPtQfdl7axjif51cV0Vj6xAFWKmGZW7O6GODLS4y20hVYFhi6zFZTWnh-Neevp-jsQ6f-oyTSIgqtUKDK1NCGBD5F82Tx1oss1QIIgvJIEI9xTQpn-UVt~MeMZNrBj8r983dsZByoE~3inWbUZj8NwW4nDItK~~OCobIW9TpwwUv81vSHfOXGx0XXEhXIac4NuKOSVtd4WHAXaMB0veM2zfpt3Vkv2ElrF1JWTWXVeBiYqdAYwLuz~6Vj6D3nVA__"
          alt="StayBot"
        />
      </div>
    </div>
  );
};

export default Footer;
