import { ReactElement, ReactNode, useEffect, useState } from "react";

// Next
import { NextComponentType, NextPage } from "next";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

// Lottie
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../../public/images/loader.json";

// Next Auth
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// Redux
import { Provider } from "react-redux";

// Styles
import "@/styles/main.scss";
import { ThemeProvider } from "styled-components";

// Utils
import store from "@/store";
import { primaryTheme } from "@/config/theme";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  const avoidLoading = ["/jobs", "/proposals", "/messages"];

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath &&
        !avoidLoading.includes(router.pathname) &&
        setLoading(true);
    };

    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Player
          autoplay
          loop
          src={Loader}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={primaryTheme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
