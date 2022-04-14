import React, { Fragment } from "react";
import styles from "./InputTodo.module.css";

const InputTodo = ({
  submitHandler,
  description,
  onchangeHandler,
  focusMain,
}) => {
  return (
    <Fragment>
      <div className={styles.cardform}>
        <form className={styles.input} onSubmit={submitHandler}>
          <label className={styles.inputlabel}>Enter To-do Item here:</label>
          <div className={styles.row}>
            <input
              autoFocus={true}
              type="text"
              placeholder="Should do your mom tonight..."
              className={styles.inputfield}
              value={description}
              onChange={onchangeHandler}
              ref={focusMain}
            />
            <button type="submit" className={styles.actionbutton}>
              Add
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default InputTodo;
