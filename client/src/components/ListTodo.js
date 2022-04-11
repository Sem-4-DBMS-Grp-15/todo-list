import React, { Fragment, useEffect, useState } from "react";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async (e) => {
    const response = await fetch("http://localhost:5000/todos");
    const todoArray = await response.json();
    setTodos(todoArray);
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Fragment>
      <ul>
        {todos.map((a) => (
          <li>{a.description}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ListTodo;
