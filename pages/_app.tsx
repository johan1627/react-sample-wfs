import "../styles/index.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/d47040cdd7.js"
        crossOrigin="anonymous"
      ></Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
