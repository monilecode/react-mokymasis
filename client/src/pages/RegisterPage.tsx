import React, { useState } from "react";
import styles from "./AuthPage.module.scss";
import { Button } from "@components/abstracts/Button";
import { useNavigate } from "react-router-dom";
import { register } from "../api/AuthApi";
import { Routes } from "../routing/Routes";
import * as yup from "yup";
import { Formik, FormikConfig } from "formik";
import { RegistrationValues } from "../types/AuthType";
import { TextField } from "@components/abstracts/TextField";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .min(18, "You must be at least 18 years old"),
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

type RegisterFormFormik = FormikConfig<RegistrationValues>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleSubmit: RegisterFormFormik["onSubmit"] = async (
    values,
    { setSubmitting }
  ) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        age: Number(values.age),
      });
      navigate(Routes.LoginPage);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Formik
        initialValues={{ name: "", age: 0, email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
            <h1>Register</h1>
            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
            <div className={styles.authInputsBlock}>
              <TextField
                type="text"
                name="name"
                label="Name"
                value={values.name}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <TextField
                type="text"
                name="age"
                label="Age"
                value={values.age.toString()}
                error={errors.age}
                touched={touched.age}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
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
                  text="Register"
                  variant="btnFull"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
