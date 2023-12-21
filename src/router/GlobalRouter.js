import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
<<<<<<< HEAD
=======
import VerificationPage from "../pages/Verification"
import ForgotPasswordPage from "../pages/ForgotPassword"
>>>>>>> f2ba9017350e220931f9781abd459e1012b6bbe5

function GlobalRouter() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
=======
          <Route path="/verify-account" element={<VerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
>>>>>>> f2ba9017350e220931f9781abd459e1012b6bbe5
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default GlobalRouter;
