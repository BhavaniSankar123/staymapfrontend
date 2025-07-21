import React, { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input'
import FeatureShowcase from '@components/FeaturesShow'
import { loginSignUpFeatures, ACTION_LOGS_TYPES } from '@utils/Constants'
import { BiArrowBack, BiHide, BiShow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Loader from '@components/Loader'
import allAPIs from '@utils/allAPIs'
import { useToast } from '@components/ToastProvider'
import { isValidEmail, isValidPassword } from '@utils/validators'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const addToLogs = async () => {
    const payload = {
      type: ACTION_LOGS_TYPES.RESET_PASSWORD,
      role: 0,
      email: formData.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };
    
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      const validEmail = isValidEmail(formData.email);
      if (validEmail) {
        setError(validEmail);
        return;
      }
      try {
        setLoading(true)
        const res = await allAPIs.sendOTPForPasswordReset({ email: formData.email });
        setLoading(false)
      } catch (err) {
        const message =
          err?.response?.data?.message || "Something went wrong. Please try again.ll";
        showToast(message, "error");
        setLoading(false)
      }
      setStep(2);
      setTimer(120);
      setResendDisabled(true);
    }

    if (step === 2) {
      try {
        setLoading(true)
        const res = await allAPIs.verifyOTPForPasswordReset({ email: formData.email, otp: otp });
        setLoading(false)
      } catch (err) {
        const message =
          err?.response?.data?.message || "Something went wrong. Please try again.ll";
        showToast(message, "error");
        setLoading(false)
      }
      setStep(3);
      setError(null);
    }

    if (step === 3) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const validPassword = isValidPassword(formData.newPassword);
      if (validPassword) {
        setError(validPassword);
        return;
      }
      try {
        setLoading(true)
        const res = await allAPIs.resetPassword({ email: formData.email, otp: otp, newPassword: formData.newPassword });
        setLoading(false);
        addToLogs()
        navigate("/login");
      } catch (err) {
        const message =
          err?.response?.data?.message || "Something went wrong. Please try again.ll";
        showToast(message, "error");
        setLoading(false)
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
    setTimer(120);
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
        {step > 1 && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-2 py-2 rounded-full shadow-md transition-all duration-300"
          >
            <BiArrowBack size={18} className="text-blue-700" />
          </button>
        )}

        <h2 className="text-2xl font-semibold text-blue-700 mb-10">
          {step === 1
            ? "Forgot Password"
            : step === 2
              ? "Verify OTP"
              : "Reset Password"}
        </h2>

        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-sm space-y-6 text-sm"
        >
          {step === 1 && (
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
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
                  className={`mt-2 text-blue-500 font-medium text-md ${resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={resendDisabled}
                  onClick={handleResetOTP}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
                  placeholder="Enter New Password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide size={20} /> : <BiShow size={18} />}
                </button>
              </div>

              <div className="relative mt-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
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
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (<BiHide size={20} />) : (<BiShow size={20} />)}
                </button>
              </div>
            </>
          )}

          <button
            className="text-white font-medium bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b w-full text-md px-2 py-2 rounded-lg tracking-wide text-center transition-all duration-300"
            type="submit"
          >
            {step === 1
              ? "Send OTP"
              : step === 2
                ? "Verify OTP"
                : "Reset Password"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Don't want to reset Password? Back To{" "}
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

export default ForgotPassword;
