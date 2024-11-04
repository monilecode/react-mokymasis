import React from "react";
import styles from "./Button.module.scss";

export const Button = (btnProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[btnProps.variant]}`}
      onClick={btnProps.onClick}
      type={btnProps.type}
    >
      {btnProps.text}
    </button>
  );
};
