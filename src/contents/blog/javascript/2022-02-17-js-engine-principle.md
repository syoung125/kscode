---
title: "[JavaScript] 자바스크립트 런타임에 대해 알아보자! 싱글쓰레드인 자바스크립트에서 비동기는 어떻게 동작하는가? (이벤트루프, 마이크로테스크큐...)"
date: "2022.02.17"
---

## ➡️ 자바스크립트 런타임

자바스크립트 런타임은 자바스크립트의 실행환경을 말한다. 자바스크립트는 브라우저와 Node.js 환경에서 실행될 수 있고, 두 런타임은 몇몇 차이가 있을 수 있다. 하지만, 이 글에선 **브라우저에서의 자바스크립트 런타임**에 대해 알아보도록 하겠다.

## ➡️ 자바스크립트 런타임의 구성요소

자바스크립트 런타임은 크게 **자바스크립트 엔진**, **Web API**, **콜백 큐(Callback Queue)**로 구성된다. 이제 각 구성요소의 역할에 대해 알아보자.

#### 1. 자바스크립트 엔진

쉽게말해 자바스크립트 코드를 실행하는 컴퓨터 프로그램이다. 가장 잘 알려진 js 엔진으로는 크롬의 V8이 있고, 각 브라우저마다 사용하는 자바스크립트 엔진이 다르다. 마이크로소프트 edge는 Chakera, 사파리는 JavaScriptCore, 파이어폭스는 Spidermonekey를 사용한다.

자바스크립트 엔진은 콜스택(호출스택, call stack)과 힙(heap)을 가진다.

- `힙(heap)`은 구조화되지 않은 메모리 영역으로, 자바스크립트 어플리케이션이 필요로 하는 모든 객체들을 저장하는 메모리풀(memory poop)이다.
- `콜스택(call stack)`은 자바스크립트 코드가 실행되는 순서를 기억하기 위한 데이터 구조다.
  - 콜스택의 역할: 콜스택이 하는일은 단순하다. 코드에서 함수를 실행할 때 이를 스택에 집어넣고, 함수의 리턴(return)문이 실행될 때 해당 함수를 pop하여 꺼내는 것이 전부이다. (진짜 그냥 push and pop)
  - 자바스크립트는 **싱글스레드** 기반의 언어다. 즉, 동시에 한번에 하나의 코드만 처리할 수 있다는 것이다. 따라서 **자바스크립트는 하나의 콜 스택만**을 갖고 있다.

#### 2. Web API

Web API는 브라우저에서 자바스크립트 엔진에게 추가적으로 제공하는 함수들을 말한다. DOM, Timer, fetch, console.log와 같은 함수들은 자바스크립트 언어가 아닌 Web API다.

Web API는 브라우저가 제공하는 것이므로, Node.js 환경 같은 경우 Web API를 제공하지 않는다. 대신 노드 환경에서는 C++ 기반의 노드바인딩(Node Binding)을 통해 소캣, http 등의 통신기능을 사용할 수 있고, 쓰레드풀(Thread Pool)을 통해 비동기 파일 관련 작업이 가능하다.

#### 3. 콜백큐(Callback Queue)

콜백큐는 실행을 준비중인 모든 콜백 함수들을 포함하는 데이터 구조이며, 콜스택이 비었을 때 여기 포함된 콜백함수들이 실행된다.

콜백큐는 사실 **매크로테스크 큐(Macrotask Queue)(= 테스크 큐)**, **마이크로테스크 큐(Microtask Queue)**, **애니메이션 프레임(Animation Frames)** 등으로 나눠져있다. (여러 블로그에서 콜백큐와 테스크 큐를 동일시 하지만 이는 잘못된 정보다.)

- `매크로테스크 큐(Macrotask Queue)` : Task Queue, Event Queue라고도 불리며 매크로테스크에 해당하는 콜백함수를 포함한다.
- `마이크로테스크 큐(Microtask Queue)` : job queue라고도 불리며 Promises와 같이 매크로테스크 큐보다 **우선순위가 높은** 콜백 함수들을 포함한다는 점에서 매크로테스크와 차이가 있다.

우선순위: Microtask Queue > Animation Frames > Macrotask Queue

---

##### 매크로테스크(macrotask) vs 마이크로테스크(microtask)

잠시 매크로테스크와 마이크로 테스크를 어떻게 구분할 수 있는지 알아보자.
어원으로 쉽게 이해를 하면 접두사 macro-는 크거나 대규모임을 나타내고, micro-는 작은, 소규모의 라는 뜻을 나타낸다.
따라서 메크로테스크는 흔히 `Task`라 불리고, 마이크로테스크는 `Job`이라고 불린다.

자바스크립트에서도 다음과 같이 비동기 작업을매크로테스크(macrotask)와 마이크로테스크(microtask)로 나눠 처리한다.

- Macrotasks: setTimeout, setInterval, setImmediate, I/O tasks 등
- Microtasks: process.nextTick, Promises, queueMicrotask(f), MutationObserver 등

---

## ➡️ 싱글쓰레드인 자바스크립트에서 비동기는 어떻게 동작하는가?

자바스크립트는 싱글쓰레드이다. 따라서 자바스크립트는 하나의 콜스택만 갖고 있으므로, 모든 코드가 동기적으로 실행된다면 하나의 작업이 끝날때까지 기다려야한다. 즉, 앞선 코드가 끝날때까지 다음 작업을 진행할 수 없게 되는 문제가 발생하는데, 이것을 블로킹(blocking)이라고 한다.

#### 어떻게 하면 블로킹을 해결할 수 있을까?

가장 간단한 해결 방법은 작업을 동기가 아닌 **비동기**로 처리하는 것이다. 브라우저나 노드에는 블로킹 함수가 거의 없고, 비동기로 동작한다. 비동기로 동작한다는 것은 어떤 코드를 실행하고 끝날 때까지 무작정 기다리는 것이 아니라 **콜백을 받고 이를 나중에 실행한다**는 말이다.

#### 비동기 코드의 동작 원리

```js
console.log("안녕");

setTimeout(() => {
  console.log("하세요");
}, 5000);

console.log("여러분");
```

실제 위 코드를 실행해보면 안녕 -> 여러분 -> 하세요 순서로 출력이 된다. '하세요'를 5초뒤에 출력하는 것을 기다리는 동시에 '여러분'이 먼저 출력될 수 있었던 이유는 무엇일까?? 그 이유는 자바스크립트는 하나의 작업만 처리할 수 있는 싱글 스레드 언어이지만, 브라우저는 단순 런타임 이상을 의미하기 때문이다. 즉, 브라우저에서 제공하는 Web API 등을 통해 비동기 쓰레드를 처리할 수 있는 것이고, node.js의 경우는 Web API가 아닌 C++ API를 사용할 뿐 자바스크립트 스레드를 효과적으로 지원한다.

그렇다면 다시 코드의 setTimeout부터 어떻게 실행되는지 알아보자. setTimeout이 실행되면 우선 당연히 다른 코드처럼 콜스택으로 들어간다. setTimeout은 브라우저에서 제공하는 api이고, setTimeout이 호출되면 브라우저는 Web API로 설정된 시간과 콜백을 전달한다. 이것만 하면 setTimeout 호출은 끝난것! 따라서 스택에서 지울 수 있다.

그럼 5초뒤 Web API로부터 타이머가 콜백 함수를 실행해야 하면 어떻게 해야할까? 콜스택에 넣는다? 하지만 이는 코드 중간에 끼어든다는 소리이고, Web API는 이렇게 코드의 실행을 방해할 수 없다. 따라서 이 때 콜백큐(task queue)와 이벤트 루프(event loop)가 사용된다!

Web API의 작동이 완료되면 ‘하세요’를 출력하는 콜백이 콜백 큐로 들어간다. (위에서 설명했듯 setTimeout은 매크로테스크이므로 정확히 말해 테스크 큐가 사용된다.) 그리고 이벤트 루프(event loop)는 콜스택과 태스크 큐를 둘다 주시하다고 있다가 콜스택이 비게 되면 콜백 큐의 콜백 함수를 콜스택으로 옮기는 역할을 한다. 드디어 콜백이 콜스택으로 들어가게되어 실행되고, ‘하세요’를 맨 마지막으로 출력하게된다.

이러한 작동 원리 때문에, 아무리가 타이머가 0초라도 setTimeout의 콜백이 가장 나중이 실행된다.

#### 이벤트 루프

이벤트루프는 자바스크립트가 싱글스레드임에도 불구하고, 논 블로킹(non-blocking) 비동기 작업수행을 가능하게 해준다. 콜백 큐와 콜 스택을 주시하고 있다가 콜스택이 비었을 때 콜백 큐에 존재하는 작업을 콜스택으로 넘겨주는 역할을 한다.

​---

(+ 추가)

```js
setTimeout(() => console.log("1"));

Promise.resolve().then(() => console.log("2"));

console.log("3");
```

이러한 경우 출력순서는 3 -> 2 -> 1 된다. 왜냐하면 setTimeout의 콜백은 매크로테스크 큐로, Promise의 콜백은 마이크로테스크 큐로 들어가는데 마이크로테스크 큐의 우선순위가 더 높기 때문에 2가 1보다 먼저 출력된다.

---

### Refs

https://ko.javascript.info/event-loop

https://baeharam.netlify.app/posts/javascript/JS-Task%EC%99%80-Microtask%EC%9D%98-%EB%8F%99%EC%9E%91%EB%B0%A9%EC%8B%9D

https://blog.naver.com/laura1205/222570394595

https://www.youtube.com/watch?v=ob3-ivQx2Es

https://www.youtube.com/watch?v=S1bVARd2OSE

https://blog.greenroots.info/task-queue-and-job-queue-deep-dive-into-javascript-event-loop-model

https://ko.javascript.info/microtask-queue
