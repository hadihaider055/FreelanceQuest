import { ReactElement, ReactNode } from "react";

// Next
import { NextComponentType, NextPage } from "next";
import type { AppProps } from "next/app";

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
  const getLayout = Component.getLayout ?? ((page) => page);

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
