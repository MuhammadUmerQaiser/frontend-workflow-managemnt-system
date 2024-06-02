import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/User/Dashboard";
import UserTask from "../pages/User/task/UserTask";
import UserTaskResponse from "../pages/User/task/UserTaskResponse";
import UserTaskDetail from "../pages/User/task/UserTaskDetail";
import UserWorkflowHistory from "../pages/User/workflow/UserWorkflowHistory";
import UserProtectedRoutes from "./RouteProtection/UserProtectedRoutes";
import Profile from "../pages/User/Profile";
import DeskHistory from "../pages/User/history/DeskHistory";

function UserRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/user" exact Component={UserProtectedRoutes}>
            <Route path="/user" exact Component={Dashboard} />
          </Route>
          <Route path="/user/tasks" exact Component={UserProtectedRoutes}>
            <Route path="/user/tasks" exact Component={UserTask} />
          </Route>
          <Route
            path="/user/task/response/:taskAssignmentId"
            exact
            Component={UserProtectedRoutes}
          >
            <Route
              path="/user/task/response/:taskAssignmentId"
              exact
              Component={UserTaskResponse}
            />
          </Route>
          <Route
            path="/user/task/detail/:taskAssignmentId"
            exact
            Component={UserProtectedRoutes}
          >
            <Route
              path="/user/task/detail/:taskAssignmentId"
              exact
              Component={UserTaskDetail}
            />
          </Route>
          <Route
            path="/user/profile"
            exact
            Component={UserProtectedRoutes}
          >
            <Route
              path="/user/profile"
              exact
              Component={Profile}
            />
          </Route>
          <Route path="/user/desk-history" exact Component={UserProtectedRoutes}>
            <Route path="/user/desk-history" exact Component={DeskHistory} />
          </Route>
          <Route path="/user/history" exact Component={UserProtectedRoutes}>
            <Route path="/user/history" exact Component={UserWorkflowHistory} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default UserRoutes;
