---
title: "[GA] Next.js 프로젝트에 구글 애널리틱스 적용하기 (with Typescript)"
date: "2022.03.13"
---

GA 초기설정!!
매번 그만 찾아보고, 이걸로 5분만에 적용하자

## 1. 계정 만들기

우선 사이트에 대한 구글 애널리틱스 계정을 만들어야한다.
(이 부분은 구글링으로 쉽게 찾을 수 있으므로 생략, [이 블로그에서도 확인 가능!](https://lemontia.tistory.com/982))

## 2. 내 사이트에 gtag.js 추가하기

구글링을 하면서 많은 관련 포스트 때문에 원본 문서를 찾기가 힘들었는데, 구글 api를 사용하는 경우 [Google APIs Explorer](https://developers.google.com/apis-explorer/#p)에서 쉽게 검색해 찾을 수 있고, 애널리틱스 시작과 관련된 문서는 [Set up Google Analytics](https://developers.google.com/analytics/devguides/collection) 여기에 있다.

Websites and web apps: https://developers.google.com/analytics/devguides/collection/gtagjs

### 2.1. @types/gtag.js dependencies 추가

타입스크립트를 사용하는 경우 `window.gtag` 사용 시 타입 에러가 발생하는데, `@types/gtag.js`를 설치해주면 여기서 윈도우 타입을 확장하므로 타입 에러가 발생하지 않는다.

그 외 나머지 타입들도 잘 정의되어 있다.

```bash
yarn add -D @types/gtag.js
```

### 2.2. env 파일에 MEASUREMENT ID 저장

`.env` 파일에 `GA_MEASUREMENT_ID` 값에 MEASUREMENT ID를 저장한다.

[MEASUREMENT ID(= traking ID) 찾는 법 영상보기](https://www.youtube.com/watch?v=l2tNKF7Wei8)

### 2.3. gtag utils 추가

`utils/gtag.ts`파일에 다음과 같은 내용을 추가한다.

```js
// utils/gtag.ts
export const GA_TRACKING_ID = process.env.GA_MEASUREMENT_ID || "";

type GTagPageview = {
  url: URL,
  title?: string,
  href?: string,
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, title, href }: GTagPageview) => {
  process.env.NODE_ENV === "production" && // production 일 때만 GA를 측정하기 위함
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
      page_location: href,
    });
};

type GTagEvent = {
  action: string,
  category: string,
  label: string,
  value: number,
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  process.env.NODE_ENV === "production" &&
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
};
```

### 2.4. 전체 사이트 태그 설치: `pages/_document` 파일 수정

우선 [install_the_global_site_tag](https://developers.google.com/analytics/devguides/collection/gtagjs#install_the_global_site_tag) 문서에 나와있는대로 전체 사이트 태그를 설치해야 한다.

nextjs에서는 `<head>`를 `_document`에서 정의하므로 아래 `script` 태그에 해당하는 코드를 `_document`에 작성한다.

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../utils/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### 2.5. pageview 측정: `pages/_app` 파일 수정

마지막으로 방문자가 어느 페이지에 접속했는지 분석하기 위해 util에서 만들었던 `pageview` 함수를 실행한다. 실행 위치는 nextjs에서 모든 페이지에 적용되는 `_app` 파일이다. `routeChangeComplete` 이벤트는 라우터 변경이 완료되었을 때마다 호출되므로 이때 `pageview` 함수를 실행하는 것이 적합하다.

```tsx
import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";

const App = ({ Component, pageProps }: AppProps) => {
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

  return <Component {...pageProps} />;
};

export default App;
```

---

### Refs

https://frontend-digest.com/using-nextjs-with-google-analytics-and-typescript-620ba2359dea
