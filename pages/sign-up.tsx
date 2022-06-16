import Head from "next/head";
import React from "react";
import SignUp from "../components/organisms/SignPage/SignUp";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Wifus | Caring for your health, together</title>
      </Head>
      <SignUp />
    </>
  );
}
