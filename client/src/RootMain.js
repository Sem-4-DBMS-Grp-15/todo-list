import React, { useEffect, useState } from "react";
import App from "./pages/App";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const RootMain = () => {
  const [token, updateToken] = useState("");
  const onUnload=(e)=>{
    e.preventDefault();
    console.log("byebye");
    updateToken("");
  }
  useEffect(() => {
    window.addEventListener("beforeunload",onUnload);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<App token={token} updateToken={updateToken} />}
        />
        <Route
          exact path="signup"
          element={<SignUp token={token} updateToken={updateToken} />}
        />
        <Route
          exact path="login"
          element={<Login token={token} updateToken={updateToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RootMain;
