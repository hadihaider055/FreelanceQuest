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

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType;
  session: Session | null;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={primaryTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}

// import { ReactElement, ReactNode } from "react";

// // Next
// import { NextPage } from "next";
// import type { AppProps } from "next/app";

// // Next Auth
// import { type Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";

// // Redux
// import { Provider } from "react-redux";

// // Styles
// import "@/styles/globals.scss";

// // Utils
// import store from "@/store";

// type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
//   session: Session | null;
// };

// const App = ({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppPropsWithLayout) => {
//   const getLayout = Component.getLayout ?? ((page) => page);
//   return (
//     <Provider store={store}>
//       <SessionProvider session={session}>
//         {getLayout(<Component {...pageProps} />)}
//       </SessionProvider>
//     </Provider>
//   );
// };
