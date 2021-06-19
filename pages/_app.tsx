import Head from "next/head";
import type { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import {
  GHeader,
  GActivityBar,
  GSideBar,
  GFooter,
  GMain,
} from "@src/component/main-layout";

import { AppContextProvider } from "@src/contexts/app";
import { getPostSlugs } from "@src/api/posts";

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
  postSlugs: string[];
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
      <AppContextProvider postSlugs={postSlugs}>
        <Wrapper>
          <GHeader />
          <MainWrapper>
            <GActivityBar />
            <GSideBar />
            <GMain>
              <Component {...pageProps} />
            </GMain>
          </MainWrapper>
          <GFooter />
        </Wrapper>
      </AppContextProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const postSlugs = await getPostSlugs();
  return {
    postSlugs,
  };
};

export default MyApp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  background-color: rgb(30, 30, 30);
  color: white;
`;

const MainWrapper = styled.main`
  width: 100%;

  display: flex;
  flex-direction: row;

  flex: 1;
`;
