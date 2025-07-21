import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const PostPropertyBtn = () => {
  const iconSize = 24;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p
        href="#"
        className="py-3 px-4 mx-3 border border-blue-800 text-blue-800 rounded-full 
                              min-h-[40px] max-h-[40px] min-w-[200px] max-w-[200px] hidden md:flex 
                              relative overflow-hidden items-center text-sm"
      >
        Post Property
        {stage === 0 && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 10, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="ml-2 text-neutral-100 bg-blue-700 rounded-full px-3 py-1"
            style={{ fontSize: "10px", fontWeight: "bold" }}
          >
            Free
          </motion.span>
        )}
        {stage === 1 && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 20, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="ml-2 text-blue-700"
          >
            <Home size={iconSize} />
          </motion.span>
        )}
      </p>

      <p
        href="#"
        className="py-3 px-4 mx-3 border border-blue-800 text-blue-800 rounded-full 
                              min-h-[30px] max-h-[30px] min-w-[120px] max-w-[120px] flex md:hidden
                              relative overflow-hidden items-center"
      >
        {stage === 0 && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 18, opacity: 1 }}
            exit={{ x: 35, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=" text-neutral-100 bg-blue-700 rounded-full px-3 py-1"
            style={{ fontSize: "10px", fontWeight: "bold" }}
          >
            Free
          </motion.span>
        )}
        {stage === 1 && (
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 14, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-full text-xs font-semibold"
          >
            Post Property
          </motion.span>
        )}
      </p>
    </>
  );
};

export default PostPropertyBtn;
