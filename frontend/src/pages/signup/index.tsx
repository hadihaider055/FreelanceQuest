import React from "react";

// Next
import Head from "next/head";

// Components
import SignupContainer from "@/containers/Signup";

// Utils
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const FreelancerSignup = () => {
  return (
    <>
      <Head>
        <title>FreelanceQuest - Signup</title>
      </Head>
      <>
        <SignupContainer />
      </>
    </>
  );
};

export default FreelancerSignup;

export const getServerSideProps = async ({ req, res }: any) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/account/profile",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
