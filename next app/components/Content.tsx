import React, { FunctionComponent, ReactElement } from "react";
import styles from "../styles/Content.module.scss";
import Header from "./Header";

interface IProps {
  children: ReactElement[] | ReactElement;
}

const Content: FunctionComponent<IProps> = ({ children }: IProps) => {
  return (
    <div>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Content;
