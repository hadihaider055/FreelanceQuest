import { ReactElement } from "react";

// Next
import Head from "next/head";

// Components
import Layout from "@/components/common/Layout";
import HomeContainer from "@/containers/Home";

// Utils
import useAuth from "@/utils/hooks/useAuth";

const Home = () => {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Home</title>
      </Head>

      <HomeContainer />
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
