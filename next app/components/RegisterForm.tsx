import React, { FunctionComponent } from "react";
import axios from "../config/axiosInstance";
import { Form, Field } from "react-final-form";
import { required, email, minLength, maxLength, composeValidators } from "../utils/validators";
import { NextRouter, useRouter } from "next/router";
import styles from "../styles/RegistrationForm.module.scss";

const sendRegisterRequest =
  (router: NextRouter) =>
  ({ name, email, password }: { name: string; email: string; password: string }) => {
    return axios.post("registration", { name, email, password }).then(
      (r) => {
        document.cookie = `access_token=${r.data.access_token}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
        router.push("/main");
      },
      (e) => {
        if (e.response.data == "Email already used") return { email: "Email already used" };
      }
    );
  };

const RegisterForm: FunctionComponent = () => {
  const router = useRouter();
  const sendRegisterRequestWithRouter = sendRegisterRequest(router);
  return (
    <Form
      onSubmit={sendRegisterRequestWithRouter}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.registrationFormInner}>
          <Field validate={composeValidators(required, minLength, maxLength)} name="name">
            {({ meta, input }) => (
              <div className={styles.formField}>
                <input {...input} className={styles.registrationFormInput} placeholder="Name"></input>
                <div className={styles.validationNotice}>{meta.touched && meta.error}</div>
              </div>
            )}
          </Field>
          <Field validate={composeValidators(required, email)} name="email">
            {({ meta, input }) => (
              <div className={styles.formField}>
                <input {...input} className={styles.registrationFormInput} placeholder="Email"></input>
                <div className={styles.validationNotice}>{meta.touched && (meta.error || meta.submitError)}</div>
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
          <button type="submit" className={styles.registrationFormButton}>
            Register
          </button>
        </form>
      )}
    />
  );
};

export default RegisterForm;
