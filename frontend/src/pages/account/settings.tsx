import { ReactElement } from "react";

// Next
import { Inter } from "next/font/google";
import useAuth from "@/utils/hooks/useAuth";
import { getServerSession } from "next-auth";

// Utils
import { authOptions } from "@/server/auth";

const inter = Inter({ subsets: ["latin"] });

export default function AccountSettings() {
  useAuth({
    redirectTo: "/login",
    redirectOn: "logout",
  });
  return <main>Hello World</main>;
}

AccountSettings.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
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
