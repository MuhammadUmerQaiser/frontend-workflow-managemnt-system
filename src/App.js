import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
