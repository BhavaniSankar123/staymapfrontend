import React, { useState, useContext, useEffect, createContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillWarning,
  AiOutlineClose
} from "react-icons/ai";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

const icons = {
  success: <AiFillCheckCircle className="text-green-500 text-4xl mb-2" />,
  error: <AiFillCloseCircle className="text-red-500 text-4xl mb-2" />,
  warning: <AiFillWarning className="text-yellow-500 text-4xl mb-2" />
};

function Toast({ message, type = "success", time, visible, onClose, permanent, showClose }) {
  useEffect(() => {
    if (visible && !permanent) {
      const timer = setTimeout(() => onClose(), time);
      return () => clearTimeout(timer);
    }
  }, [visible, permanent]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/20"
        >
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="relative px-6 py-5 w-4/6 md:w-2/6 rounded-2xl shadow-xl flex flex-col items-center text-center bg-white"
          >
            {icons[type]}
            <span className="text-base font-medium text-neutral-800">{message}</span>
            {permanent && (
              <span className="text-sm text-gray-500 mt-2">
                If urgent, contact support at{" "}
                <a
                  href="mailto:staymapdevelopers@gmail.com"
                  className=" text-blue-600 hover:underline"
                >
                  staymapdevelopers@gmail.com
                </a>
              </span>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-neutral-800 hover:text-gray-500"
              >
                <AiOutlineClose className="text-lg" />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    visible: false,
    permanent: false,
    showClose: true,
    time: 2000,
  });

  const showToast = (message, type = "success", time = 2000, options = {}) => {
    setToast({
      message,
      type,
      visible: true,
      permanent: options.permanent || false,
      showClose: options.showClose !== false, // true by default
      time
    });
  };

  const closeToast = () => setToast(prev => ({ ...prev, visible: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        time={toast.time}
        visible={toast.visible}
        onClose={closeToast}
        permanent={toast.permanent}
        showClose={toast.showClose}
      />
    </ToastContext.Provider>
  );
}

