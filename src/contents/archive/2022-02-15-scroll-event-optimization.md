---
title: "[JavaScript] 스크롤 이벤트 최적화하기"
date: "2022.02.15"
---

## useIsScrollOnTop 만들며 스크롤 이벤트를 최적화해보자

### Step 1: useScrollY hook을 이용해서 scrollY가 위에있는지 확인

```js
import { useEffect, useState } from "react";

export const useScrollY = (): number => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};
```

```js
const isScrollOnTop: boolean = scrollY === 0;
```

문제: 스크롤을 할떄마다 setScrollY가 실행 -> 매ㅐㅐ번 스크롤을 할때마다 리랜더링 호출

---

### Step 2: useIsScrollOnTop hook -> 스크롤이 위에있는 경우만 렌더리이 하도록

```tsx
import { useEffect, useState } from "react";

/**
 * @param threshold scrollY가 특정 threshold보다 작은 값을 갖는 경우 스크롤이 위에 있다 판단한다.
 */
export const useIsScrollOnTop = (options?: { threshold?: number }): boolean => {
  const [isScrollOnTop, setIsScrollOnTop] = useState<boolean>(true);

  const handleScroll = () => {
    console.log("스크롤");
    const nextIsScrollOnTop = options?.threshold
      ? window.scrollY <= options.threshold
      : window.scrollY === 0;

    if (nextIsScrollOnTop !== isScrollOnTop) {
      setIsScrollOnTop(nextIsScrollOnTop);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollOnTop]); // 의존성 배열에 isScrollOnTop 추가하는 것 잊지말기!

  return isScrollOnTop;
};
```

### Step 3: useIsScrollOnTop lodash throttle

```tsx
import { useEffect, useState, useMemo } from "react";
import { throttle } from "lodash";

/**
 * @param threshold scrollY가 특정 threshold보다 작은 값을 갖는 경우 스크롤이 위에 있다 판단한다.
 */
export const useIsScrollOnTop = (options?: { threshold?: number }): boolean => {
  const [isScrollOnTop, setIsScrollOnTop] = useState<boolean>(true);

  const handleScroll = () => {
    console.log("스크롤");
    const nextIsScrollOnTop = options?.threshold
      ? window.scrollY <= options.threshold
      : window.scrollY === 0;

    if (nextIsScrollOnTop !== isScrollOnTop) {
      setIsScrollOnTop(nextIsScrollOnTop);
    }
  };

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 300); // lodash throttle 적용

    window.addEventListener("scroll", throttledScroll);

    return () => window.removeEventListener("scroll", throttledScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollOnTop]);

  return isScrollOnTop;
};
```

### Step 4: Not throttle, But requestAnimationFrame

https://jbee.io/web/optimize-scroll-event/

https://velog.io/@yrnana/scroll-event%EC%97%90-rAF-throttle%EC%9D%84-%EC%A0%81%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C
