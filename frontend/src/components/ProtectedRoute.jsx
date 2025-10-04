import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  // If user is logged in, render the child route via Outlet
  if (user) {
    return <Outlet />;
  }

  // If not logged in, redirect to the login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;