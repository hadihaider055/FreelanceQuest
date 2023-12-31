import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import ProposalDetailsContainer from "@/containers/Proposal/ProposalDetailsContainer";

const ProposalDetails = () => {

  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Proposal Details</title>
      </Head>
      <>
        <ProposalDetailsContainer />
      </>
    </>
  );
};

ProposalDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalDetails;
