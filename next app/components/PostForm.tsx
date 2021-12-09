import React, { FunctionComponent } from "react";
import { NextRouter, useRouter } from "next/router";
import axios from "../config/axiosInstance";
import { Form, Field } from "react-final-form";
import styles from "../styles/PostForm.module.scss";
import { composeValidators, required, minLength } from "../utils/validators";

const sendPost =
  (router: NextRouter) =>
  ({ title, description }: { title: string; description: string }) => {
    axios.post("posts", { title, description }, { headers: { access_token: document.cookie.slice(13) } }).then(() => router.push("/main"));
  };

const PostForm: FunctionComponent = () => {
  const router = useRouter();
  const sendPostWithRouter = sendPost(router);
  return (
    <Form
      onSubmit={sendPostWithRouter}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.creationFormInner}>
          <Field validate={composeValidators(required, minLength)} name="title">
            {({ input, meta }) => (
              <>
                <input {...input} className={styles.creationFormInput} placeholder="Title"></input>
                <div className={styles.validationNotice}>{meta.touched && meta.error}</div>
              </>
            )}
          </Field>
          <Field validate={composeValidators(required, minLength)} name="description">
            {({ input, meta }) => (
              <>
                <textarea {...input} className={styles.creationFormDescription} placeholder="Description"></textarea>
                <div className={styles.validationNotice}>{meta.touched && meta.error}</div>
              </>
            )}
          </Field>
          <button type="submit" className={styles.creationFormButton}>
            Post
          </button>
        </form>
      )}
    />
  );
};

export default PostForm;
