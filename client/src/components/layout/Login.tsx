import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/abstracts/Button";
import styles from "../abstracts/Button.module.scss";
import stylesLogin from "./Login.module.scss";
import { useUserStore } from "@hooks/useUserStore";
import { Routes } from "../../routing/Routes";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = () => {
    clearUser();
    localStorage.removeItem("token");
    navigate(Routes.LoginPage);
  };

  return (
    <div>
      {user ? (
        <div className={stylesLogin.loginBlock}>
          <p className={stylesLogin.loginText}>
            Hello, <span className={stylesLogin.loginUser}>{user.email} !</span>
          </p>
          <Button
            className={styles.btn}
            onClick={logout}
            text="Logout"
            type={"button"}
          />
        </div>
      ) : (
        <Button
          className={styles.btn}
          onClick={() => navigate("/login")}
          text="Login"
          type={"button"}
        />
      )}
    </div>
  );
};
