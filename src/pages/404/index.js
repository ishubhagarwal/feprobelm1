import React from "react";
import { Button } from "antd";
import styles from "./404.module.css";
import string from "../../utils/strings";

const NoPage = () => {
  return (
    <div className={styles.mainContainer}>
      <h3>{string.NO_PAGE_TEXT}</h3>
      <Button type="link" href="/">
        {string.GO_TO_HOME_PAGE_TEXT}
      </Button>
    </div>
  );
};

export default NoPage;
