import React, { Fragment } from 'react';
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Fragment>
      <nav className={styles.navbar} id="navbar">
        <div className={styles.navtitle}>
          <div id="nav-title">
            Todoist
          </div>
        </div>
        <div class="logo"></div>
      </nav>
    </Fragment>
  );
}

export default Header