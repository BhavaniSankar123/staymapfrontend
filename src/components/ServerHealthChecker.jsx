import { useEffect } from "react";
import { useToast } from "./ToastProvider";
import allAPIs from "@utils/allAPIs";

const ServerHealthChecker = () => {
  const { showToast } = useToast();

  useEffect(() => {
    const checkServer = async () => {
      try {
        const data = await allAPIs.healthCheck();
        if (!data.status) {
          showToast("Technical error occurred. Please try again later.", "error", {
            permanent: true,
            showClose: false
          });
        }
      } catch (error) {
        showToast("Technical error occurred. Please try again later.", "error", {
          permanent: true,
          showClose: false
        });
      }
    };

    checkServer();
  }, []);

  return null;
};

export default ServerHealthChecker;