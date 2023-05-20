import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/Hook";
import { setAuth } from "../../redux/features/auth/authSlice";
import { AuthRole } from "../../redux/features/type/authType";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUserData({ email, password }: any) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      })
      .then(function (response: { data: unknown }) {
        resolve(response.data);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((reason: any) => {
        reject(reason);
      });
  });
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("LOGIN");
  const authRedux = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onClickHandle(ev: any) {
    ev.preventDefault();
    if (!input.email || !input.password) {
      setError("Please enter your email and password.");
      return;
    }
    setStatus("PROCESSING......");
    getUserData(input)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        console.log(res);
        setStatus("SUCCESS");
        dispatch(
          setAuth({
            auth: true,
            role: res.role,
            token: res.token,
            user: {
              id: res.user.id,
              email: res.user.email,
              name: res.user.name,
            },
          })
        );
        navigate(`/Admin-dashboard`);
      })
      .catch((reason: unknown) => {
        setStatus("Error");
        console.log(reason);
      });
  }
  React.useEffect(() => {
    if (authRedux.auth === true) {
      if (authRedux.role === AuthRole.Admin) navigate("/Admin-dashboard");
      if (authRedux.role === AuthRole.staff) navigate("/staff-dashboard");
    }
  }, [authRedux]);

  return (
    <div className="container" id="container">
      <div className="form-container">
        <form onSubmit={onClickHandle}>
          <h1 className="txt-login">
            Login
            <AccountCircleOutlinedIcon />
          </h1>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => {
              setInput({ ...input, email: e.target.value });
            }}
            required
          />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => {
              setInput({ ...input, password: e.target.value });
            }}
            required
          />

          <button type="submit" onClick={onClickHandle}>
            {status}
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="text-link">
            <span className="text">
              Not a member?
              <Link to="/register" className="register-link">
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay-right">
          <h1>Login Form</h1>
          <p>ACE plus Solutions Co.,Ltd</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
