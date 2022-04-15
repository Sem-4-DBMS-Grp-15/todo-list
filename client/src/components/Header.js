import React, { Fragment } from 'react';
import styles from "./Header.module.css";

const Header = ({title}) => {
  return (
    <Fragment>
      <nav className={styles.navbar} id="navbar">
        <div className={styles.navtitle}>
          <div id="nav-title">
            {title}
          </div>
        </div>
        <div className="logo"></div>
      </nav>
    </Fragment>
  );
}

export default Header