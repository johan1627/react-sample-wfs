import Head from "next/head";
import React from "react";
import LayoutHome from "../../components/molecules/LayoutHome";
import Characters from "../../components/organisms/Characters";

export default function index() {
  return (
    <>
      <Head>
        <title>Wifus | Caring for your health, together</title>
      </Head>
      <LayoutHome>
        <Characters />
      </LayoutHome>
    </>
  );
}
