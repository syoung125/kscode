import Head from "next/head";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";

import { MainLayout } from "@src/components/layouts";

import { dark } from "@src/common/colors";
import { AppContextProvider } from "@src/common/contexts/app";
import PostService from "@src/common/services/post.service";
import { PostSlug } from "@src/common/types/post.type";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font-size: 1rem;
    width: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none; 
  }
  *,
  ::after,
  ::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export type MyAppProps = AppProps & {
  postSlugs: PostSlug[];
};

function MyApp({ Component, pageProps, postSlugs }: MyAppProps) {
  return (
    <>
      <Head>
        <title>KSCode</title>
        <meta name="description" content="Ko Seoyoung Coding Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={{ colors: dark }}>
        <AppContextProvider postSlugs={postSlugs}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const postSlugs: PostSlug[] = await PostService.getPostSlugList();
  return {
    postSlugs,
  };
};

export default MyApp;
