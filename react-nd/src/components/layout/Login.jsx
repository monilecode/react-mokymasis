import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../abstracts/Button";
import styles from "../abstracts/Button.module.scss";
import stylesLogin from "./Login.module.scss";
import { UserContext } from "../../contexts/UserContext";

export const Login = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      {user ? (
        <div className={stylesLogin.loginBlock}>
          <p className={stylesLogin.loginText}>
            Hello, <span className={stylesLogin.loginUser}>{user.email} !</span>
          </p>
          <Button className={styles.btn} onClick={logout} text="Logout" />
        </div>
      ) : (
        <Button
          className={styles.btn}
          onClick={() => navigate("/login")}
          text="Login"
        />
      )}
    </div>
  );
};
