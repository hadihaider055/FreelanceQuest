import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import ProposalContainer from "@/containers/Proposal/ProposalContainer";

const Proposals = () => {

  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Proposals</title>
      </Head>
      <>
        <ProposalContainer />
      </>
    </>
  );
};

Proposals.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Proposals;
