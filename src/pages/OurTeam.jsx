import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  executives,
  leadershipTeam,
  container,
  item,
  hoverCard,
} from "@utils/Constants";
const OurTeam = () => {
  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-xl md:text-3xl font-extrabold text-blue-900 mb-3">
            The Bright Minds Behind Our Vision
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-3"></div>
          <p className="text-md text-blue-800 max-w-4xl mx-auto leading-relaxed">
            A team of passionate recent graduates bringing fresh perspectives
            and cutting-edge knowledge to solve modern challenges.
          </p>
        </motion.div>

        <motion.div
          className="mb-28"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <div className="flex flex-col lg:flex-row gap-12 justify-center">
            {executives.map((exec, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={hoverCard}
                className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl transition-all duration-300"
              >
                <div className="md:flex h-full">
                  <div className="md:w-2/5 relative h-80 md:h-auto">
                    <img
                      className="w-full h-full object-cover"
                      src={exec.image}
                      alt={exec.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {exec.department}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:w-3/5 flex flex-col">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exec.name}
                      </h3>
                      <p className="text-blue-700 text-md font-medium mb-4">
                        {exec.title}
                      </p>
                      <p className="text-gray-600 mb-8 text-sm">{exec.bio}</p>
                    </div>
                    <div className="mt-auto flex space-x-4">
                      {Object.entries(exec.social).map(([platform, url]) => (
                        <motion.a
                          key={platform}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          href={platform === "email" ? `mailto:${url}` : url}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label={platform}
                        >
                          {platform === "linkedin" && (
                            <FaLinkedin className="h-5 w-5" />
                          )}
                          {platform === "email" && (
                            <FaEnvelope className="h-5 w-5" />
                          )}
                          {platform === "github" && (
                            <FaGithub className="h-5 w-5" />
                          )}
                          {platform === "twitter" && (
                            <FaTwitter className="h-5 w-5" />
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.h3
            variants={item}
            className="text-xl md:text-2xl font-bold text-center text-blue-900 mb-16"
          >
            Our Leadership Circle
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={hoverCard}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
              >
                <div className="relative h-80 w-full">
                  <img
                    className="w-full h-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {member.department}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-700 text-md font-medium mb-4">
                    {member.title}
                  </p>
                  <p className="text-gray-600 mb-6 text-sm">{member.bio}</p>
                  <div className="flex space-x-5">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <motion.a
                        key={platform}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={platform === "email" ? `mailto:${url}` : url}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label={platform}
                      >
                        {platform === "linkedin" && (
                          <FaLinkedin className="h-5 w-5" />
                        )}
                        {platform === "email" && (
                          <FaEnvelope className="h-5 w-5" />
                        )}
                        {platform === "github" && (
                          <FaGithub className="h-5 w-5" />
                        )}
                        {platform === "twitter" && (
                          <FaTwitter className="h-5 w-5" />
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-28 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-5"
          >
            <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-3">
              Ready to Build the Future With Us?
            </h3>
            <div className="w-1/2 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          <p className="text-blue-800 mb-5 max-w-3xl mx-auto text-md leading-relaxed">
            If you're passionate about building great products and learning fast, Staymap is the place to start your journey.
          </p>
          <Link
            to={"/careers"}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1E40AF",
              boxShadow: "0 10px 25px -5px rgba(30, 64, 175, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="mb-16 inline-flex items-center px-5 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            Explore Career Opportunities
            <FiArrowRight className="ml-4 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OurTeam;
