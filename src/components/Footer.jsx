import logo from "/assets/logo2.png";
import { useLocation } from "react-router-dom";
import {
  contactInfo,
  footerLinks,
  popularLocalities,
  quickLinks,
  socialLinks,
} from '@utils/Constants';

const Footer = () => {
  const location = useLocation();
  const showMvButtons = location.pathname.startsWith("/property/");

  return (
    <>
      <div
        className={`bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white ${showMvButtons ? "mb-[3.6rem]" : ""
          } md:mb-0`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 md:h-10 md:w-10"
                  src={logo}
                  alt="Logo"
                />
                <h2 className="text-2xl font-bold">Staymap</h2>
              </div>
              <p className="text-blue-100 opacity-90 text-sm">
                India's most trusted Accommodation platform
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="bg-white/10 hover:bg-white/20 p-2  rounded-full transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block space-y-4 sm:space-y-6">
              <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      target={item.label === "Virtual Tours" ? "_blank" : "_self"}
                      className="hover:text-blue-300 transition-colors flex items-center text-sm"
                    >
                      <span className="mr-2">→</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                Stay Updated
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact) => (
                  <a className="flex items-center" key={contact.label} href={contact.label === "Support Line" ? "tel:6281333937" : contact.label === "Email" ? "mailto:support@staymap.in" : " https://maps.app.goo.gl/qv5SSeVo1hx39BVy8 "} >
                    <div className="bg-white/10 p-2 rounded-full mr-3">
                      {contact.icon}
                    </div>
                    <div>
                      <p
                        className="text-sm text-blue-200" >
                        {contact.label}
                      </p>
                      <p className="font-medium text-sm">{contact.text}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-6">
              <h3 className="text-lg font-semibold border-b border-white/20 pb-2">
                Popular Localities
              </h3>
              <ul className="grid grid-cols-2 gap-2 sm:gap-3">
                {popularLocalities.map((locality) => (
                  <a
                    key={locality}
                    href={`/?city=${encodeURIComponent(locality)}`}
                    className="bg-white/5 cursor-pointer hover:bg-white/10 px-2 py-2 rounded-md text-xs transition-colors text-center"
                  >
                    {locality}
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* 
        <div className="flex items-center justify-center pb-3">
          <div className="bg-white/10 md:w-2/5 p-4 rounded-xl mt-3 text-center">
            <h4 className="font-medium text-sm mb-2">Get exclusive offers</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-2 py-1 sm:px-3 sm:py-2 rounded-l-lg bg-white/5 border border-white/20 focus:outline-none text-xs sm:text-sm"
              />
              <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 sm:px-4 sm:py-2 rounded-r-lg text-xs sm:text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div> */}

        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-0 text-center sm:text-left">
                {footerLinks.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    className="text-sm hover:text-blue-300 transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
              <p className="text-sm text-blue-200 text-center sm:text-right">
                <span className="text-[0.9rem]">©</span>2025 Staymap. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
