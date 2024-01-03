import { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Components
import SettingsContainer from "@/containers/Account/SettingsContainer";
import Layout from "@/components/common/Layout";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { authOptions } from "@/server/auth";

const AccountSettings = () => {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });
  return (
    <>
      <Head>
        <title>FreelanceQuest - Settings</title>
      </Head>
      <>
        <SettingsContainer />
      </>
    </>
  );
};

export default AccountSettings;

AccountSettings.getLayout = function getLayout(page: ReactElement) {
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
  }

  return { props: {} };
};
