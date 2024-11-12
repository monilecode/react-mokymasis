import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ variant = "btnPrimary", ...btnProps }) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={btnProps.onClick}
      type={btnProps.type}
    >
      {btnProps.text}
    </button>
  );
};
