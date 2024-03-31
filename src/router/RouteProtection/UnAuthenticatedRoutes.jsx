import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../helpers/helpers";

const UnAuthenticatedRoutes = () => {
  const user = isAuthenticated();
  return user ? (
    user.role === "Admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/user" />
    )
  ) : (
    <Outlet />
  );
};

export default UnAuthenticatedRoutes;
