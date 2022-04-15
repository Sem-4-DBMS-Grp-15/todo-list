import React, { Fragment, useRef, useState } from "react";
import Header from "../components/Header";

const SignUp = ({token,updateToken}) => {
  // if(token){redirect}
  const [uname, changeUname] = useState("");
  const [pword, changePword] = useState("");
  const focusMain = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { name: uname, password: pword };
      const Response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result= await Response.json();
      updateToken(result.token);
      focusMain.current.focus();
      console.log(result);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      {/* <Header title="Signup" /> */}
      <form onSubmit={submitHandler}>
        <div className="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>

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
          <p>
            By creating an account you agree to our{" "}
            <a href="google.com">Terms & Privacy</a>.
          </p>

          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SignUp;
