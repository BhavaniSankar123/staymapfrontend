import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import allAPIs from "./allAPIs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStoredAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));
    return { accessToken, refreshToken, user };
  };

  const storeAuth = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userFavourites", user.favourites)
  };

  const clearAuth = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userFavourites");
    setUser(null);
    setRole(null);
  };

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  const refreshAccessToken = async () => {
    const { refreshToken } = getStoredAuth();
    if (!refreshToken || isTokenExpired(refreshToken)) {
      clearAuth();
      return;
    }
    try {
      const response = await allAPIs.refreshToken({ refreshToken: refreshToken })
      const { accessToken, user } = response.data.data;
      storeAuth({ accessToken, refreshToken, user });
      setUser(user);
      setRole(user.role)
    } catch (err) {
      clearAuth();
    }
  };

  const login = ({ accessToken, refreshToken, user }) => {
    storeAuth({ accessToken, refreshToken, user });
    setUser(user);
    setRole(user.role);
  };

  const logout = () => {
    clearAuth();
  };

  useEffect(() => {
    const { accessToken, user, role } = getStoredAuth();
    if (!accessToken || isTokenExpired(accessToken)) {
      refreshAccessToken();
    } else {
      setUser(user);
      setRole(user.role);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, logout, refreshAccessToken, loading, isAuthenticated: !!user, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);