import React, { FunctionComponent } from "react";
import styles from "../styles/Post.module.scss";
import Link from "next/link";

export interface IProps {
  comment: {
    text: string;
    date: string;
    author: string;
  };
}

const Post: FunctionComponent<IProps> = ({ comment }: IProps) => {
  const date = new Date(Date.parse(comment.date));
  return (
    <div className={styles.comment}>
      <div className={styles.text}>{comment.text}</div>
      <div>
        <a className={styles.commentAuthor}>
          <div>{`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`}</div>
          <Link href={`/profile/${comment.author}`}>
            <a>{comment.author}</a>
          </Link>
        </a>
      </div>
    </div>
  );
};

export default Post;
