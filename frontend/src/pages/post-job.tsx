import React, { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Components
import Layout from "@/components/common/Layout";
import PostJobContainer from "@/containers/PostJob/Container";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { authOptions } from "@/server/auth";

// Types
import { UserRoleEnum } from "@/types/user";

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

export const getServerSideProps = async ({ req, res }: any) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else if (session.user.role !== UserRoleEnum.CLIENT) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
