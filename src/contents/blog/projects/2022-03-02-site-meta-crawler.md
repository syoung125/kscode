---
title: "[토이프로젝트] site-info-crawler : 사이트 메타데이터 크롤러 만들고 배포하기!"
date: "2022.03.02"
---

## Intro : 어떤 프로젝트이며 왜 만들었을까?

채팅앱과 비슷한 사이드 프로젝트를 진행하며 필요성을 느껴 개발헀다.
추가 해야 할 기능은 카카오 채팅방에서 링크를 보냈을 때와 같이 보낸 링크에 대한 이미지, 제목, 내용 등 기본정보를 출력하는 기능이였다.
이를 위해 site-info-crawler라는 이름의 간단한 크롤러를 만들었다.

github: https://github.com/syoung125/site-info-crawler

## Step 0 : 사용할 라이브러리 정하기

크롤러는 자바스크립트를 이욯하여 만들었다. (with 타입스크립트)

#### Dependencies

1. axios

   - request를 사용해 html을 가져오는 코드도 많이 보았는데, request는 현재 deprecated 되었다. 이를 대체하는 라이브러리는 [여기(Alternative libraries to request)](https://github.com/request/request/issues/3143)에서 확인할 수 있다.
   - axios는 브라우저와 nodejs 환경에 관계없이 사용할 수 있는 라이브러리이고, 유지보수가 잘 되고 있는 라이브러리이다. javascript의 fetch와 유사한데 응답을 json으로 자동으로 변환해주기도 하고, timeout을 설정할 수도 있어 더 사용하기 편리하다.

2. cheerio
   - cheerio 또한 jsdom, parse5와 같은 유사한 라이브러리가 많다. 참고: [cheerio-vs-htmlparser2-vs-jsdom-vs-parse5-vs-scraper](https://www.npmtrends.com/cheerio-vs-htmlparser2-vs-jsdom-vs-parse5-vs-scraper)
   - 다운로드 수는 cheerio < jsdom < parse5 이지만 star수는 cheerio가 가장 많다.
   - cheerio를 선택한 이유는 두 가지이다. 속도와 깔끔한 사용방법이다. cheerio [이슈](https://github.com/cheeriojs/cheerio/issues/700)에 따르면 cheerio가 다른 라이브러리들 보다 훨씬 빠르다는 것을 알 수 있다. 또 사용은 jquery와 유사하므로 개인적으로 코드가 더 깔끔하다고 생각한다.

## step 1 : 배포는 어떻게?

배포는 Vercel serverless function을 사용했다.

요금 정보 : https://vercel.com/docs/concepts/limits/overview

#### serverless란?

https://velopert.com/3543 벨로퍼트님의 블로그에 정리가 잘되어있으니 이 글을 먼저 확인하자!

요약해서 말하면 서버가 없는 것처럼 동작한다는 것이고, “서버의 존재”에 대해서 신경쓰지 않아도 된다는 것이다. serverless는 BaaS(Backend as a Service)와 FaaS(Function as a Service)로 나눠질 수 있는데 그중 Vercel serverless function은 FaaS에 해당한다.

#### FaaS란?

FaaS는 프로젝트를 여러개의 함수로 쪼개서 (혹은 한개의 함수로 만들어서), 매우 거대하고 분산된 컴퓨팅 자원에 준비해둔 함수를 등록하고, **이 함수들이 실행되는 횟수 (그리고 실행된 시간) 만큼 비용을 내는 방식**을 말한다. 따라서 크롤러나 주기적인 요청 보낼 때 용이하다. AWS Lambda가 바로 AWS에서 제공하는 FaaS다.

## step 2 : 우선 주요한 기능만 만들어 배포를 해보았다.

아래 링크를 참고해서 구현, 배포했는데 생각보다 아주 간단했다!

https://vercel.com/docs/concepts/functions/supported-languages#node.js
https://vercel.com/docs/concepts/functions/serverless-functions

- 프로젝트에 `/api`폴더(nextjs를 사용한다면 `/page/api`)를 생성하고 파일을 생성하여 `default`로 `export`하면 vercel은 이를 하나의 serverless function로 판단한다.
- util같은 함수를 api폴더에 넣고 싶은데 서버리스로 동작하지 않게 하려면 앞에 파일이름 앞에 \_을 붙여야한다. ( ex) `/api/_utils.js` )
- typescript를 사용하면 `@vercel/node`를 dependency로 설치하여 타입을 사용한다.

아래는 사이트의 title, imageUrl, description을 크롤링하는 코드다.

페이스북에서 개발한 Open Graph 태그는 게시글을 공유하거나 링크를 가져올때 웹페이지의 제목, 이미지, 내용 등을 불러올 수 있도록 메타데이터가 사용되는 방식을 표준화 한 것이다. 따라서 og태그의 데이터를 우선적으로 크롤링한다.

```ts
/** /api/info.ts **/
import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import cheerio from "cheerio";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { url } = req.query;

    const { data: html } = await axios.get(url, {
      timeout: 10000,
    });
    const $ = await cheerio.load(html);

    const title = $('meta[property="og:title"]').attr("content");
    const imageUrl = $('meta[property="og:image"]').attr("content");
    const description = $('meta[property="og:description"]').attr("content");

    const result = {
      title,
      imageUrl,
      description,
    };

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send({ message: err?.message || "" });
  }
};
```

이제 이 코드를 github에 올린 후 vercel에 연결시켜주면 된다.
(물론 package.json 등 기본 설정 필요)

#### 실행 결과

https://[배포 도메인]/api/info?url=https://www.naver.com/

```json
{
  "title": "네이버",
  "imageUrl": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
  "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
}
```

#### 로컬에서 테스트

```bash
vercel  dev
```

명령어를 통해 로컬에서도 테스트할 수 있다

http://localhost:3000/api/info?url=https://www.naver.com/

## step 3 : 모듈화 & Open Graph 태그가 없는 경우 대응

크롤링 코드는 `SiteInfoCrawler` 클래스를 생성하여 모듈화하였고, 인스턴스에서 `crawl()` 함수를 호출하여 크롤링을 한다.

모든 웹사이트에 Open Graph 태그가 있는 것은 아니다. 따라서 없다면 twitter 태그를, 이미지의 경우 페이지에서 가장 첫번째 이미지를 크롤링한다.
(getTitle, getImageUrl, getDescription 함수 참고)

```ts
/** /api/info.ts **/
import type { VercelRequest, VercelResponse } from "@vercel/node";

import SiteInfoCrawler from "../utils/site-info-crawler";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { url } = req.query;

    const crawler = new SiteInfoCrawler(url.toString());
    const { result } = (await crawler.crawl()).formatImageUrl();

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send({ message: err?.message || "" });
  }
};
```

```ts
/** /utils/site-info-crawler.ts **/
import cheerio, { CheerioAPI } from "cheerio";
import { correctImageUrl } from "./correct";

import { requestHTML } from "./request";

type InfoResult = {
  title: string;
  imageUrl?: string;
  description?: string;
};

export default class SiteInfoCrawler {
  public url: string;
  public hostName: string;

  public result: InfoResult = {
    title: "",
    imageUrl: undefined,
    description: undefined,
  };

  constructor(url: string) {
    this.url = encodeURI(url);
    this.hostName = new URL(url).hostname;
  }

  public async crawl() {
    const html = await requestHTML(this.url);
    const $ = await cheerio.load(html);

    const title = this.getTitle($);
    const imageUrl = this.getImgaeUrl($);
    const description = this.getDescription($);

    this.result = {
      title,
      imageUrl,
      description,
    };

    return this;
  }

  public getTitle($: CheerioAPI) {
    return (
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("h1").text()
    );
  }

  public getImgaeUrl($: CheerioAPI) {
    return (
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $("img").attr("src")
    );
  }

  public getDescription($: CheerioAPI) {
    return (
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content")
    );
  }

  public formatImageUrl() {
    const { imageUrl } = this.result;

    if (!imageUrl) {
      return this;
    }

    this.result = {
      ...this.result,
      imageUrl: decodeURI(correctImageUrl(imageUrl, this.hostName)),
    };

    return this;
  }
}
```

추가적으로, 이미지 경로가 상대 경로인 경우가 있어 `correctImageUrl`이라는 함수를 만들어 알맞게 formatting을 해준다.

```ts
export const correctImageUrl = (imageUrl: string, hostname: string): string => {
  if (imageUrl.indexOf("//") === 0) {
    return `https:${imageUrl}`;
  }
  if (imageUrl[0] === "/") {
    return `https://${hostname}${imageUrl}`;
  }
  return imageUrl;
};
```

## 느낀점

전 회사에서 근무할 때 아이템 크롤러, 배송 추적 크롤러 등 여러 크롤링 프로젝트에 기여한 경험이 있다. 하지만, 내가 한 일은 이미 구축된 크롤러에 정해진 방법으로 크롤러를 추가하는 것이였고, 전반적인 코드가 왜 이렇게 작성되었고, 어떻게 배포 되었는지 등은 두루뭉술하게만 이해하고 넘어갔다.

하지만 이번 프로젝트를 통해 serverless가 무엇인지, 어떻게 severless function을 vercel로 배포하는지 등에 대해 알게되었다. 또 생각보다 크롤러 만드는 것이 어렵지 않아 새로운 프로젝트를 시작하는데 좀 더 자신감도 생겼다.
