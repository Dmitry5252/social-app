import styles from "../../../styles/Post.module.scss";
import Post from "../../../components/Post";
import Comment from "../../../components/Comment";
import Content from "../../../components/Content";
import { useRouter } from "next/router";
import fetchData from "../../../utils/fetchData";
import deAuth from "../../../utils/deAuth";
import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import CommentForm from "../../../components/CommentForm";

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

const Home = ({ data }: IProps): ReactElement => {
  const router = useRouter();

  deAuth(router, data);
  if (!data) {
    data = undefined;
  }
  return (
    <>
      <Content>
        <Post profileView={false} postView={true} post={data} />
        <div>
          <CommentForm data={data} />
        </div>
        {data.comments[0] ? (
          <div className={styles.commentsList}>
            <div className={styles.postListInner}>
              {data.comments.map((element) => {
                return <Comment key={element.date} comment={element} />;
              })}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Content>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchData(context, `posts/${context.params.username}/${context.params.post}`);
};
