import React from "react";
import styles from "./Header.module.css";
import Navbar from "../navbar";
import string from "../../../../utils/strings";

const Header = () => {
  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.titleContainer}>
        <h1>{string.HEADER_TITLE}</h1>
      </div>
    </div>
  );
};

export default Header;
