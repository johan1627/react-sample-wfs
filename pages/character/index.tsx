import Head from "next/head";
import React from "react";
import LayoutHome from "../../components/molecules/LayoutHome";
import Characters from "../../components/organisms/Characters";
import { GetServerSideProps } from "../../services/data-types";

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

export async function getServerSideProps({ req }: GetServerSideProps) {
  const serverToken = req.cookies["tmp-token"];

  if (!serverToken) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      // user: {},
    },
  };
}
