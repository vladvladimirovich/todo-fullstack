import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../store/authActions";
import { useDispatch } from "react-redux";

function Register() {
  const [loginString, setLoginString] = useState("");
  const [passwordString, setPasswordString] = useState("");

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginString(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
