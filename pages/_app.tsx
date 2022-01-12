import Head from "next/head";
import type { AppProps } from "next/app";

import GlobalStyle from "@src/common/styles/global.style";
import { ThemeContextProvider } from "@src/common/contexts/theme";
import { AppContextProvider } from "@src/common/contexts/app";
import PostService from "@src/common/services/post.service";

import { BlogLayout } from "@src/components/common/layouts";

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
      <ThemeContextProvider defaultTheme="dark">
        <AppContextProvider postPaths={postPaths}>
          <BlogLayout>
            <Component {...pageProps} />
          </BlogLayout>
        </AppContextProvider>
      </ThemeContextProvider>
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
