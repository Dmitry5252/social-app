import Content from "../../components/Content";
import PostForm from "../../components/PostForm";
import { useRouter } from "next/router";
import deAuth from "../../utils/deAuth";
import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";

interface IProps {
  data: boolean | string;
}

const Home = ({ data }: IProps): ReactElement => {
  const router = useRouter();
  deAuth(router, data);
  return (
    <>
      <Content>
        <PostForm />
      </Content>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.headers.cookie) {
    return {
      props: { data: false },
    };
  } else {
    return {
      props: { data: context.req.headers.cookie.slice(13) },
    };
  }
};
