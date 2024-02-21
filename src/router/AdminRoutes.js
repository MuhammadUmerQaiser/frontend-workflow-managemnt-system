import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Employees from "../pages/Admin/employees/Employees";
import Domain from "../pages/Admin/domains/Domain";
import Designation from "../pages/Admin/general/designations/Designation"
import Team from "../pages/Admin/general/teams/Team";
import Grade from "../pages/Admin/general/grades/Grade";
import Task from "../pages/Admin/general/tasks/Task";
import Role from "../pages/Admin/general/roles/Role";
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
          <Route
            path="/admin/domains"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/domains"
              exact
              Component={Domain}
            />
          </Route>
          <Route
            path="/admin/designations"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/designations"
              exact
              Component={Designation}
            />
          </Route>
          <Route
            path="/admin/teams"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/teams"
              exact
              Component={Team}
            />
          </Route>
          <Route
            path="/admin/grades"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/grades"
              exact
              Component={Grade}
            />
          </Route>
          <Route
            path="/admin/tasks"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/tasks"
              exact
              Component={Task}
            />
          </Route>
          <Route
            path="/admin/roles"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/roles"
              exact
              Component={Role}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminRoutes;
