import React, { useState } from "react";
import styles from "./AuthPage.module.scss";
import { Button } from "@components/abstracts/Button";
import { useNavigate } from "react-router-dom";
import { register } from "@api/AuthApi";
import { Routes } from "@routing/Routes";

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register({
        name,
        email,
        password,
        age: Number(age),
      });
      navigate(Routes.LoginPage);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>Register</h1>
        {errorMessage && (
          <p>
            {errorMessage}
            <Button
              text="X"
              onClick={() => setErrorMessage(null)}
              type={"button"}
            />
          </p>
        )}
        <div className={styles.authInputsBlock}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.btnContainer}>
            <Button text="Register" variant="btnFull" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
