import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return user && user.role === "Employee" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default UserProtectedRoutes;
