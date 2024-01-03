import React, { ReactElement } from "react";

// Next
import Head from "next/head";
import { getServerSession } from "next-auth";

// Lottie
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../../../public/images/loader.json";

// Components
import Layout from "@/components/common/Layout";
import ProfileContainer from "@/containers/Account/ProfileContainer";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { authOptions } from "@/server/auth";
import { useAppSelector } from "@/utils/hooks/store";
import { UserRoleEnum } from "@/types/user";

const Profile = () => {
  useAuth({ redirectTo: "/login", redirectOn: "logout" });

  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <Head>
        <title>FreelanceQuest - Profile</title>
      </Head>
      <>
        {user ? (
          <ProfileContainer />
        ) : (
          <Player
            autoplay
            loop
            src={Loader}
            style={{ height: "300px", width: "300px" }}
          />
        )}
      </>
    </>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
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
  } else if (
    session.user.role === UserRoleEnum.FREELANCER &&
    !session.user.title
  ) {
    return {
      redirect: {
        destination: "/jobs",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
