import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import FeatureShowcase from "@components/FeaturesShow";
import { loginSignUpFeatures, ACTION_LOGS_TYPES } from "@utils/Constants";
import { BiArrowBack, BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword, isValidMobile } from "@utils/validators";
import allAPIs from "@utils/allAPIs";
import { useToast } from "@components/ToastProvider";
import { useAuth } from "@utils/AuthContext";
import Loader from '@components/Loader';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { showToast } = useToast();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const addToLogs = async () => {
    const payload = {
      type: ACTION_LOGS_TYPES.CREATED_ACCOUNT,
      role: 0,
      email: formData.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      for (const key in formData) {
        if (!formData[key].trim()) {
          setError("Please fill all required fields.");
          return;
        }
      }
      const validators = {
        email: isValidEmail,
        mobileNumber: isValidMobile,
        password: isValidPassword,
      };
      for (const field in validators) {
        const errorMsg = validators[field](formData[field]);
        if (errorMsg) {
          setError(errorMsg);
          return;
        }
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!acceptTerms) {
        setError("You must accept the Terms and Conditions.");
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
      };
      try {
        setLoading(true);
        const res = await allAPIs.checkUserExistence(payload);
        setStep(2);
        setTimer(300);
        setResendDisabled(true);
        setLoading(false);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again.";
        showToast(message, "error");
        setLoading(false);
      }
    }

    if (step === 2) {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
        otp: otp,
      };
      try {
        setLoading(true);
        const res = await allAPIs.createUser(payload);
        if (res.data.status) {
          const { accessToken, refreshToken, user } = res.data.data;
          login({ accessToken, refreshToken, user });
          localStorage.setItem("isUserCreatedFirstTime", accessToken + refreshToken);
        }
        setError(null);
        setLoading(false);
        addToLogs();
        navigate("/");
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again.";
        showToast(message, "error");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResetOTP = () => {
    setTimer(300);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {loading && <Loader />}
      <FeatureShowcase features={loginSignUpFeatures} />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10 relative">
        <div className="flex md:hidden">
          <Link
            to={"/"}
            className="absolute top-4 left-4 flex bg-blue-600 rounded-full items-center gap-2 text-white  px-2 py-2 "
          >
            <BiArrowBack size={18} />
          </Link>
        </div>
        {step > 1 && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-2 py-2 rounded-full shadow-md transition-all duration-300"
          >
            <BiArrowBack size={18} className="text-blue-700" />
          </button>
        )}

        <h2 className="text-2xl font-semibold text-blue-700 mb-10">
          {step === 1 ? "SignUp" : "Verify OTP"}
        </h2>

        <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-6">
          {step === 1 && (
            <div className="flex flex-col items-center space-y-3 text-sm">
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                placeholder="Enter Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                  placeholder="Enter New Password"
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
                  {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                </button>
              </div>

              <div className="relative w-full">
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 "
                />
                <label htmlFor="terms" className="text-gray-700 text-sm">
                  I agree to <span className="font-medium">Staymap</span>{" "}
                  <a href="/terms" className="text-blue-600 underline">
                    T&C, Privacy Policy
                  </a>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-4">
                OTP sent to {formData.email}
              </p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-4"></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="text-md text-center border-b-2 border-neutral-600 bg-transparent outline-none"
                    style={{ width: "2rem", height: "2rem" }}
                  />
                )}
              />
              <div className="flex text-center justify-center space-x-7 mt-5">
                <p className="text-sm text-gray-500 mt-2">
                  Resend OTP in {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, "0")} min
                </p>
                <button
                  type="button"
                  className={`mt-2 text-blue-500 font-medium text-sm ${resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={resendDisabled}
                  onClick={handleResetOTP}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          <button
            className="text-white font-medium bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b w-full text-sm px-2 py-2 rounded-lg tracking-wide text-center transition-all duration-300"
            type="submit"
          >
            {step === 1 ? "Continue" : "SignUp"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Already Registered, Back To{" "}
            <a href="/login" className="text-blue-500 font-medium">
              LogIn
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

export default SignUp;
