import React, { ReactElement, useEffect } from "react";

// Next
import Head from "next/head";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import { useSession } from "next-auth/react";
import FreelancerSignupContainer from "@/containers/FreelancerSignup";

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
        <FreelancerSignupContainer />
      </>
    </>
  );
};

export default FreelancerSignup;

// Login.getLayout = function getLayout(page: ReactElement) {
//   return <>{page}</>;
// };
