import Image from "next/image";
import { Inter } from "next/font/google";
import { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <main>Hello World</main>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
