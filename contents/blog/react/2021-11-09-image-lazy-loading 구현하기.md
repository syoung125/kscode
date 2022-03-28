---
title: "[React] Image Lazy Loading 구현하기"
date: "2021.11.9"
tags:
  - React
---

## Image Lazy Loading이란?

이미지 lazy loading은 아직 화면에 보여지지 않은 이미지들은 로딩 시점을 뒤로 미루어 웹 성능을 최적화하는 기법이다.

## 언제 사용하면 좋을까?

![](https://images.velog.io/images/syoung125/post/98219921-8f21-4b17-8e9d-027083f3bb5c/image.png)

위 이미지는 아이템 리스트이며, 무한스크롤을 통해 아이템을 20개씩 페이지네이션해서 가져오는 상황이다. 하나의 아이템 이미지 용량은 226KB이다. **화면에는 4-6개의 아이템만 보여지는데, 이때 과연 20개의 아이템 모두 큰 용량의 이미지로 불러와야 할 필요성이 있을까? **

이와 같은 상황에서 웹 성능을 최적하기 위해 이미지 lazy loading을 사용하면 좋다.

### lazy loading의 장점

#### 1. 성능 향상

- **웹 사이트의 로딩 시간 감소** : 페이지 초기 로딩 시 필요로 한 이미지의 bytes를 줄일 수 있다. 이는 유저가 사용할 수 있는 제한된 네트워크 대역폭의 경쟁을 줄이는 것을 의미한다. 따라서 디바이스가 다른 리소스를 더 빠르게 처리해서 다운로드 할 수 있고, lazy loading을 쓰지 않는 것에 비해 유저가 페이지를 훨씬 빨리 이용하게 된다.

#### 2. 비용 감소

- **통신 비용 감소** : 앞서 언급했듯이 이미지가 보여지지 않거나 사이즈가 줄어 페이지 내에서 전달할 총 바이트 용량을 줄인다. 이미지 전달 같은 리소스 전달은 주로 전송 바이트 수에 기반하여 청구되는데, 이는 페이지를 이탈하거나 페이지를 스크롤 하지 않고 상단에서만 서비스를 이용하는 유저에게 효과적이다.

## 어떻게 구현할까?

이미지 lazy loading을 구현하는 방법은 여러가지가 있다.
Intersection Observer API 이용하기, image placeholder 사용하기, 이미지 요소의 loading 속성을 이용한 Native Lazy Loading 사용하기 등이 있다.

이 중 내가 사용한 방법은 다음과 같이 Intersection Observer API를 이용하는 것이다.

1. Intersection Observer로 이미지가 viewport 내에 들어왔는지 체크한다.
2. 뷰포트에 보여지지 않으면 저용량의 이미지를 로드하고 뷰포트에 들어오면 고화질 이미지를 로드한다.
   (\* 뷰포트: 현재 디바이스에 보여지는 화면)

## 구현 결과

![](https://images.velog.io/images/syoung125/post/384ec8ee-cd91-490d-8e34-e9669e9b2940/image.png)

크롬 네트워크 설정을 Slow 3G로 변경해 스크롤을 빠르게 내려 테스트 해 보면, 이미지가 뷰포트 내에 있어도 아직 고화질 이미지 로딩이 안되어 뿌옇게 로딩된 저화질 이미지를 볼 수 있다. lazy loading 전의 용량은 200KB가 넘었지만 저화질 이미지의 용량은 고작 2KB 밖에 되지 않는다. 이미지를 아예 보여주지 않거나 skeleton을 보여주는 방식을 사용한다면 0KB로 줄일수 있다.

## React 코드

#### 1. useIsElementInViewport hook

요소가 뷰포트 안에 있는지 여부를 isVisible로 반환한다.

```ts
import { useRef, useState, useEffect } from "react";

export const useIsElementInViewport = (options?: IntersectionObserverInit) => {
  const elementRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    elementRef.current && observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, options]);

  return { elementRef, isVisible };
};
```

#### 2. useIsImgLoaded hook

useIsImgLoaded는 이미지가 뷰포트에 들어온 경우를 이를 로딩되었다고 판단하여 isLoaded으로 boolean 값을 반환한다.

이 때 useIsElementInViewport에 rootMargin 옵션을 주어 이미지가 뷰포트 하단 500px 영역에 들어왔을 때부터 isVisible을 true로 반환하도록 한다.

lazy는 이미지 lazy loading 여부를 나타낸다.
false이면 isLoaded는 항상 true를 반환한다.

```ts
import { useEffect, useState } from "react";

import { useIsElementInViewport } from "@common/hooks";

export const useIsImgLoaded = (lazy: boolean) => {
  const { elementRef, isVisible } = useIsElementInViewport({
    rootMargin: "0px 0px 500px 0px",
  });
  const [isLoaded, setIsLoaded] = useState(!lazy);

  useEffect(() => {
    if (isLoaded || !isVisible) {
      return;
    }

    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return { elementRef, isLoaded };
};
```

#### 3. Img 컴포넌트

다음은 Img 컴포넌트에서 lazy loading에 필요한 부분만을 간추린 코드이다.

내가 기존 Img 컴포넌트에서 추가한 사항은 2가지 이다.

1. 이미지 lazy loading을 선택적으로 하기 위해 lazy loading 여부를 나타내는 lazy prop을 추가했다.
2. useIsImgLoaded에서 isLoaded true를 반환하면 width에 맞는 정상적인 이미지 크기를 가진 이미지를 로드하고, false이면 가장 작은 이미지 사이즈로 지정한 크기가 50인 저화질 이미지를 로드한다.

```tsx
import { useIsImgLoaded } from "./hooks";
import { sizify } from "./img.helpers";
import { imgWidth2WSize } from "./img.types";

const SMALLEST_IMG_W_SIZE = 50;

export type ImgProps = {
  src: string;
  alt: string;
  width: number | "100%";
  height: number | "100%";

  /** lazy loading 여부 */
  lazy?: boolean;
};

export default function Img(props: ImgProps) {
  const { src, alt, width, height, lazy } = props;

  const { elementRef, isLoaded } = useIsImgLoaded(lazy);

  return (
    <img
      ref={elementRef}
      alt={alt}
      src={sizify(src, isLoaded ? imgWidth2WSize(width) : SMALLEST_IMG_W_SIZE)}
      style={{ width, height }}
    />
  );
}
```

(회사 백엔드 api에서는 이미지 url뒤에 w query로 원하는 이미지 크기를 갖는 이미지를 불러올 수 있다. https://abcd.com/image.jpg?w=50 이라 설정하면 사이즈가 50인 이미지를 가져오고, https://abcd.com/image.jpg?w=500이라하면 사이즈가 500인 이미지를 가져온다. sizify와 imgWidth2WSize는 이러한 url 생성을 위한 함수이다.)

---

## Refs

https://helloinyong.tistory.com/297
