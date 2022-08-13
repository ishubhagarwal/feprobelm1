import React from "react";
import styles from "./Footer.module.css";
import string from "../../../../utils/strings";

const Footer = () => {
  return (
    <div className={styles.mainContainer}>
      <h4>{string.FOOTER_TEXT}</h4>
    </div>
  );
};

export default Footer;
