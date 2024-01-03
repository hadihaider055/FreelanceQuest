import React, { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Utils
import Layout from "@/components/common/Layout";
import useAuth from "@/utils/hooks/useAuth";
import ProposalDetailsContainer from "@/containers/Proposal/ProposalDetailsContainer";
import { authOptions } from "@/server/auth";

// Types
import { UserRoleEnum } from "@/types/user";

const ProposalDetails = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Proposal Details</title>
      </Head>
      <>
        <ProposalDetailsContainer />
      </>
    </>
  );
};

ProposalDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProposalDetails;

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
