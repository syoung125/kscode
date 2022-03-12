import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ThemeContextProvider } from "@src/common/contexts/theme";
import { AppContextProvider } from "@src/common/contexts/app";
import * as gtag from "@src/common/helpers/gtag";
import PostService from "@src/common/services/post.service";
import { Post } from "@src/common/types/post.type";

import { BlogLayout } from "@src/components/common/layouts";

import "@src/common/styles/global.css";
import "@src/common/styles/post.css";

export type MyAppProps = AppProps & {
  posts: Post[];
};

function MyApp({ Component, pageProps, posts }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      const { title } = window.document;
      const { href } = window.location;

      gtag.pageview({ url, title, href });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{`KSCode | Seoyoung's Tech Blog`}</title>
        <meta name="description" content="Ko Seoyoung Tech Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContextProvider defaultTheme="dark">
        <AppContextProvider posts={posts}>
          <BlogLayout>
            <Component {...pageProps} />
          </BlogLayout>
        </AppContextProvider>
      </ThemeContextProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const posts = await PostService.getPosts();
  return {
    posts,
  };
};

export default MyApp;
