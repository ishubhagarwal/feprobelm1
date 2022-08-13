import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
