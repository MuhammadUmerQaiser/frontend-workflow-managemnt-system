import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Employees from "../pages/Admin/employees/Employees";
import AddEmployeeForm from "../pages/Admin/employees/AddEmployeeForm";
import EmployeeDetail from "../pages/Admin/employees/EmployeeDetail";
import EmployeeEdit from "../pages/Admin/employees/EmployeeEdit";
import AdminProtectedRoute from "./RouteProtection/AdminProtectedRoutes";

function AdminRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" exact Component={AdminProtectedRoute}>
            <Route path="/admin" exact Component={Dashboard} />
          </Route>
          <Route path="/admin/employees" exact Component={AdminProtectedRoute}>
            <Route path="/admin/employees" exact Component={Employees} />
          </Route>
          <Route
            path="/admin/employees/create"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/employees/create"
              exact
              Component={AddEmployeeForm}
            />
          </Route>
          <Route
            path="/admin/employee/detail/:employeeId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/employee/detail/:employeeId"
              exact
              Component={EmployeeDetail}
            />
          </Route>
          <Route
            path="/admin/employee/edit/:employeeId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/employee/edit/:employeeId"
              exact
              Component={EmployeeEdit}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminRoutes;
