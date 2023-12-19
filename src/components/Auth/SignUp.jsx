/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { useSnackbar } from "notistack";
import { AuthService } from "../../services/Auth/index.service";
import AuthButton from "../common/Button/AuthButton";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password, name, role } = credentials;

    if (!email || !password || !name || !role) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      const response = await authService.signup(credentials);

      console.log("res:", response);

      if (response.data.proceed === "ok") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/verify-account");

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
              value={credentials.name}
              onChange={onChange}
              id="name"
              name="name"
              aria-describedby="emailHelp"
              placeholder="Name"
            />
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
            <input
              type="password"
              className="form-control inputFields"
              value={credentials.role}
              onChange={onChange}
              name="role"
              id="role"
              placeholder="role"
            />
            <AuthButton
              label="Signup"
              loading={loading}
              onClick={handleSubmit}
            />

            <div className="noAccBox">
              Already have an account?
              <span>
                <Link
                  to="/login"
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
                    Login
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

export default Signup;
