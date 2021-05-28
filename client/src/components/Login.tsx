import { useState } from "react";
import { loginUser } from "../store/AuthActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
function Login() {
  const [loginString, setLoginString] = useState("");
  const [passwordString, setPasswordString] = useState("");

  const onLoginChange = (event: any) => {
    setLoginString(event.target.value);
  };
  const onPasswordChange = (event: any) => {
    setPasswordString(event.target.value);
  };
  const dispatch = useDispatch();

  return (
    <div>
      <Link to="/register">Registration</Link>
      <h1>Login page</h1>

      <input
        value={loginString}
        onChange={onLoginChange}
        type="text"
        placeholder="Login"
      ></input>
      <input
        value={passwordString}
        onChange={onPasswordChange}
        type="text"
        placeholder="Password"
      ></input>
      <button
        onClick={() => {
          dispatch(loginUser(loginString, passwordString));
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Login;
