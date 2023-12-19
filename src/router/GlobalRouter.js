import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import VerificationPage from "../pages/Verification"
function GlobalRouter() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-account" element={<VerificationPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default GlobalRouter;
