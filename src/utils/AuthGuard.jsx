// src/utils/AuthGuard.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "@components/Loader";

const AuthGuard = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, role } = useAuth();
  if (loading) {
    return (
      <div className="p-4 text-center">
        <Loader />
      </div>
    );
  }
  const loginPath = requiredRole == "2" ? "/admin/login" : "/login";
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  if (requiredRole && role != requiredRole) {
    return <Navigate to={loginPath} replace />;
  }

  return children;
};

export default AuthGuard;
