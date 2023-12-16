import React, { useEffect, useState,useMemo } from "react";
import "../../styles/auth/login.css";
import { loginAnimation } from "../../styles/auth/animation";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/auth";
import { useNavigate } from "react-router-dom";
// import {AuthService} from "../../services/Auth/index.service"
// import { useSnackbar } from 'notistack';
const Login = () => {
  useEffect(() => {
    loginAnimation();
  }, []);
  const dispatch = useAppDispatch();
  // const snackbar = useSnackbar();

  const [sampleState, setSampleState] = useState();
  const navigate = useNavigate()
  const sampleClick = () => {
    dispatch(setUser(sampleState));
    navigate("/")
  };
  // const authService = useMemo(() => new AuthService(), []);
  // const handleLogin = async() =>{
  // try{
  // const response = await authService.login("provide the data here as login expects a paramter")
  //       if (response.is_success) {
  //       localStorage.setItem('token', response.data.token);
  // dispatch(setUser(response mai user ka data aaiga na woh isma redux mai phaink do))
  //       router.push('/');
  //       snackbar.enqueueSnackbar('successfully logged in', {
  //         variant: 'success',
  //         autoHideDuration: 2000,
  //       });
  //       return response;
  //     }
  //     snackbar.enqueueSnackbar(response.message, {
  //       variant: 'error',
  //       autoHideDuration: 2000,
  //     });
  // }
  // catch (err) {
  //     console.log('error', err);
  //   } 
  // }
  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">
            By logging in you agree to the terms and conditions.
          </div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: "#ff00ff" }} offset="0" />
                <stop style={{ stopColor: "#ff0000" }} offset="1" />
              </linearGradient>
            </defs>
            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
          </svg>
          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setSampleState(e.target.value);
                console.log(e.target.value)
              }}
            />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <input type="submit" id="submit" value="Submit" />
            <button onClick={sampleClick}>Sample Click for redux</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
