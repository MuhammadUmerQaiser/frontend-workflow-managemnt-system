import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";

const UnAuthenticatedRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
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
