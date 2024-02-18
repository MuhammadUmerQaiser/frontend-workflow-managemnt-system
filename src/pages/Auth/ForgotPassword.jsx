import React from 'react';
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth/styles.css";
import { useSnackbar } from "notistack";
import { AuthService } from "../../services/Auth/index.service";
import AuthButton from "../../components/common/Button/AuthButton";
import srb from "../../assets/srb.png"


const ForgotPassword = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    // setLoading(true);
    // e.preventDefault();
    // const { email } = credentials;
    navigate("/verify-account");

    // if (!email) {
    //   enqueueSnackbar("Please fill in email fields", {
    //     variant: "error",
    //   });
    //   setLoading(false);

    //   return;
    // }
    // try {
    //   setLoading(true);
    //   const response = await authService.login({
    //     email: credentials.email,
    //     password: credentials.password,
    //   });

    //   console.log("res:", response);

    //   if (response.data.result.proceed === "ok") {
    //     const token = response.data.token;
    //     localStorage.setItem("token", token);
    //     // navigate("/dashboard");

    //     enqueueSnackbar("User logged in successfully", {
    //       variant: "success",
    //       autoHideDuration: 2000,
    //     });
    //   } else {
    //     enqueueSnackbar("Invalid credentials", {
    //       variant: "error",
    //       autoHideDuration: 2000,
    //     });
    //   }
    // } catch (error) {
    //   enqueueSnackbar("An error occurred", {
    //     variant: "error",
    //     autoHideDuration: 2000,
    //   });
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="loginMain">
        <div className="leftContainer">
          <img src={srb} alt="srb" />

          <div
            className="logoBox"
            style={{
              marginBottom: "40px",
            }}
          >
            <p className='forgotPasswordText'>Forgot Password</p>
          </div>

          <form onSubmit={handleSubmit} className="formBox">
            <input
              type="email"
              className="form-control inputFields"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
            />


            <AuthButton
              label="Submit"
              loading={loading}
              onClick={handleSubmit}
            />

          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
