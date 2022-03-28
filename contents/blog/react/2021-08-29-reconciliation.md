---
title: "[React] Reconciliation이란?\n(+ virtual DOM, 리액트는 선언적)"
date: "2021.08.29"
tags:
  - React
  - reconciliation
---

## 요약

리액트는 컴포넌트에서 prop이나 state가 변경될 때, 직전에 렌더링된 요소(element)와 새로 반환된 요소를 비교하여 실제 DOM을 업데이트 할지 말지 결정해야 한다. 이때 두 element가 일치하지 않으면 리액트는 새로운 요소로 DOM을 업데이트 하는데, 이러한 프로세스를 reconciliation이라고 한다.

![](https://images.velog.io/images/syoung125/post/feceb168-5c24-45dd-8db5-08c839234bd4/image.png)

## Virtual DOM이란?

### 먼저, DOM이란?

DOM은 "Document Object Model"의 약자로, HTML과 XML과 같은 문서구조를 scripts나 프로그래밍 언어로 연결시켜주는 api이다. 간단히 말해서 DOM은 애플리케이션의 UI를 나타고, 애플리케이션 UI의 상태가 변경될 때마다 해당 변경 사항을 나타내기 위해 업데이트된다.

### DOM은 느리다?

DOM은 트리구조로 표현된다. 따라서, DOM의 변경과 업데이트는 비교적 빠르다. 하지만, 변경된 후 업데이트된 element들을 다시 렌더링하여 UI를 업데이트 해야 한다. 이 때 css 재연산, 레이아웃 구성, 페이지 리페인트 등을 하기 때문에 UI 구성 요소가 많아지면 모든 DOM을 리렌더링하는데 속도가 느려질 수 밖에 없다.

### Virtual Dom?

이에 대한 해결책은 업데이트가 필요한 `최소한의 DOM만 조작하는 것!`이다.

리액트는 이를 위해 실제 DOM 대신 실제 DOM의 사본과 같은 **가상의 DOM**(Virtual DOM) 개념을 도입하였고, 다음과 같이 이 가상의 DOM을 업데이트하는 방식을 사용해 실제 DOM의 업데이트 횟수를 줄인다.

![](https://images.velog.io/images/syoung125/post/59d5c934-f5ce-4d9a-9162-9bf5e4df5df1/image.png)

1. 업데이트한 전체 UI를 Virtual DOM에 리렌더링
2. 실제 DOM과 생성된 Virtual DOM을 비교

   → 이 때 [Diffing Algorithm](https://ko.reactjs.org/docs/reconciliation.html#the-diffing-algorithm)을 따른다.

3. **바뀐 부분만** 실제 DOM에 적용 (→ 최소한의 렌더링만 할 수 있도록)
   → ReactDOM.render()가 React element를 container DOM에 렌더링할 때 필요한 부분만 변경한다.

(React17 이후 hydrate()으로 대체)
리액트는 이러한 내부 동작을 추상화 해주고, 바뀐 부분을 업데이트하기 위해 state 값만 변경하면 된다.

따라서 리액트를 **선언적**이라고 할 수 있다! (React에게 원하는 UI의 상태를 알려주면 DOM이 그 상태와 일치하도록 하기 때문에. 사용할 때 비교 알고리즘 등의 내부 동작은 알 필요 없음)

![](https://images.velog.io/images/syoung125/post/d6eb00c4-0355-41ad-843f-d09400921728/image.png)

---

## Reconciliation

### 비교 알고리즘(Diffing Algorithm)

두 개의 트리를 비교할 때, React는 두 엘리먼트의 루트(root) 엘리먼트부터 비교한다.

이후의 동작은 루트 엘리먼트의 타입에 따라 달라짐

- 엘리먼트의 타입이 다른 경우: 이전 트리를 버리고 완전히 새로운 트리를 구축

```tsx
    // 이전 트리
    <div>
      <Counter />
    </div>

    // 새로운 트리
    <span>
      <Counter />
    </span>

    // 이전 Counter는 버리고 새로운 Counter 사용
```

- DOM 엘리먼트의 타입이 같은 경우: 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신

```tsx
    <div className="before" title="stuff" />

    <div className="after" title="stuff" />
    // className만 수정
```

- DOM 노드의 처리가 끝나면, React는 이어서 해당 노드의 **자식들을 재귀적**으로 처리한다.

### 자식에 대한 재귀적 처리

DOM 노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경된 부분을 갱신한다.

```tsx
// 이전 트리
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 새로운 트리
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

→ 위에서부터 비교하다가 새로운 트리에서 third가 생겼으므로 `<li>third</li>`만 트리에 추가한다.

이때, 자식노드들에 **key값을 할당하는 것이 왜 중요한지** 깨달을 수 있었다!

만약, **third가 맨 앞에 추가되었다면??**

```tsx
// 이전 트리
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// 새로운 트리
<ul>
	<li>third</li> // <- 여기!
  <li>first</li>
  <li>second</li>
</ul>
```

→ 아래 first, second가 같음에도 위에서부터 트리를 전부 갈아야한다.. (성능저하를 야기한다.)

이러한 문제를 해결하기 리액트에서 위해 key속성을 제공하는 것!

자식들이 key를 가지고 있다면, React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인한다.

```tsx
// 이전 트리
<ul>
  <li key="100">first</li>
  <li key="200">second</li>
</ul>

// 새로운 트리
<ul>
	<li key="300">third</li> // <- 여기!
  <li key="100">first</li>
  <li key="200">second</li>
</ul>
```

→ 이렇게 되면, 300 key를 가진 third만 새로운 트리에 새로 추가되고 나머지는 이동만 하게 된다.

## 마치며

평소, 리액트가 가상의 DOM을 비교하여 컴포넌트를 렌더링 한다는 것을 추상적으로만 알고있었는데 실제 DOM의 문제점은 무엇인지, 이를 명칭하는 reconciliation이라는 용어가 있다는 것은 몰랐었다. 또 왜 리액트가 선언적인지 드디어 제대로 이해한 것같다.

지금까지 map을 사용할 때 습관적으로 key를 사용했고, 그 이유가 단순히 리스트의 추가, 제거가 빈번할 때 순서가 바뀌지 않게 해주기 위함인 줄 알았는데 렌더링 측면에서 reconcilation시 트리변환 작업을 효율적으로 하게 해주므로 꼭 할당해야 겠다는 것을 깨달았다.

- 인덱스로 key를 사용하는 것은 정말 최후의 수단으로 생각하자! (특히 항목 순서가 자주 바뀌면 사용하면 안된다) [[예시](https://codepen.io/pen?editors=0010)]

---

### 참고자료

[재조정 (Reconciliation) - React](https://ko.reactjs.org/docs/reconciliation.html)

[react-virtual-dom-explained](https://programmingwithmosh.com/react/react-virtual-dom-explained/)

[[React] Virtual DOM](https://brunch.co.kr/@eight-two-five/14)
