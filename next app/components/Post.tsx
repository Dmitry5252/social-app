import React, { FunctionComponent } from "react";
import styles from "../styles/Post.module.scss";
import profileStyles from "../styles/Profile.module.scss";
import Link from "next/link";

export interface IProps {
  post: {
    date: string;
    title: string;
    description: string;
    author: string;
  };
  profileView: boolean;
  postView: boolean;
}

const Post: FunctionComponent<IProps> = ({ post, profileView, postView }: IProps) => {
  const date = new Date(Date.parse(post.date));
  return (
    <div className={profileView ? profileStyles.post : styles.post}>
      <div className={styles.title}>{post.title}</div>
      <div className={`${styles.description} ${postView && styles.postViewDescription}`}>{post.description}</div>
      <Link href={`/profile/${post.author}/${date.toJSON()}`}>
        <div className={styles.author}>
          <div>{`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`}</div>
          <Link href={`/profile/${post.author}`}>
            <a>{post.author}</a>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default Post;
