import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/User/Dashboard";
import CreateUserWorkflow from "../pages/User/workflow/CreateUserWorkflow";
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
          <Route path="/user/workflow" exact Component={UserProtectedRoutes}>
            <Route path="/user/workflow" exact Component={CreateUserWorkflow} />
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
