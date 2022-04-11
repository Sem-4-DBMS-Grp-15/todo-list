import React, { Fragment, useState } from "react";
import styles from "./InputTodo.module.css";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className={styles.cardform}>
        <form className={styles.input} onSubmit={submitHandler}>
          <label className={styles.inputlabel}>Enter To-do Item here:</label>
          <div className={styles.row}>

          <input
            type="text"
            placeholder="Should do your mom tonight..."
            className={styles.inputfield}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          <button type="submit" className={styles.actionbutton}>Add</button>
            </div>
        </form>
      </div>
    </Fragment>
  );
};

export default InputTodo;
