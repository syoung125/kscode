import Head from "next/head";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${Reset}
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>KSCode</title>
        <meta name="description" content="Ko Seoyoung Coding Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
