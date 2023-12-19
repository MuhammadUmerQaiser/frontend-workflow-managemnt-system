/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { useSnackbar } from "notistack";
import { AuthService } from "../../services/Auth/index.service";
import AuthButton from "../common/Button/AuthButton";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      enqueueSnackbar("Please fill in both email and password fields", {
        variant: "error",
      });
      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });

      console.log("res:", response);

      if (response.data.result.proceed === "ok") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        // navigate("/dashboard");

        enqueueSnackbar("User logged in successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Invalid credentials", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="loginMain">
        <div className="leftContainer">
          <div
            className="logoBox"
            style={{
              marginBottom: "40px",
            }}
          >
            {/* idher srb ka logo waghaira laga do acha sa  */}
            {/* <img src={Logo} alt="owl" /> */}
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
            <input
              type="password"
              className="form-control inputFields"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              placeholder="Password"
            />
            <p
              style={{
                textAlign: "end",
                color: "#287287",
              }}
            >
              Forgot password
            </p>
            <AuthButton
              label="Login"
              loading={loading}
              onClick={handleSubmit}
            />
            <div className="noAccBox">
              Don't have an account?
              <span>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <p
                    style={{
                      color: "#287287",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    Sign up
                  </p>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
