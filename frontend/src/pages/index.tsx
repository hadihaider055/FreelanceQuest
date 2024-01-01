import { ReactElement } from "react";

// Components
import Layout from "@/components/common/Layout";

// Utils
import useAuth from "@/utils/hooks/useAuth";

export default function Home() {
  useAuth({
    redirectTo: "",
    redirectOn: "",
  });
  return <main>Hello World</main>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
