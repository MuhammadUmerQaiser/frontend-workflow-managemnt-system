import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";

const UserProtectedRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user && user.role === "Employee" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default UserProtectedRoutes;
