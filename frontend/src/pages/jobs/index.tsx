import React, { ReactElement } from "react";

// Next
import { getSession } from "next-auth/react";

// Next
import Head from "next/head";

// Components
import Layout from "@/components/common/Layout";
import JobsContainer from "@/containers/FindJobs/Container";

// Utils
import useAuth from "@/utils/hooks/useAuth";

const Jobs = () => {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Jobs</title>
      </Head>

      <JobsContainer />
    </>
  );
};

export default Jobs;

Jobs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
