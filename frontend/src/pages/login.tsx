import React, { ReactElement, useEffect } from "react";

// Next
import Head from "next/head";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import LoginContainer from "@/containers/Login";
import { useSession } from "next-auth/react";

const Login = () => {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });

  const session = useSession();

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>FreelanceQuest - Login</title>
      </Head>
      <>
        <LoginContainer />
      </>
    </>
  );
};

export default Login;

// Login.getLayout = function getLayout(page: ReactElement) {
//   return <>{page}</>;
// };
