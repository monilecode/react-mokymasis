import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.scss";
import { UserContext } from "@contexts/UserContext";
import { Button } from "@components/abstracts/Button";
import { Routes } from "@routing/Routes";
import { login } from "@api/AuthApi";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Išsaugoti prisijungusio vartotojo duomenis i global state (react | zustand | redux)
      // išsaugoti token'ą į local storage

      navigate(Routes.HomePage);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleLogin} noValidate>
        <h1>Login</h1>
        <div className={styles.authInputsBlock}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className={styles.errorInput}
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
              placeholder="Password"
              className={styles.errorInput}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.btnContainer}>
            <Button text="Login" variant="btnFull" type="submit" />
          </div>
        </div>
        <Link className={styles.plainText} to={"/register"}>
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};
