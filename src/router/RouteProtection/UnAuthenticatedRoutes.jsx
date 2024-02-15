import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnAuthenticatedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return user ? (
    user.role === "Admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/admin" />
    )
  ) : (
    <Outlet />
  );
};

export default UnAuthenticatedRoutes;
