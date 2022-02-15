---
title: "[CSS] 익숙하지 않은 css 속성들 (1) - pointer-events, touch-action, backdrop-filter"
date: "2022.02.14"
---

## pointer-events: 클릭 이벤트 허용 여부

[pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) 속성은 특정한 그래픽 요소가 어떤 상황에서 포인터 이벤트의 대상이 될 수 있는지 지정한다.

나 같은 경우 Carousel UI에서 아이템을 좌우로 넘기는 중인 경우 아이템에 `pointer-events:none;`속성을 부여해 **아이템의 클릭 이벤트를 방지할 때** 사용해보았다.

`pointer-events`의 가능한 값은 `auto`와 `none` 두가지이고, 속성이 지정되지 않은 경우 `auto`가 기본값이다.  
또, svg에서만 실험적으로 아래와 같은 추가적인 값이 적용될 수 있다.

```css
pointer-events: auto; /* 요소가 pointer-events 속성을 지정하지 않은 것처럼 행동. SVG 콘텐츠에서는 auto와 visiblePainted가 동일한 효과를 지닌다. */
pointer-events: none; /* 요소가 포인터 이벤트의 대상이 되지 않는다. 그러나 해당 요소의 자손이 다른 pointer-events 값을 지정한 경우, 그 자손은 대상이 될 수 있다. 이 때는 이벤트 캡처링,버블링 단계에서 none을 지정한 요소의 이벤트 처리기를 발동할 수 있다. */
pointer-events: visiblePainted; /* SVG only */
pointer-events: visibleFill; /* SVG only */
pointer-events: visibleStroke; /* SVG only */
pointer-events: visible; /* SVG only */
pointer-events: painted; /* SVG only */
pointer-events: fill; /* SVG only */
pointer-events: stroke; /* SVG only */
pointer-events: all; /* SVG only */
```

## touch-action: 브라우저에게 맡길 터치 액션 지정

[touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) 속성은 **요소의 영역을 터치스크린 유저가 조작하는 방법**을 설정한다. 기본적으로 패닝(스크롤) 및 핀치(줌인, 줌아웃) 제스처는 브라우저에서만 처리된다. 다시말해, `touch-action`은 이러한 브라우저의 터치 이벤트를 조작할 때 사용된다.

이 또한 Carousel UI를 만들때 `touch-action: pan-x;` css를 설정하여 세로 스크롤은 불가능하도록 설정할 때 사용해보았다.

```css
/* Keyword values */
touch-action: auto; /* (기본 값) 모든 패닝, 핀치에 대한 브라우저 처리를 활성화 */
touch-action: none; /* 모든 패닝, 핀치에 대한 브라우저 처리를 비활성화  */

/* 특정 축으로의 터치를 사용한 패닝 허용 */
touch-action: pan-x;
touch-action: pan-y;

/* 특정 방향으로의 터치를 사용한 스크롤 허용 */
touch-action: pan-left;
touch-action: pan-right;
touch-action: pan-up;
touch-action: pan-down;

/* 핀치 줌(여러 손가락을 사용한 확대/축소) 허용 */
touch-action: pinch-zoom;
/* 터치를 사용한 스크롤, 핀치 줌만 허용하고 그 외 비표준 동작 (더블 탭으로 확대하기 등) 불허용 */
touch-action: manipulation; /* pan-x pan-y pinch-zoom 와 같음*/

/* Global values */
touch-action: inherit;
touch-action: initial;
touch-action: revert;
touch-action: unset;

/* 동시에 여러 값 지정 가능 */
touch-action: pan-x pinch-zoom;
```

#### 주의할 점: 접근성 문제

`touch-action: none;`는 브라우저의 확대, 축소 기능 제한하여 텍스트 크기를 고정시키는데, 이는 시력이 낮은 사람들이 페이지 콘텐츠를 확대해서 볼 수 없게 되는 접근성 문제를 갖는다.

> WCAG 2.0 SC1.4.4의 Resize text 내용 일부: 작성자는 사용자가 콘텐츠를 확장하는 것을 방해하지 않는 웹을 만들 책임이 있으며 만약 이를 제한 할 경우, 텍스트 크기 조정 또는 레이아웃 변경에 대한 직접적인 지원이 있어야 접근성을 충족시킬 수 있습니다

해당 내용과 관련하여 IOS 10버전 이후, 애플은 접근성 문제로 인해 `user-scalable=no`를 의도적으로 비활성화했다. 때문에 기존처럼 meta 태그에 `user-scalable=no`를 추가하여도 사용자 휴대폰 설정에 확대 축소 가능으로 되어있다면 이를 제한할 수 없게 되었다.
이 때 `touch-action: pan-y`를 사용하면 확대 축소를 제한하고 세로로 스크롤은 유지할 수 있지만, 확대 축소와 관련하여 다른 방법으로의 지원을 고민할 필요성이 있다.

## backdrop-filter

[backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)는 요소 뒤 영역에 블러나 색상 시프트 등의 그래픽 효과를 적용할 수 있는 속성이다. 효과가 요소의 "뒤" 영역에 적용되므로 효과를 확인하려면 요소나 요소의 배경을 적어도 반투명하게 설정해야 한다.

`backdrop-filter`를 사용한 이유는 아래와 같은 반투명한 헤더를 만들고 싶었기 때문이다.

![](/blog/css/backdrop-filter-example.gif)

이 효과는 가장 바깥 div에 `backdrop-filter: blur(10px)` css를 주어 쉽게 적용할 수 있다.

처음에는 [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) 속성을 사용해 저용해 보았는데, `filter`는 `backdrop-filter`와 달리 요소 전체 영역에 그래픽 효과를 적용하므로 요소 위에 있는 글씨나 아이콘에 모두 블러 효과가 적용된다.

하지만 호환성을 살펴보면 아직 firefox나 IE11에서는 적용되지 않기 때문에, 이 점을 염두하고 사용해야 한다.

---

### Refs

- [CSS touch-action 한눈에 알아보기](https://wit.nts-corp.com/2021/07/16/6397)
