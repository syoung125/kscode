import Head from "next/head";
import type { AppProps } from "next/app";
import Reset from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";

import {
  GHeader,
  GActivityBar,
  GSideBar,
  GFooter,
} from "@src/component/common/layouts/main-layout";

import { getPostSlugs, PostSlugType } from "@src/api/posts";

const GlobalStyle = createGlobalStyle`
  ${Reset}
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export type MyAppProps = {
  postSlugs: PostSlugType[];
};

function MyApp({ Component, pageProps, postSlugs }: AppProps & MyAppProps) {
  return (
    <>
      <Head>
        <title>KSCode</title>
        <meta name="description" content="Ko Seoyoung Coding Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Wrapper>
        <GHeader />
        <MainWrapper>
          <GActivityBar />
          <GSideBar postSlugs={postSlugs} />
          <ContentWrapper>
            <Component {...pageProps} />
          </ContentWrapper>
        </MainWrapper>
        <GFooter />
      </Wrapper>
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

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;

  flex: 1;
`;

const ContentWrapper = styled.div``;
