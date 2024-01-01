import React, { ReactElement, useEffect } from "react";

// Next
import Head from "next/head";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { useSession } from "next-auth/react";
import SignupContainer from "@/containers/Signup";

const FreelancerSignup = () => {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });

  const session = useSession();

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>FreelanceQuest - Signup</title>
      </Head>
      <>
        <SignupContainer />
      </>
    </>
  );
};

export default FreelancerSignup;

// Login.getLayout = function getLayout(page: ReactElement) {
//   return <>{page}</>;
// };
