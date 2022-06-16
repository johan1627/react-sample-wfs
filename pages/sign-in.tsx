import Head from "next/head";
import React from "react";
import SignIn from "../components/molecules/LayoutSign/SignIn";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Wifus | Caring for your health, together</title>
      </Head>
      <SignIn />
    </>
  );
}
