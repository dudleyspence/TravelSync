import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    console.log("You are not logged in");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoutes;
