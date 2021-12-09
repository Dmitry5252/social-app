import { useRouter } from "next/router";
import { useEffect, FunctionComponent } from "react";
import fetchData from "../../utils/fetchData";
import deAuth from "../../utils/deAuth";
import { GetServerSideProps } from "next";
import React from "react";

interface IProps {
  data: { username: string };
}

const Home: FunctionComponent<IProps> = ({ data }: IProps) => {
  const router = useRouter();
  deAuth(router, data);
  useEffect(() => {
    router.push(`/profile/${data.username}`);
  }, []);
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchData(context, "profile");
};
