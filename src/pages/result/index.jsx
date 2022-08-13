import React, { useEffect } from "react";
import styles from "./Result.module.css";
import string from "../../utils/strings";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearResult } from "../../store/slices/falcone";

const Result = () => {
  const falcone = useSelector((state) => state.falcone);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!falcone.falcone) {
      navigate("/");
    }
  }, [falcone]);

  const onClickStartAgain = (e) => {
    e.preventDefault();
    dispatch(clearResult());
    navigate("/");
  };

  if (falcone.falcone) {
    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.successMessageStyle}>
          {falcone.falcone.status === "false"
            ? string.FAIL_MESSAGE
            : string.SUCCESS_MESSAGE}
        </h2>
        <h2 className={styles.timeStyle}>
          {string.TIME_TAKEN_TEXT} {falcone.timeTaken}
        </h2>
        {falcone.falcone.status === "success" && (
          <h2 className={styles.planetStyle}>
            {string.PLANET_FOUND_TEXT} {falcone.falcone.planet_name}
          </h2>
        )}
        <Button onClick={(e) => onClickStartAgain(e)}>
          {string.START_AGAIN_BUTTON_TEXT}
        </Button>
      </div>
    );
  } else {
    return null;
  }
};

export default Result;
