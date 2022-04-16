import React, { Fragment, useEffect, useRef, useState } from "react";
import InputTodo from "../components/InputTodo";
import ListTodo from "../components/ListTodo";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
function App({ token, updateToken }) {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const focusMain = useRef(null);
  const onchangeHandler = (e) => setDescription(e.target.value);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (description.length <= 0) {
      alert("Please enter a valid description");
      return;
    }
    try {
      const data = { description };
      await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      setDescription("");
      getTodos();
      focusMain.current.focus();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const todoArray = await response.json();
      setTodos(todoArray);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (token !== "") {
      getTodos();
    }
  }, []);
  return token === "" ? (
    <Navigate replace to="/login" />
  ) : (
    <Fragment>
      <Header title="Todoist" context={"logout"} updateToken={updateToken} />
      <InputTodo
        submitHandler={submitHandler}
        description={description}
        onchangeHandler={onchangeHandler}
        focusMain={focusMain}
      />
      <ListTodo todos={todos} getTodos={getTodos} setTodos={setTodos} />
    </Fragment>
  );
}

export default App;
