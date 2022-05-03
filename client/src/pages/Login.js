import React, { Fragment, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Login.module.css";

const Login = ({ token, updateToken }) => {
  const [uname, changeUname] = useState("");
  const [pword, changePword] = useState("");
  const focusMain = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { name: uname, password: pword };
      const Response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await Response.json();
      console.log(result);
      if (result.message) {
        alert(result.message);
      } else {
        updateToken(result.token);
        focusMain.current.focus();
      }
      changePword("");
      changeUname("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return token !== "" ? (
    <Navigate replace={true} to="/" />
  ) : (
    <Fragment>
      <Header title="Login" context="signup" updateToken={updateToken} />
      <div className={styles.cardform}>
        <form className={styles.input} onSubmit={submitHandler}>
          <div className="container">
            <h1>Login</h1>
            <p>Please fill in this form to sign back into your account.</p>
            <div className={styles.wrapper}>
              <label className={styles.inputlabel} htmlFor="username">
                <b>Username:</b>
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
            <div className={styles.wrapper}>
              <label className={styles.inputlabel} htmlFor="psw">
                <b>Password:</b>
              </label>
              <input
                className={styles.inputfield}
                type="password"
                placeholder="Enter Password"
                name="psw"
                onChange={(e) => changePword(e.target.value)}
                required
              />
            </div>
            <div className="clearfix">
              <button type="button" className={styles.actionbutton}>
                Cancel
              </button>
              <button type="submit" className={styles.actionbutton}>
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
