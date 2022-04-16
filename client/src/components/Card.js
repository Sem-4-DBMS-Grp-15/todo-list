import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import {
  MdClose,
  MdOutlineSave,
  MdOutlineEdit,
  MdDelete,
} from "react-icons/md";

const Card = ({ a, getTodos, setTodos }) => {
  const [description, setDescription] = useState(a.description);
  const [editButtonText, setEditButtonText] = useState(<MdOutlineEdit/>);
  const [deleteButtonText, setDeleteButtonText] = useState(<MdDelete/>);
  const [isEdit, setIsEdit] = useState(false);
  const focusText = useRef(null);
  const editToggler = (e) => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      setEditButtonText(<MdOutlineSave/>);
      setDeleteButtonText(<MdClose/>);
    } else {
      setEditButtonText(<MdOutlineEdit />);
      setDeleteButtonText(<MdDelete />);
    }
    editHandler(e);
  };

  const deleteHandler = async (e) => {
    if (!isEdit) {
      try {
        const id = e.target.parentNode.id;
        await fetch(`/todos/${id}`, {
          method: "DELETE",
        });
        getTodos();
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setDescription(a.description);
      setIsEdit(!isEdit);
      setEditButtonText(<MdOutlineEdit/>);
      setDeleteButtonText(<MdDelete/>);
    }
  };

  const editHandler = async (e) => {
    if (isEdit) {
      try {
        const id = e.target.parentNode.id;
        const data = { description };
        await fetch(`/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        getTodos();
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setEditButtonText(<MdOutlineSave/>);
      setDeleteButtonText(<MdClose/>);
    }
  };
  useEffect(() => {
    focusText.current.focus();
  }, [isEdit]);

  return (
    <div className={styles.card} id={a.id} key={a.id} draggable={true}>
      <input
        autoFocus={true}
        type="text"
        placeholder={a.description}
        className={isEdit ? `${styles.text} ${styles.edit}` : styles.text}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ref={focusText}
      />
      <div
        className={
          isEdit ? `${styles.cardtext} ${styles.edit}` : styles.cardtext
        }
      >
        {a.description}
      </div>
      <button className={styles.actionbutton} onClick={editToggler}>
        {editButtonText}
      </button>
      <button
        className={`${styles.actionbutton} ${styles.delete}`}
        onClick={deleteHandler}
      >
        {deleteButtonText}
      </button>
    </div>
  );
};

export default Card;
