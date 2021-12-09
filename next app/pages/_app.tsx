import React, { ReactElement } from "react";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsType): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
