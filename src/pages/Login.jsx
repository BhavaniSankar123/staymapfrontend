import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import FeatureShowcase from '@components/FeaturesShow'
import Loader from '@components/Loader'
import { useToast } from '@components/ToastProvider'
import { useAuth } from '@utils/AuthContext'
import { loginSignUpFeatures, ACTION_LOGS_TYPES } from '@utils/Constants'
import allAPIs from '@utils/allAPIs'
import { isValidEmailOrMobile, isValidPassword } from '@utils/validators'

const LogIn = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const addToLogs = async () => {
    const payload = {
      type: ACTION_LOGS_TYPES.LOGGED_IN,
      role: 0,
      email: formData.emailOrMobile,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailOrMobileError = isValidEmailOrMobile(formData.emailOrMobile);
    const passwordError = isValidPassword(formData.password);
    if (emailOrMobileError) {
      setError(emailOrMobileError);
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }
    try {
      setLoading(true)
      const res = await allAPIs.login(formData);
      if (res.data.status) {
        const { accessToken, refreshToken, user } = res.data.data;
        login({ accessToken, refreshToken, user });
        setError(null);
        setLoading(false)
        showToast("LogIn Successfull", "success");
        addToLogs();
        navigate("/");
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
      setLoading(false)
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      showToast(message, "error");
      setLoading(false)
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {loading && <Loader />}
      <FeatureShowcase features={loginSignUpFeatures} />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
        <div className="flex md:hidden">
          <Link
            to={"/"}
            className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white  px-2 py-2 "
          >
            <BiArrowBack size={18} />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold text-blue-700 mb-10">Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 text-sm">
          <div>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter Email / Mobile Number"
              value={formData.emailOrMobile}
              onChange={(e) =>
                setFormData({ ...formData, emailOrMobile: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <a
              href="/forgotpassword"
              className="text-sm text-blue-500 font-medium"
            >
              Forgot Password?
            </a>
          </div>
          <button
            className="text-white font-medium bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b w-full text-md px-2 py-2 rounded-lg tracking-wide text-center transition-all duration-300"
            type="submit"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 font-medium">
              Sign Up
            </a>
          </p>
          <div className="h-6 text-center font-medium">
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
