import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import PgCard from "@components/PgCard";
import PhoneCard from "@components/PhoneCard";
import Loader from "@components/Loader";
import { useToast } from "@components/ToastProvider";
import allAPIs from "@utils/allAPIs";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [favoritePGs, setFavoritePGs] = useState([]);

  const fetchFavouritesFromLocalStorage = async () => {
    try {
      setLoading(true);
      const storedFavIds = JSON.parse(localStorage.getItem("userFavourites")) || [];

      // Get all PGs from API and filter
      const res = await allAPIs.getVerifiedProperties();
      const allPGs = res.data?.data || [];

      const filteredPGs = allPGs.filter((pg) => storedFavIds.includes(pg.id));
      setFavoritePGs(filteredPGs);
      setLoading(false);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong. Please try again";
      showToast(message, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFavouritesFromLocalStorage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <Loader />}
      <main className="container mx-auto px-2 md:px-16 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="favorites"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-blue-700 text-center">
              My Favourites
            </h2>

            {favoritePGs.length > 0 ? (
              <div className="flex flex-col items-center justify-center w-full gap-8 py-8">
                {favoritePGs.map((pg) => (
                  <div key={pg.id} className="w-full px-4">
                    <div className="hidden md:block">
                      <PgCard data={pg} />
                    </div>
                    <div className="md:hidden">
                      <PhoneCard data={pg} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiHeart className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">
                  No favourites yet
                </h3>
                <p className="text-gray-600">
                  Save your favourite PGs to see them here
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Favourites;
