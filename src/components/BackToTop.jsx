import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const location = useLocation();
  const showMvButtons = location.pathname.startsWith("/property/");
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / windowHeight) * 100;

    setScrollPercent(scrolled);
    setVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const circleStyle = {
    background: `conic-gradient(#1D4ED8 ${scrollPercent}%, #e5e7eb ${scrollPercent}%)`,
  };

  return (
    <>
      {
        !showMvButtons && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={scrollToTop}
              style={circleStyle}
              className={`w-12 h-12 rounded-full p-0.5 transition-opacity duration-300  bg-white text-blue-700 shadow-md flex items-center justify-center ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <ArrowUp size={22} className="text-2xl" />
              </div>
            </button>
          </div>
        )
      }
    </>
  );
};

export default BackToTop;
