import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeContextProvider } from "@src/contexts/theme";
import { AppContextProvider } from "@src/contexts/app";
import * as gtag from "@src/helpers/gtag";
import { Post } from "@src/types/post.type";

import { BlogLayout } from "@src/layouts";

import "@src/styles/global.css";
import "@src/styles/post.css";
import { getPosts } from "@src/apis/getPosts";

export type MyAppProps = AppProps & {
  posts: Post[];
};

function MyApp({ Component, pageProps, posts }: MyAppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

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
        <QueryClientProvider client={queryClient}>
          <AppContextProvider posts={posts}>
            <BlogLayout>
              <Component {...pageProps} />
            </BlogLayout>
          </AppContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeContextProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const posts = await getPosts({ metaOnly: true });
  return {
    posts,
  };
};

export default MyApp;
