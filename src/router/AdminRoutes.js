import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Employees from "../pages/Admin/employees/Employees";
import AddEmployeeForm from "../pages/Admin/employees/AddEmployeeForm";

function AdminRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/create" element={<AddEmployeeForm />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminRoutes;
