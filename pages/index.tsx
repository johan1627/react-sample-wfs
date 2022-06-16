import type { NextPage } from "next";
import Head from "next/head";
import LayoutSign from "../components/molecules/LayoutSign/LayoutSignIn";
import SignIn from "../components/molecules/LayoutSign/SignIn";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wifus | Caring for your health, together</title>
      </Head>
      <div>This is a home page</div>
    </>
  );
};

export default Home;
