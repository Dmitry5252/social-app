import { useEffect } from "react";
import { NextRouter } from "next/router";

const deAuth = (router: NextRouter, data: unknown): void => {
  if (!data) {
    useEffect(() => {
      router.push("/login");
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }, []);
  }
};

export default deAuth;
