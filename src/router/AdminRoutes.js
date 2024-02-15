import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Employees from "../pages/Admin/employees/Employees";
import AddEmployeeForm from "../pages/Admin/employees/AddEmployeeForm";
import EmployeeDetail from "../pages/Admin/employees/EmployeeDetail";
import EmployeeEdit from "../pages/Admin/employees/EmployeeEdit";

function AdminRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/employees/create" element={<AddEmployeeForm />} />
          <Route
            path="/admin/employee/detail/:employeeId"
            element={<EmployeeDetail />}
          />
          <Route
            path="/admin/employee/edit/:employeeId"
            element={<EmployeeEdit />}
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminRoutes;
