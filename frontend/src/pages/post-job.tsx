import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Components
import Layout from "@/components/common/Layout";
import PostJobContainer from "@/containers/PostJob/Container";

// Utils
import useAuth from "@/utils/hooks/useAuth";

const PostJob = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Post a Job</title>
      </Head>

      <PostJobContainer />
    </>
  );
};

export default PostJob;

PostJob.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
