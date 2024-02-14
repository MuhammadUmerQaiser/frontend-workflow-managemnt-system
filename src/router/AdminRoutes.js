import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Employees from "../pages/Admin/Employees";
import AddEmployeeForm from "../pages/Admin/AddEmployeeForm";

function AdminRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" exact  element={<Dashboard />} />
          <Route path="/employees" exact  element={<Employees />} />
          <Route path="/employees/addNewEmployees" exact  element={<AddEmployeeForm />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminRoutes;
