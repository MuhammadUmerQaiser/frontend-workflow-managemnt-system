import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/User/Dashboard";
import UserTask from "../pages/User/task/UserTask";
import UserTaskResponse from "../pages/User/task/UserTaskResponse";
import UserWorkflowHistory from "../pages/User/workflow/UserWorkflowHistory";
import UserProtectedRoutes from "./RouteProtection/UserProtectedRoutes";

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
            path="/user/task/response/:taskId"
            exact
            Component={UserProtectedRoutes}
          >
            <Route
              path="/user/task/response/:taskId"
              exact
              Component={UserTaskResponse}
            />
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
