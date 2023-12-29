import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import SubmitProposalContainer from "@/containers/Proposal/SubmitProposalContainer";

const SubmitProposal = () => {

  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Submit Proposal</title>
      </Head>
      <>
        <SubmitProposalContainer />
      </>
    </>
  );
};

SubmitProposal.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SubmitProposal;
