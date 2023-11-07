import React, { ReactElement } from "react";

// Next
import Head from "next/head";

// Utils
import useAuth from "@/utils/hooks/useAuth";
import LoginContainer from "@/containers/Login";

const Login = () => {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });

  return (
    <>
      <Head>
        <title>Tiedup - Login</title>
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
