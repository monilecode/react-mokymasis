import React from "react";
import styles from "./TextField.module.scss";

export type TextFieldProps = {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  name,
  label,
  value,
  error,
  touched,
  disabled,
  onChange,
  onBlur,
}) => {
  const id = `form-${label}`;
  return (
    <div className={styles.TextFieldBlock}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {touched && error && <small className={styles.fieldError}>{error}</small>}
    </div>
  );
};
