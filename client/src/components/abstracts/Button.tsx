import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  className?: string;
  variant?: "btnPrimary" | "btnSecondary" | "btnFull";
  text?: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  btnIcon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "btnPrimary",
  ...btnProps
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${btnProps.className}`}
      onClick={btnProps.onClick}
      type={btnProps.type}
      disabled={btnProps.disabled}
    >
      {btnProps.btnIcon && (
        <span className={styles.icon}>{btnProps.btnIcon}</span>
      )}
      {btnProps.text}
    </button>
  );
};
