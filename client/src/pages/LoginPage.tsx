import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.scss";
import { Button } from "@components/abstracts/Button";
import { Routes } from "../routing/Routes";
import { login as loginApi } from "../api/AuthApi";
import { useUserStore } from "@hooks/useUserStore";
import { User } from "../types/UserType";
import { Formik, FormikConfig } from "formik";
import { LoginValues } from "../types/AuthType";
import * as yup from "yup";
import { TextField } from "@components/abstracts/TextField";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(
      /[a-zžųšįėęčą]+/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /[A-ZŽŲŠĮĖĘČĄ]+/,
      "Password must contain at least one uppercase letter"
    ),
});

type LoginFormFormik = FormikConfig<LoginValues>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [serverErrorMessage, setServerErrorMessage] = React.useState<
    null | string
  >(null);

  const handleLogin: LoginFormFormik["onSubmit"] = async (values) => {
    try {
      const { token, user }: { token: string; user: User } = await loginApi({
        email: values.email,
        password: values.password,
      });
      setUser(user);
      localStorage.setItem("token", token);
      navigate(Routes.HomePage);
    } catch (error) {
      if (error instanceof Error) {
        setServerErrorMessage(error.message);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleLogin}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        isValid,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <div className={styles.authContainer}>
          <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
            <h1>Login</h1>
            <div className={styles.authInputsBlock}>
              <TextField
                type="email"
                name="email"
                label="Email"
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                error={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <div className={styles.btnContainer}>
                <Button
                  text={isSubmitting ? "Logging in..." : "Login"}
                  variant="btnFull"
                  type="submit"
                  disabled={!dirty || !isValid || isSubmitting}
                />
              </div>
              {serverErrorMessage && !errors.email && !errors.password && (
                <small className={styles.serverError}>
                  {serverErrorMessage}
                </small>
              )}
            </div>
            <Link className={styles.plainText} to={"/register"}>
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>
      )}
    </Formik>
  );
};
