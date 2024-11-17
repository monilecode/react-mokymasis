import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { UserContext } from "@contexts/UserContext";
import { Button } from "@components/abstracts/Button";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "This input is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "This input is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors as { email: string; password: string });
    } else {
      const user = { email, password };
      login(user);
      navigate("/");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
        <h1>Welcome</h1>
        <div className={styles.loginInputsBlock}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className={errors.email ? styles.errorInput : ""}
          />
          {errors.email ? (
            <span className={styles.errorText}>{errors.email}</span>
          ) : (
            ""
          )}
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className={errors.password ? styles.errorInput : ""}
          />
          {errors.password ? (
            <span className={styles.errorText}>{errors.password}</span>
          ) : (
            ""
          )}
          <div className={styles.btnContainer}>
            <Button text="Login" variant="btnFull" />
          </div>
        </div>
        <Link className={styles.plainText} to={""}>
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};
