import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ title, context, updateToken }) => {
  const onclickHandler = () => {
    if (context === "logout") {
      updateToken("");
    }
  };
  return (
    <Fragment>
      <nav className={styles.navbar} id="navbar">
        <div className={styles.navtitle}>
          <div id="nav-title">{title}</div>
        </div>
        <div className={styles.options}>
          <Link to={`/${context}`} onClick={onclickHandler}>
            Click here to {context}
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
