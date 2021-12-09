import styles from "../../styles/Main.module.scss";
import Post from "../../components/Post";
import Content from "../../components/Content";
import { useRouter } from "next/router";
import fetchData from "../../utils/fetchData";
import deAuth from "../../utils/deAuth";
import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";

interface IPost {
  date: string;
  title: string;
  description: string;
  author: string;
}

interface IProps {
  data: IPost[];
}

const Home = ({ data }: IProps): ReactElement => {
  const router = useRouter();

  deAuth(router, data);
  return (
    <>
      <Content>
        <div className={styles.postList}>
          {data &&
            data.map((element) => {
              return <Post profileView={false} postView={false} key={element.date} post={element} />;
            })}
        </div>
      </Content>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchData(context, "posts");
};
