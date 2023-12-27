import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Components
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import FreelancersContainer from "@/containers/Freelancers";

const Freelancers = () => {
  useAuth({ redirectTo: "/login", redirectOn: "logout" });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Freelancers</title>
      </Head>
      <>
        <FreelancersContainer />
      </>
    </>
  );
};

export default Freelancers;

Freelancers.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
