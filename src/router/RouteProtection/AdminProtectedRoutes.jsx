import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return user && user.role === "Admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
