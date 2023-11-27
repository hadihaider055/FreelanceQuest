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
      <>
        <MessagesContainer />
      </>
    </>
  );
};

export default Messages;
