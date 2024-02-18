/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth/styles.css";
import { useSnackbar } from "notistack";
import { AuthService } from "../../services/Auth/index.service";
import AuthButton from "../../components/common/Button/AuthButton";
import { useAppDispatch } from "../../store/";
import { setUser } from "../../store/auth/";
import srb from "../../assets/srb.png";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
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
    const { email, password, name } = credentials;

    if (!email || !password || !name) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await authService.signup(credentials);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch(setUser(response?.data));
        enqueueSnackbar("Account Created Successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/admin");
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
      <div className="loginMain">
        <div className="leftContainer">
          <div
            className="logoBox"
            style={{
              marginBottom: "40px",
            }}
          >
            {/* idher srb ka logo waghaira laga do acha sa  */}

            <img src={srb} alt="srb" />
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

            <AuthButton
              label="Signup"
              loading={loading}
              onClick={handleSubmit}
            />

            <div className="noAccBox">
              <p className="alreadyAccountTextStyle">
                Already have an account?
              </p>

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
