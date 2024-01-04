import React from "react";

// Next
import Head from "next/head";
import Layout from "@/components/common/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { UserRoleEnum } from "@/types/user";
import MyJobsContainer from "@/containers/MyJobs";
import useAuth from "@/utils/hooks/useAuth";

const MyJobs = () => {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });
  return (
    <>
      <Head>
        <title>FreelanceQuest - My Jobs</title>
      </Head>

      <MyJobsContainer />
    </>
  );
};

export default MyJobs;

MyJobs.getLayout = function getLayout(page: ReactElement) {
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
