import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";

function GlobalRouter() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default GlobalRouter;
