---
title: "[Next.js] Link란? Link의 장점과 Link의 모든 속성 알아보기 (passhref, shallow  등)"
date: "2022.02.14"
tags:
  - Nextjs
---

## ➡️ Link란?

`next/link`에서 export하여 사용할 수 있는 `Link` 컴포넌트는 클라이언트 사이드 라우팅을 가능하게 해준다.

사용방법

```jsx
<Link href="/">
  <a>Home</a>
</Link>
```

## ➡️ Link의 속성들

링크는 다음과 같은 속성들을 갖는다.

### `href`

> 이동할 경로 또는 URL (required)

Link는 아래 예시처럼 URL객체를 입력받을 수도 있다. URL객체를 입력받는 경우 자동으로 이를 URL 문자열 형식으로 변환해 처리한다.

```jsx
<Link
  href={{
    pathname: "/about",
    query: { name: "test" },
  }}
>
  <a>About us</a>
</Link>
```

### `as`

> 브라우저 URL 표시줄에 표시될 경로

as는 [Next.js 9.5.3 이전 문서](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes)와 같이 동적라우팅을 하는 경우 사용되었다. 하지만 지금은 `/blog/[id].js`와 같은 동적 경로로 이동할 때 `href='/blog/2'`와 같이 id에 직접 들어갈 값을 넣어주면 되므로 as가 자주 사용되지는 않는 것 같다.

### `passHref`

> Link의 자식에게 href속성을 강제로 전달하기 위해 사용한다. (기본값은 false)

#### 주의: `Link`의 자식이 `<a>` 태그를 감싼 커스텀 컴포넌트인 경우

만약 `Link`의 자식이 `<a>` 태그를 감싼 커스텀 컴포넌트라면 반드시 `Link`에 `passHref` 속성을 추가해야한다.

아래 코드와 같이 `styled-components`나 `emotion`같은 CSS-in-JS 라이브러리를 사용했다면 passHref는 필수적으로 추가해야한다.
이 때 passHref를 넘겨주지 않는다면, `<a>` 태그는 href 속성을 갖지 않게 되고 이는 사이트의 접근성과 SEO에 안 좋은 영향을 미친다. `ESLint`의 rule에 `"@next/next/link-passhref":1`을 설정하면 위와 같은 경우 warning을 발생시키도록 설정할 수 있다.

```js
// ...
    return (
        <Link href="/setting" passHref>
            <SettingButton aria-label="환경설정">
                <SettingIcon />
            </SettingButton>
        </Link>
    )
}

const SettingButton = styled.a`
  align-items: center;

  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;

  background-color: ${palette.gray5};

  > svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: ${palette.gray2};
  }
`;
```

#### 주의: `Link`가 함수형 컴포넌트를 감싸는 경우

만약 `Link`가 감싸는 것이 함수형 컴포넌트라면 컴포넌트를 `forwardRef`으로 감싸야 `passHref` 속성이 올바르게 동작한다.

예시코드

```js
const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Click Me
    </a>
  );
});

function Home() {
  return (
    <Link href="/about" passHref>
      <MyButton />
    </Link>
  );
}

export default Home;
```

### `prefetch`

> true인 경우 백그라운드에서 라우팅 할 페이지를 미리 가져온다. (기본값은 true)

`Link`는 뷰포트에 보여질 때 기본적으로 해당 페이지들을 prefetch한다. `prefetch={false}`이더라도 `Link`에 마우스를 올리는 경우 prefetching이 발생한다. 이렇게 페이지를 미리 가져옴으로써 next를 사용한 웹 애플리케이션은 페이지 전환 시 사용자에게 빠르게 페이지를 제공하여 사용자 경험을 향상시킨다. 정적페이지인 경우 JSON 파일과 같은 데이터를 미리 로드시켜 더 빠른 페이지 전환이 가능하게 한다.

(Prefetching는 production에서만 정상적으로 작동하며, development 모드에서는 prefetch가 일어나지 않는다.)

### `replace`

> true인 경우 현재 history 스택에 새로운 url을 추가하는 것이 아닌 현재 history를 replace하도록 동작한다. (기본값은 fasle)

### `scroll`

> true인 경우 페이지 전환 후 스크롤을 페이지 상단으로 이동시킨다. (기본값은 true)

### `shallow`

> true인 경우 getStaticProps, getServerSideProps, getInitialProps 함수를 다시 실행하지 않고 현재의 상태값을 유지한 채 경로 전환이 가능하다. (기본값은 fasle)

(+ [카카오 if 세션 10:08](https://if.kakao.com/session/40)에서 shallow 라우팅 사용을 통한 UX 향상을 확인할 수 있다)

### `locale`

> 활성된 locale이 자동으로 추가된다. local은 다국어 지원을 위해 웹페이지에서 다른 lacale을 제공할 수 있게 해준다. 값이 false인 경우 href의 기본 동작이 비활성화 되므로 href이 local을 포함해야 한다.

next에서는 `next-i18next` 라이브러리를 통해 앱에 다국어를 적용할 수 있다.
출처: [Next app에 다국어 적용하기](https://minhanpark.github.io/today-i-learned/next-i18next/)

예시코드

```jsx
<div>
  <Link href="/" locale="en">
    <button>영어</button>
  </Link>
  <Link href="/" locale="ko">
    <button>한국어</button>
  </Link>
</div>
```

---

### Refs

https://nextjs.org/docs/api-reference/next/link

### 더 읽어볼만한 글

[Next.js Link 태그안에 a tag를 안넣어도 왜 잘 작동될까?](https://uchanlee.dev/nextjs/Why-using-a-tag-in-nextjs-Link/)
