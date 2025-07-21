import React, { useEffect, useState } from 'react'
import allAPIs from '@utils/allAPIs'
import Loader from '@components/Loader'
import PgCard from '@components/PgCard'
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useToast } from '@components/ToastProvider'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SavedProperties = () => {
    const [savedProperties, setSavedProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await allAPIs.getSavedProperties();

            if (response.data.status) {
                setSavedProperties(response.data.data || []);
            } else {
                setSavedProperties([]);
                showToast("Something went wrong", "Error");
            }
        } catch (err) {
            console.error(err);
            setSavedProperties([]);
            showToast("Failed to fetch properties", "Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchProperties(); // Re-fetch the data if refresh flag is set
        }
    }, [location.state]);

    const handleEditClick = (pg) => {
        navigate(`/admin/editproperty/${pg.id}`, { state: { savedData: pg } });
    };

    return (
        <div>
            {loading && <Loader />}
            <div className="flex">
                <Link
                    to="/admin/dashboard"
                    className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white px-2 py-2"
                >
                    <BiArrowBack size={18} />
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-4 py-8 md:px-8 md:mt-8">
                <h1 className="text-3xl font-bold text-center mt-10">Saved Properties</h1>

                {loading ? (
                    <Loader />
                ) : savedProperties.length > 0 ? (
                    savedProperties.map((pg, index) => (
                        <div
                            className="w-full cursor-pointer"
                            key={index}
                            onClick={() => handleEditClick(pg)}
                        >
                            <PgCard data={pg} id={index} />
                        </div>
                    ))
                ) : (
                    <p>No properties found</p>
                )}
            </div>
        </div>
    );
};

export default SavedProperties;