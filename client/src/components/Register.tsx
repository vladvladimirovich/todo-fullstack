import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../store/AuthActions";
import { useDispatch, useSelector } from "react-redux";

function Register() {
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
      <Link to="/login">Login</Link>
      <h1>Registration page</h1>

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
        onClick={() => dispatch(registerUser(loginString, passwordString))}
      >
        Submit
      </button>
    </div>
  );
}

export default Register;
