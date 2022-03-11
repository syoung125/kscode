---
title: "[JavaScript] requestFrameAnimation 이란?"
date: "2022.03.07"
---

## requestAnimationFrame 이란?

requestFrameAnimation은 canvas나 WebGL 등에서 애내메이션을 구현할 때 주로 사용된다.

애니메이션을 구현하기 위해서는 time loop를 사용해야 하는데, requestFrameAnimation 이전에는 time loop를 구현하기 위해 setInterval 함수를 사용했다.
예를들어 초당 60프레임을 목표로 한다면 이런식으로 1/60초마다 애니메이션을 실행하는 코드를 작성했다.

```js
setInterval(function () {
  // animiate something
}, 1000 / 60);
```

requestFrameAnimation는 setInterval과 비슷하지만 브라우저에 더욱 최적화된 함수다.

#### MDN 정의 | Window.requestAnimationFrame()

requestAnimationFrame 함수는 WebAPI의 비동기 함수이며, CSS transition으로 처리하기 어려운 애니메이션이나 HTML5의 Canvas, SVG 등의 애니메이션 구현을 위해 사용되는 함수다.
requestAnimationFrame 함수는 브라우저에 애니메이션을 수행하고 싶다고 알리고, 브라우저가 다음 **repaint를 하기 전**에 애니메이션을 업데이트 하기 위해 지정된 함수를 호출하도록 요청한다.

#### requestAnimationFrame의 장점

- 브라우저가 애니메이션을 최적화할 수 있기 때문에 더 매끄러운 애니메이션이 가능하다.
- 페이지가 비활성 상태이면 (예를들어 브라우저에서 선택된 탭이 아닌 경우) 페이지의 화면 그리기 작업도 브라우저에 의해 일시 중지되므로 브라우저를 따르는 requestAnimationFrame도 렌더링을 중지한다. 따라서 CPU 리소스와 배터리 수명을 낭비하지 않게된다 (반면, setInterval은 비활성 상태여도 백그라운드에서 계속 실행됨)
- battery-friendly animations

## requestAnimationFrame 사용방법

```
window.requestAnimationFrame(callback);
```

#### 매개변수

매개변수는 callback 하나이며 이는 다음 repaint를 위해 애니메이션을 업데이트해야 할 때 호출할 함수다. 이 callback에는 [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) 타입의 하나의 인수가 전달되고, 이 값은 performance.now()의 반환값과 유사하다.

Date.now()와 같은 다른 타이밍 데이터와 달리 performance.now()가 반환하는 DOMHighResTimeStamp의 단위는 1 밀리초로 제한되지 않고, 시간을 최대 마이크로 초 정밀도의 부동소수점 숫자로 나타낸다. 즉, 더욱 정밀한 측정이 필요할 때 사용된다.

#### 반환값

long integer 값을 반환하며, 이는 콜백 목록의 항목을 고유하게 식별하기 위한 **request id**다.

#### 간단한 예시

이렇게 사용할 수 있으며 cancelAnimationFrame에 request id를 넘겨주면 해당 애니메이션을 취소할 수 있다.

<iframe height="300" style="width: 100%;" scrolling="no" title="RAF Simple Example" src="https://codepen.io/syoung125/embed/QWaLEpJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/syoung125/pen/QWaLEpJ">
  RAF Simple Example</a> by Ko Seoyoung (<a href="https://codepen.io/syoung125">@syoung125</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

## 리액트에서 사용해보기

requestAnimationFrame는 보통 재귀함수 처럼 사용한다.

#### 코드

requestAnimationFrame 콜백함수가 인자로 받는 DOMHighResTimeStamp 타입의 time을 매 프레임마다 출력한다.

```tsx
import { useEffect, useRef, useState } from "react";

export default function Waves() {
  const requestRef = useRef<number>(0);

  const [time, setTime] = useState(0);

  const animate = (t: DOMHighResTimeStamp) => {
    // 여기에 원하는 애니메이션 수행 코드 작성
    setTime(t);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return <p>{time}</p>;
}
```

---

### Refs

https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

https://css-tricks.com/using-requestanimationframe/

https://velog.io/@0715yk/HTML-requestAnimationFrame#:~:text=requestAnimationFrame%EC%9D%98%20%EC%9E%A5%EC%A0%90,-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%80%20%EB%B9%84%ED%99%9C%EC%84%B1&text=%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EA%B0%80%20%EC%96%B8%EC%A0%9C%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC,%EA%B7%A0%EB%93%B1%ED%95%98%EA%B2%8C%20%EA%B0%80%EC%A0%B8%EA%B0%88%20%EC%88%98%20%EC%9E%88%EB%8B%A4.
