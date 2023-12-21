import React from "react";
import CircularLoader from "../Loader/CircularLoader";
import "./style.css"

const AuthButton = ({ label, loading, onClick }) => {
  return (
    <button className="signUpBtn" onClick={onClick}>
      {loading === true ? <CircularLoader /> :  label }
    </button>
  );
};

export default AuthButton;
