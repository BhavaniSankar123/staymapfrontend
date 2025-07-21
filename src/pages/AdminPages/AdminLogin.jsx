import React, { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Loader from '@components/Loader'
import allAPIs from '@utils/allAPIs'
import { isValidEmailOrMobile, isValidPassword } from '@utils/validators'
import { useToast } from '@components/ToastProvider'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@utils/AuthContext'
import { use } from 'react'


const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmailOrMobile = isValidEmailOrMobile(formData.emailOrMobile);
    const validPassword = isValidPassword(formData.password);
    if (validEmailOrMobile) {
      setError(validEmailOrMobile);
      return;
    }
    if (validPassword) {
      setError(validPassword);
      return;
    }
    try {
      setLoading(true)
      const res = await allAPIs.adminLogin(formData);
      if (res.data.status) {
        const { accessToken, refreshToken, user } = res.data.data;
        login({ accessToken, refreshToken, user });
        setError(null);
        setLoading(false)
        showToast("LogIn Successfull", "success");
        navigate("/admin/dashboard");
      } else {
        showToast("Something went wrong. Please try again", "error");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again";
      showToast(message, "error");
      setLoading(false)
    }
  };
  return (
    <div className="flex h-screen justify-center items-center">
      {loading && <Loader />}
      <div className="w-4/5 md:w-2/5 flex flex-col justify-center items-center p-6 rounded-lg shadow-md shadow-gray-500">
        <h2 className="text-2xl font-semibold text-blue-700 mb-10">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 text-sm">
          <div>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Username"
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
              placeholder="Password"
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
          <button
            className="text-white font-medium bg-gradient-to-t from-blue-700 to-blue-500 hover:bg-gradient-to-b w-full text-md px-2 py-2 rounded-lg tracking-wide text-center transition-all duration-300"
            type="submit"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-500">
            <span className="text-red-500 font-semibold"> Note:</span> Only Authenticated Users should be login
          </p>
          <div className="h-6 text-center font-medium">
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
