import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import MessagesContainer from "@/containers/Messages";
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";

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
