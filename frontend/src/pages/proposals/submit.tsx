import React, { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Utils
import Layout from "@/components/common/Layout";
import SubmitProposalContainer from "@/containers/Proposal/SubmitProposalContainer";

// Utils
import { authOptions } from "@/server/auth";
import useAuth from "@/utils/hooks/useAuth";

// Types
import { UserRoleEnum } from "@/types/user";

const SubmitProposal = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Submit Proposal</title>
      </Head>
      <>
        <SubmitProposalContainer />
      </>
    </>
  );
};

SubmitProposal.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SubmitProposal;

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
