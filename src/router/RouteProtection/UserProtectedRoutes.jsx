import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../helpers/helpers";

const UserProtectedRoutes = () => {
  const user = isAuthenticated();
  return user && user.role !== "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default UserProtectedRoutes;
