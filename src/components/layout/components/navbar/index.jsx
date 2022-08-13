import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetDestinations } from "../../../../store/slices/falcone";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.mainContaier}>
      <nav className={styles.navStyle}>
        <ul className={styles.listStyle}>
          <li className={styles.listItem}>
            <Link to="/" onClick={() => dispatch(resetDestinations())}>
              Reset
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
