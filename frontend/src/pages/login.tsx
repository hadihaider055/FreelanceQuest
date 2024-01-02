import React from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Utils
import LoginContainer from "@/containers/Login";
import { authOptions } from "@/server/auth";

const Login = () => {
  return (
    <>
      <Head>
        <title>FreelanceQuest - Login</title>
      </Head>
      <>
        <LoginContainer />
      </>
    </>
  );
};

export default Login;

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
