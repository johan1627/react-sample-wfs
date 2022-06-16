import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/organisms/HomePage";
import { GetServerSideProps } from "../services/data-types";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wifus | Caring for your health, together</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;

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
