import styles from "../../styles/Main.module.scss";
import profileStyles from "../../styles/Profile.module.scss";
import Post from "../../components/Post";
import Content from "../../components/Content";
import ProfileForm from "../../components/ProfileForm";
import { ReactElement } from "react";
import fetchData from "../../utils/fetchData";
import React from "react";
import { GetServerSideProps } from "next";

interface IPost {
  date: string;
  title: string;
  description: string;
  author: string;
}

interface IProps {
  data: {
    buttonStatus: boolean;
    username: string;
    bio: string;
    showSubscribe: boolean;
    posts: IPost[];
  };
}

const Home = ({ data }: IProps): ReactElement => {
  return (
    <>
      <Content>
        <div className={profileStyles.profile}>
          <ProfileForm data={data} />
          <div className={profileStyles.profilePostList}>
            <div className={styles.postListInner}>
              {data.posts.map((element) => {
                return <Post key={element.date} profileView={true} postView={false} post={element} />;
              })}
            </div>
          </div>
          <div></div>
        </div>
      </Content>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchData(context, `profile/${context.params.username}`);
};
