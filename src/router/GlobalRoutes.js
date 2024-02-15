import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/Auth/Signup";
import LoginPage from "../pages/Auth/Login";
import VerificationPage from "../pages/Auth/Verification"
import ForgotPasswordPage from "../pages/Auth/ForgotPassword"

function GlobalRouter() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact  element={<SignupPage />} />
          <Route path="/login" exact  element={<LoginPage />} />
          <Route path="/verify-account" exact  element={<VerificationPage />} />
          <Route path="/forgot-password" exact  element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default GlobalRouter;
