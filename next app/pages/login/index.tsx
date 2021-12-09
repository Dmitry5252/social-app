import styles from "../../styles/LoginForm.module.scss";
import Content from "../../components/Content";
import LoginForm from "../../components/LoginForm";
import { useRouter } from "next/router";
import { useEffect, ReactElement } from "react";
import React from "react";

const Home = (): ReactElement => {
  const router = useRouter();
  useEffect(() => {
    if (document.cookie) {
      router.push("/main");
    }
  }, []);

  return (
    <>
      <Content>
        <div className={styles.main}>
          <div className={styles.registrationForm}>
            <LoginForm />
          </div>
        </div>
      </Content>
    </>
  );
};

export default Home;
