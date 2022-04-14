import React, { Fragment, useEffect, useRef, useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import Header from "./components/Header";
function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const focusMain=useRef(null);
  const onchangeHandler = (e) => setDescription(e.target.value);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const response = await fetch("http://localhost:5000/todos");
      const todoArray = await response.json();
      setTodos(todoArray);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <Header/>
      <InputTodo
        submitHandler={submitHandler}
        description={description}
        onchangeHandler={onchangeHandler}
        focusMain={focusMain}
      />
      <ListTodo
        todos={todos}
        getTodos={getTodos}
        setTodos={setTodos}
      />
    </Fragment>
  );
}

export default App;
