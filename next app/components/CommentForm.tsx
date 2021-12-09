import React, { FunctionComponent } from "react";
import { NextRouter, useRouter } from "next/router";
import axios from "../config/axiosInstance";
import { Form, Field } from "react-final-form";
import styles from "../styles/CommentForm.module.scss";

interface IComment {
  text: string;
  author: string;
  date: string;
}

interface IPost {
  date: string;
  title: string;
  description: string;
  author: string;
  comments: IComment[];
}

interface IProps {
  data: IPost;
}

const sendComment =
  (router: NextRouter, data: IPost) =>
  ({ text }: { text: string }) => {
    if (!document.cookie) {
      alert("You are not logged in.");
    } else if (text.length < 3) {
      return { text: "Comment length must be at least 3 symbols." };
    } else {
      axios.post(`posts/${data.author}/${data.date}`, { text }, { headers: { access_token: document.cookie.slice(13) } }).then(() => router.push(`/profile/${data.author}/${data.date}`));
    }
  };

const CommentForm: FunctionComponent<IProps> = ({ data }: IProps) => {
  const router = useRouter();
  const sendCommentWithRouter = sendComment(router, data);
  return (
    <Form
      onSubmit={sendCommentWithRouter}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.creationFormInner}>
          <div className={styles.commentEdit}>
            <Field name="text">
              {({ meta, input }) => (
                <>
                  <textarea {...input} className={styles.commentEditInner}></textarea>
                  <div className={styles.validationNotice}>{meta.submitError}</div>
                </>
              )}
            </Field>
            <button className={styles.commentButton} type="submit">
              Leave a comment
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default CommentForm;
