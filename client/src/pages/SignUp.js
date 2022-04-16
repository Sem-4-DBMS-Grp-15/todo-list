import React, { Fragment, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Signup.module.css";

const Login = ({ token, updateToken }) => {
  const [uname, changeUname] = useState("");
  const [pword, changePword] = useState("");
  const focusMain = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { name: uname, password: pword };
      const Response = await fetch("/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await Response.json();
      if (result.message) {
        alert(result.message);
        changePword("");
        changeUname("");
      } else {
        updateToken(result.token);
        focusMain.current.focus();
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return token !== "" ? (
    <Navigate to="/" />
  ) : (
    <Fragment>
      <Header title="Login" context="login" updateToken={updateToken} />
      <div className={styles.cardform}>
        <form className={styles.input} onSubmit={submitHandler}>
          <div className="container">
            <h1>Signup</h1>
            <p>Please fill in this form to create an account.</p>
            <div className="wrapper">
              <label className={styles.inputlabel} htmlFor="username">
                <b>Username</b>
              </label>
              <input
                className={styles.inputfield}
                type="text"
                placeholder="Enter Username"
                name="email"
                ref={focusMain}
                onChange={(e) => changeUname(e.target.value)}
                required
              />
            </div>
            <label className={styles.inputlabel} htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className={styles.inputfield}
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
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
