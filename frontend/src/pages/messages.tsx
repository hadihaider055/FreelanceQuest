import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import MessagesContainer from "@/containers/Messages";

const Messages = () => {

  return (
    <>
      <Head>
        <title>FreelanceQuest - Messages</title>
      </Head>
      <style global jsx>{`
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

export default Messages;
