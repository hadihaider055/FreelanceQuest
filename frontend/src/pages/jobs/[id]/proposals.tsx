import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import JobProposalsContainer from "@/containers/Proposal/JobProposals";

const JobProposals = () => {

  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Job Proposals</title>
      </Head>
      <>
        <JobProposalsContainer />
      </>
    </>
  );
};

JobProposals.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default JobProposals;
