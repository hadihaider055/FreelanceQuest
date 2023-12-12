import Image from "next/image";
import { Inter } from "next/font/google";
import { ReactElement } from "react";
import useAuth from "@/utils/hooks/useAuth";

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