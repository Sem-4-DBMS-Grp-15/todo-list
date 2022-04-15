import React, { Fragment, useRef, useState } from "react";
import { Navigate} from "react-router-dom";
import Header from "../components/Header";

const Login = ({ token, updateToken }) => {
  if (token !== "") {
    <Navigate replace={true} to="aaaa" />;
  }
  const [uname, changeUname] = useState("");
  const [pword, changePword] = useState("");
  const focusMain = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { name: uname, password: pword };
      const Response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await Response.json();
      updateToken(result.token);
      focusMain.current.focus();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    (token !== "")?<Navigate replace={true} to="/" />:
    <Fragment>
      {/* <Header title="Login" /> */}
      <form onSubmit={submitHandler}>
        <div className="container">
          <h1>Login</h1>
          <p>Please fill in this form to sign back into your account.</p>

          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            ref={focusMain}
            onChange={(e) => changeUname(e.target.value)}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => changePword(e.target.value)}
            required
          />

          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Log in
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
