/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth/styles.css";
import { useSnackbar } from "notistack";
import { AuthService } from "../../services/Auth/index.service";
import AuthButton from "../../components/common/Button/AuthButton";
import srb from "../../assets/srb.png";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/auth/";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      enqueueSnackbar("Please fill all fields", {
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
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem('auth', JSON.stringify(response?.data.result))
        // dispatch(setUser(response?.data.result));
        enqueueSnackbar("User logged in successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        if (response.data?.result.role === "Admin") {
          navigate("/admin");
        }else{
          navigate("/user");
        }
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
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <div className="loginMain">
          <div className="leftContainer">
            <div
              className="logoBox"
              style={{
                marginBottom: "40px",
              }}
            >
              <img src={srb} alt="srb" />
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
              <Link
                className="forgotPasswordTypo"
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                }}
              >
                Forgot password
              </Link>
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
      </div>
    </>
  );
};

export default Login;
