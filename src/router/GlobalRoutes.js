import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/Auth/Signup";
import LoginPage from "../pages/Auth/Login";
import VerificationPage from "../pages/Auth/Verification";
import ForgotPasswordPage from "../pages/Auth/ForgotPassword";
import UnAuthenticatedRoutes from "./RouteProtection/UnAuthenticatedRoutes";

function GlobalRouter() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={UnAuthenticatedRoutes}>
            <Route path="/" exact Component={SignupPage} />
          </Route>
          <Route path="/login" exact Component={UnAuthenticatedRoutes}>
            <Route path="/login" exact Component={LoginPage} />
          </Route>
          <Route path="/verify-account" exact Component={UnAuthenticatedRoutes}>
            <Route path="/verify-account" exact Component={VerificationPage} />
          </Route>
          <Route
            path="/forgot-password"
            exact
            Component={UnAuthenticatedRoutes}
          >
            <Route
              path="/forgot-password"
              exact
              Component={ForgotPasswordPage}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default GlobalRouter;
