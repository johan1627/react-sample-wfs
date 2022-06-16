import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/organisms/HomePage";

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
