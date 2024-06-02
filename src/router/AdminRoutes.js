import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Employees from "../pages/Admin/employees/Employees";
import Domain from "../pages/Admin/general/domains/Domain";
import Designation from "../pages/Admin/general/designations/Designation";
import Team from "../pages/Admin/general/teams/Team";
import Grade from "../pages/Admin/general/grades/Grade";
// import Task from "../pages/Admin/general/tasks/Task";
import Role from "../pages/Admin/general/roles/Role";
import AddEmployeeForm from "../pages/Admin/employees/AddEmployeeForm";
import EmployeeDetail from "../pages/Admin/employees/EmployeeDetail";
import EmployeeEdit from "../pages/Admin/employees/EmployeeEdit";
import AdminProtectedRoute from "./RouteProtection/AdminProtectedRoutes";
import UserWorkflowHistory from "../pages/Admin/workflow/UserWorkflowHistory";
import Category from "../pages/Admin/category/Category";
import SubCategory from "../pages/Admin/sub-category/SubCategory";
import TaxPayer from "../pages/Admin/tax-payer/TaxPayer";
import Desk from "../pages/Admin/desk/Desk";
import DeskDetail from "../pages/Admin/desk/DeskDetail";
// import Notification from "../pages/Admin/notification/Notification";
import WorkingGroup from "../pages/Admin/working-group/WorkingGroup";
import WorkingGroupDetail from "../pages/Admin/working-group/WorkingGroupDetail";
import Notification from "../pages/Admin/notification/Notification";
import NotificationDetail from "../pages/Admin/notification/NotificationDetail";
import AddNotificationForm from "../pages/Admin/notification/AddNotificationForm";
import Task from "../pages/Admin/task/Task";
import AddTaskForm from "../pages/Admin/task/AddTaskForm";
import AdminTaskResponse from "../pages/Admin/task/AdminTaskResponse";
import TaskDetail from "../pages/Admin/task/TaskDetail";

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
          <Route path="/admin/domains" exact Component={AdminProtectedRoute}>
            <Route path="/admin/domains" exact Component={Domain} />
          </Route>
          <Route
            path="/admin/designations"
            exact
            Component={AdminProtectedRoute}
          >
            <Route path="/admin/designations" exact Component={Designation} />
          </Route>
          <Route path="/admin/teams" exact Component={AdminProtectedRoute}>
            <Route path="/admin/teams" exact Component={Team} />
          </Route>
          <Route path="/admin/grades" exact Component={AdminProtectedRoute}>
            <Route path="/admin/grades" exact Component={Grade} />
          </Route>
          <Route path="/admin/roles" exact Component={AdminProtectedRoute}>
            <Route path="/admin/roles" exact Component={Role} />
          </Route>
          <Route path="/admin/history" exact Component={AdminProtectedRoute}>
            <Route
              path="/admin/history"
              exact
              Component={UserWorkflowHistory}
            />
          </Route>
          <Route path="/admin/categories" exact Component={AdminProtectedRoute}>
            <Route path="/admin/categories" exact Component={Category} />
          </Route>
          <Route
            path="/admin/sub-categories"
            exact
            Component={AdminProtectedRoute}
          >
            <Route path="/admin/sub-categories" exact Component={SubCategory} />
          </Route>
          <Route path="/admin/tax-payer" exact Component={AdminProtectedRoute}>
            <Route path="/admin/tax-payer" exact Component={TaxPayer} />
          </Route>
          <Route path="/admin/desk" exact Component={AdminProtectedRoute}>
            <Route path="/admin/desk" exact Component={Desk} />
          </Route>
          <Route
            path="/admin/desk/detail/:deskId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/desk/detail/:deskId"
              exact
              Component={DeskDetail}
            />
          </Route>
          <Route
            path="/admin/notification"
            exact
            Component={AdminProtectedRoute}
          >
            <Route path="/admin/notification" exact Component={Notification} />
          </Route>
          <Route
            path="/admin/notification/detail/:notificationId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/notification/detail/:notificationId"
              exact
              Component={NotificationDetail}
            />
          </Route>
          <Route
            path="/admin/notification/create"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/notification/create"
              exact
              Component={AddNotificationForm}
            />
          </Route>
          <Route path="/admin/groups" exact Component={AdminProtectedRoute}>
            <Route path="/admin/groups" exact Component={WorkingGroup} />
          </Route>
          <Route
            path="/admin/group/detail/:workingGroupId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/group/detail/:workingGroupId"
              exact
              Component={WorkingGroupDetail}
            />
          </Route>
          <Route path="/admin/tasks" exact Component={AdminProtectedRoute}>
            <Route path="/admin/tasks" exact Component={Task} />
          </Route>
          <Route
            path="/admin/task/create"
            exact
            Component={AdminProtectedRoute}
          >
            <Route path="/admin/task/create" exact Component={AddTaskForm} />
          </Route>
          <Route
            path="/admin/task/response/:taskId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/task/response/:taskId"
              exact
              Component={AdminTaskResponse}
            />
          </Route>
          <Route
            path="/admin/task/detail/:taskId"
            exact
            Component={AdminProtectedRoute}
          >
            <Route
              path="/admin/task/detail/:taskId"
              exact
              Component={TaskDetail}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default AdminRoutes;
