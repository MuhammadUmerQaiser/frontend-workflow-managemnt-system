import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/User/Dashboard";
import UserProtectedRoutes from "./RouteProtection/UserProtectedRoutes";

function UserRoutes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/user" exact Component={UserProtectedRoutes}>
            <Route path="/user" exact Component={Dashboard} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default UserRoutes;
