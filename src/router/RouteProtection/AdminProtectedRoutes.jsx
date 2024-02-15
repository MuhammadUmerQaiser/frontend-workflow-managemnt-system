import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";

const AdminProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user && user.role === "Admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
