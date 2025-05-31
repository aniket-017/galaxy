import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  console.log("Protected Route Debug:", {
    token: token ? "Present" : "Missing",
    user,
    allowedRoles,
    userRole: user.role,
  });

  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log("User role not allowed:", user.role);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
