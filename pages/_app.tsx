import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@src/common/styles/global.style";
import { dark } from "@src/common/themes";
import { AppContextProvider } from "@src/common/contexts/app";
import PostService from "@src/common/services/post.service";

export type MyAppProps = AppProps & {
  postPaths: string[];
};

function MyApp({ Component, pageProps, postPaths }: MyAppProps) {
  return (
    <>
      <Head>
        <title>{`KSCode | Seoyoung's Tech Blog`}</title>
        <meta name="description" content="Ko Seoyoung Tech Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={{ colors: dark }}>
        <AppContextProvider postPaths={postPaths}>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const postPaths: string[] = await PostService.getPostPaths();
  return {
    postPaths,
  };
};

export default MyApp;
