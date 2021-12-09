import React, { useEffect, useState, FunctionComponent } from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/link";
import axios from "../config/axiosInstance";

const Header: FunctionComponent = () => {
  const [links, setLinks] = useState({ firstLink: "/login", firstDescription: "Sign In", secondLink: "/", secondDescription: "Sign Up", showLeftLinks: false });
  useEffect(() => {
    axios.get("profile", { headers: { access_token: document.cookie.slice(13) } }).then(
      (r) => {
        setLinks({ firstLink: "/create", firstDescription: "Create Post", secondLink: `/profile/${r.data.username}`, secondDescription: "My Profile", showLeftLinks: true });
      },
      () => (document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
    );
  }, []);

  return (
    <header className={styles.header}>
      {links.showLeftLinks ? (
        <nav className={styles.buttons}>
          <Link href="/global">
            <a className={styles.button}>Global feed</a>
          </Link>
          <Link href="/main">
            <a className={styles.button}>My feed</a>
          </Link>
        </nav>
      ) : (
        <div className={styles.buttons} />
      )}
      <Link href="/main">
        <a className={styles.title}>My blog site</a>
      </Link>
      <nav className={styles.buttons}>
        <Link href={links.firstLink}>
          <a className={styles.button}>{links.firstDescription}</a>
        </Link>
        <Link href={links.secondLink}>
          <a className={styles.button}>{links.secondDescription}</a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
