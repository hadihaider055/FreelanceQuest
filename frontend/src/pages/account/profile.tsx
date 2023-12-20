import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Components
import Layout from "@/components/common/Layout";
import ProfileContainer from "@/containers/Account/ProfileContainer";

const Profile = () => {
  return (
    <>
      <Head>
        <title>FreelanceQuest - Profile</title>
      </Head>
      <>
        <ProfileContainer />
      </>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
