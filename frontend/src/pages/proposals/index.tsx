import React, { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Components
import ProposalContainer from "@/containers/Proposal/ProposalContainer";
import Layout from "@/components/common/Layout";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { authOptions } from "@/server/auth";
import { UserRoleEnum } from "@/types/user";

const Proposals = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });

  return (
    <>
      <Head>
        <title>FreelanceQuest - Proposals</title>
      </Head>
      <>
        <ProposalContainer />
      </>
    </>
  );
};

Proposals.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Proposals;

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
