import React, { ReactElement } from "react";

// Next
import { getSession } from "next-auth/react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Components
import Layout from "@/components/common/Layout";
import JobsContainer from "@/containers/FindJobs/Container";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { authOptions } from "@/server/auth";

// types
import { UserRoleEnum } from "@/types/user";

const Jobs = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
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

export const getServerSideProps = async ({ req, res }: any) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else if (session.user.role !== UserRoleEnum.FREELANCER) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
