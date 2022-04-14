import React, { Fragment, useEffect, useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
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
      <InputTodo
        submitHandler={submitHandler}
        description={description}
        onchangeHandler={onchangeHandler}
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
