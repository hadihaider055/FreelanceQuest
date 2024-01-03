import React, { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Utils
import MessagesContainer from "@/containers/Messages/Container";
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import { authOptions } from "@/server/auth";

const Messages = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });
  return (
    <>
      <Head>
        <title>FreelanceQuest - Messages</title>
      </Head>
      <style global jsx>
        {`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}
      </style>
      <>
        <MessagesContainer />
      </>
    </>
  );
};

Messages.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Messages;

export const getServerSideProps = async ({ req, res }: any) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
