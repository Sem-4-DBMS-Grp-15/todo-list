import React, { Fragment } from "react";
import styles from "./ListTodo.module.css";
import Card from "./Card";

const ListTodo = ({ todos, getTodos, setTodos }) => {
  return (
    <Fragment>
      <div className={styles.cardholder}>
        {todos.length === 0 && <div className={styles.warning}>No entries yet</div>}
        {todos.map((a) => (
          <Card a={a} key={a.id} getTodos={getTodos} setTodos={setTodos} />
        ))}
      </div>
    </Fragment>
  );
};

export default ListTodo;
