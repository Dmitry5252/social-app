import React, { FunctionComponent } from "react";
import axios from "../config/axiosInstance";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { required, email, minLength, maxLength, composeValidators } from "../utils/validators";
import { NextRouter, useRouter } from "next/router";
import styles from "../styles/LoginForm.module.scss";

const sendLoginRequest =
  (router: NextRouter) =>
  ({ email, password }: { email: string; password: string }) => {
    return axios.post("login", { email, password }).then(
      (r) => {
        document.cookie = `access_token=${r.data.access_token}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
        router.push("/main");
      },
      () => ({ [FORM_ERROR]: "Invalid email or password" })
    );
  };

const LoginForm: FunctionComponent = () => {
  const router = useRouter();
  const sendLoginRequestWithRouter = sendLoginRequest(router);
  return (
    <Form
      onSubmit={sendLoginRequestWithRouter}
      render={({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit} className={styles.registrationFormInner}>
          <Field validate={composeValidators(required, email)} name="email">
            {({ meta, input }) => (
              <div className={styles.formField}>
                <input {...input} className={styles.registrationFormInput} placeholder="Email"></input>
                <div className={styles.validationNotice}>{meta.touched && meta.error}</div>
              </div>
            )}
          </Field>
          <Field validate={composeValidators(required, minLength, maxLength)} name="password">
            {({ meta, input }) => (
              <div className={styles.formField}>
                <input {...input} type="password" className={styles.registrationFormInput} placeholder="Password"></input>
                <div className={styles.validationNotice}>{meta.touched && meta.error}</div>
              </div>
            )}
          </Field>
          <div className={styles.submitError}>{submitError && submitError}</div>
          <button type="submit" className={styles.registrationFormButton}>
            Login
          </button>
        </form>
      )}
    />
  );
};

export default LoginForm;
