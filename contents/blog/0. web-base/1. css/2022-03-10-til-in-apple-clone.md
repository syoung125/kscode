---
title: "[TIL 220310] 부드러운 감속의 원리, svg stroke-dasharray 속성, will-change 등?"
date: "2022.03.10"
tags:
  - svg
---

최근 인프런 [애플 클론 강의](https://www.inflearn.com/course/%EC%95%A0%ED%94%8C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%9D%B8%ED%84%B0%EB%9E%99%EC%85%98-%ED%81%B4%EB%A1%A0)를 수강하면서 새로 알게된 점을 정리해보았다.

## 1. 부드러운 감속의 원리

y 스크롤의 위치(yOffset)에 따라 현재 화면에 보여지는 이미지가 자연스럽게 넘어가도록 구현하는 부분에서 부드러운 감속이 적용된다. 이 때 이미지는 동영상에서의 한 프레임에 해당하는 이미지이며, 계산에 의해 일정한 스크롤을 내렸을 떄 다음 이미지가 보여지도록 구현된다.

스크롤의 높이가 100, 이미지가 100장이라면 스크롤이 0 -> 100으로 넘어갈때 이미지는 0번째 이미지를 보여주다가 바로 100번째 이미지를 보여준다. 따라서 부드럽게 넘어가는 이미지를 보여주는 것이 아니라 딱딱 끊기게 이미지가 넘어가는데, 특히 방향키를 통해 스크롤을 할때 이러한 문제가 더 두드러지게 보여졌다.

따라서 0 -> 100 이 아닌 0 -> 10 -> 20 -> 30 -> ... -> 100 이런식으로 부드럽게 이미지가 넘어가도록 해야한다. 아래 코드는 css transition의 ease나 ease-in과 같이 이미지가 서서히 느려지면서 전환되도록 하는 코드다.

acc라는 변수를 통해 100의 0.1만큼(10) 이동, 나머지 90(100\*0.9)의 0.1만큼(100\*0.1) 이동, 나머지 81(90\*0.9)의 0.1(90\*0.1)만큼 이동... 이런식으로 이미지를 전환시키면 0 -> 10 -> 19 -> 27 -> 34 -> ... -> 100 이런식으로 이미지가 전환되어 더욱 부드럽고 자연스럽게 작동하는 애니메니션을 구현할 수 있다.

```js
let yOffset = 0; // window.scrollY 대신 사용할 함수
let acc = 0.1;
let delayedYOffset = 0;
let rafId;
let rafState;

function loop() {
  delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

  /** delayedYOffset을 사용한 로직이 들어가는 자리 **/
  if (!enterNewScene) {
    if (currentScene === 0 || currentScene === 2) {
      const currentYOffset = delayedYOffset - prevScrollHeight;
      const objs = sceneInfo[currentScene].objs;
      const values = sceneInfo[currentScene].values;
      let sequence = Math.round(
        calcValues(values.imageSequence, currentYOffset)
      );
      if (objs.videoImages[sequence]) {
        // 계산에 의해 스크롤에 따른 sequnce(현재 이미지 인덱스)를 구한 다음 캔버스에 그려준다.
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      }
    }
  }

  rafId = requestAnimationFrame(loop);

  if (Math.abs(yOffset - delayedYOffset) < 1) {
    cancelAnimationFrame(rafId);
    rafState = false;
  }
}

window.addEventListener("scroll", () => {
  yOffset = window.scrollY;

  if (!rafState) {
    rafId = requestAnimationFrame(loop);
    rafState = true;
  }
});
```

## 2. svg: stroke-dasharray, stroke-dashoffset

새로운 svg의 속성에 대해 알게되었다.

#### stroke-dasharray

svg의 테두리를 점선으로 나타내고 싶을 때, 점선이 어떻게 그려질지를 결정하는 속성이다.

- `stroke-dasharray="4"` : dash와 gap의 크기가 둘다 4
- `stroke-dasharray="4 1"` : dash 크기 4, gap 크기 1
- `stroke-dasharray="4 1 2"` : dash 4, gap 1, dash 2, gap 4, dash 1, gap 2 ... 와 같이 점선에서 4-1-2 패턴이 반복된다.
- `stroke-dasharray="4 1 2 3"` : 위 예시와 마찬가지로 dash 4, gap 1, dash 2, gap 3, dash 4, gap 1 ...로 4-1-2-3 패턴이 반복된다.

[mdn stroke-dasharray 예제 참고](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)

#### stroke-dashoffset

`stroke-dasharray`에서 offset을 정의하는 속성이다. `stroke-dashoffset`에 따라 점선의 시작 지점이 결정되고, 음수로 지정할 수도 있다.

[mdn stroke-dashoffset 예제 참고](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset)

## 3. transitionend 이벤트

transition이 완료된 이후에 발생하는 이벤트로 transition 완료를 감지한다.
addEventListener를 사용하여 이벤트 모니터링이 가능하다.

사용예제: 로딩이 끝났을 때 로딩의 fade out 애니메이션을 유지한 이후 로딩 div를 없애기 위해 transitionend 이벤트를 사용했다.

```js
document.querySelector(".loading").addEventListener("transitionend", (e) => {
  document.body.removeChild(e.currentTarget);
});
```

## 4. will-change 속성

애플 사이트에서 애니메이션이 실행되는 div에 `will-change`속성을 지정했기 때문에 따라 사용해보았다.

```css
#show-scene-0 #scroll-section-0 .sticky-elem,
#show-scene-1 #scroll-section-1 .sticky-elem {
  display: block;
  will-change: transform, opacity;
}
```

`will-change` CSS 속성은 요소에 예상되는 변화의 종류에 관한 힌트를 브라우저에 제공케 한다. 그래서 **실제 요소가 변화되기 전에 미리 브라우저는 적절하게 최적화**할 수 있다. 이러한 종류의 최적화는 잠재적으로 성능 비용이 큰 작업을 그것이 실제로 요구되기 전에 미리 실행함으로써 페이지의 반응성을 증가시킬 수 있다.

#### 주의할 점

하지만 과도한 사용은 오히려 페이지 속도를 늦추거나 엄청난 자원을 소비할 수 있다. 따라서 적절히 사용할 수 있어야 하며, 보통 필요한 경우에만 자바스크립트를 사용해 `will-change` 활성/비활성화 해주는 것이 좋다고 한다.

또 주의해야할 점은 javascript를 통해 transform 애니메이션을 사용할때 `will-change`를 쓰면 빨라지는 대신 **애니메이션이 적용된 비트맵이 흐려질 수도 있다**는 점이다.
`will-change` 속성이 없는 모든 콘텐츠는 scale이 변경되면 다시 레스터화(re-rastered)한다. 즉,`will-change`란 변형은 효과적으로 래스터화 시간을 추가하지 않고 “신속하게 변형을 적용하십시오” 라는 의미다. 이는 **javascript 조작을 통해 발생하는 scale 조정에만** 적용되며 CSS 애니메이션에는 적용되지 않는다.

`will-change: transform` 속성은 콘텐츠를 이후의 transform 변화에 의해 변경되지 않는 고정된 비트맵으로 강제하는 것으로 간주한다. 이로 인해 개발자는 해당 비트맵에 적용되는 이동(translate), 회전(rotate), 크기변형(scale)과 같은 transform 애니메이션의 속도를 높일 수 있다. 하지만, `will-change` 속성을 사용하면서 javascript로 애니메이션을 적용하는 경우, 애니매이션의 속도가 빨라지는 대신 고정된 비트맵으로 강제하여 요소가 흐려질 수 있다.

#### will-change: transform의 사용처

예를들어 매우 빠른(60fps) 애니메이션 속도를 유지하는 것이 중요하며, **각 프레임에서 높은 품질의 레스터화가 필요하지 않을것으로 예상되는 요소에 사용하는 것이 적합**하다. 그렇지 않으면 `will-change: transform` 사용을 피하는게 좋다. 성능 수준을 절충하여 최적화하려면 애니메이션이 시작될 때 `will-change: transform` 을 추가하고 끝나면 제거하자. 하지만 `will-change: transform` 을 추가하거나 제거할때에 일회성 성능 비용(one-time preformance cost)이 소요된다는 점은 염두해야 한다.

#### 추가적인 고려 사항

`will-change: transform`을 제거하면 레스터화(re-rastered) 되어 콘텐츠가 선명하게 크기가 변형되지만, 그 다음 프레임에서 적용된다.(requestAnimationFrame 에 의하여) 그러므로 `will-change: transform` 속성이 있는 레이어가 다시 래스터(re-rastered)를 트리거하고 애니메이션을 계속 진행하려면, 우선 `will-change: transform` 을 제거한 다음 requestAnimationFrame 콜백에 다시 추가해야한다.

#### Refs

[mdn will-change](https://developer.mozilla.org/ko/docs/Web/CSS/will-change)

[will-change](https://thisblogfor.me/web/will_change/)

## 5. object 태그?

`<object>` 태그는 외부 리소스를 정의하기 위한 컨테이너 역할을 하는 태그다. object 태그를 통해 웹페이지, 사진, 동영상, 플로그인 앱 등을 보여줄 수 있다.

하지만 `<object>` 태그는 퇴화 태그로 간주되어, 사진의 경우 `<img>`, HTML은 `<iframe>`, 비디오나 오디오는 `<video>`와 `<audio>` 태그를 사용하는 것이 훨씬 권장된다.

강의에서는 svg를 보여주기 위해 사용되었는데, img 태그로 변경해도 정상 동작하며 [이 문서](https://vecta.io/blog/best-way-to-embed-svg)에 따르면 svg에서 상호작용이 필요한 경우가 아니라면 img태그 사용을 권장하므로 object가 아닌 img 태그를 사용하는 것이 더 좋은 것 같다.

```html
<object
  class="sticky-elem pencil-logo"
  data="images/pencil-logo.svg"
  type="image/svg+xml"
></object>
```

#### Refs

https://www.w3schools.com/tags/tag_object.asp

## 6. load vs DOMContentLoaded

DOMContentLoaded 이벤트는 스타일 시트, 이미지 등의 로딩은 기다리지 않고 초기 HTML문서만 로드되면 발생하는 이벤트다.

#### Refs

https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event
