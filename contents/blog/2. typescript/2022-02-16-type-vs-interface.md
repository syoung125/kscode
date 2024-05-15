---
title: "[TypeScript] type과 interface의 차이"
date: "2022.02.16"
tags:
  - TypeScript
---

`type`과 `interface`는 매우 유사해서 대부분의 경우 개발자의 취향에 맞게 자유롭게 선택해 사용한다.
전 회사에서는 타이핑이 필요한 대부분의 상황에서 `type`을 사용했고, 백엔드 스키마와 일치하는 모델 또는 DTO의 경우 `interface`로 타입 지정을 했다. 하지만 어떤 회사에서는 컴포넌트의 prop 타입 등 대부분의 상황에서 `interface`를 사용한다고 한다.

그렇다면 둘 중 무엇을 사용할지 선택하는 것은 단순 개발자의 취향에 의한 것인가? 물론 회사 컨벤션 또는 개인의 선호에 따라 이를 선택할 수도 있겠지만, `type`과 `interface`는 몇 가지 차이점이 존재한다.

## ✨ TL;DR

> If you would like a heuristic, use interface until you need to use features from type.

`type`이 반드시 필요하다 느끼기 전까지는 `interface`를 사용해라!

## ➡️ `type`과 `interface`의 주요 차이점은 무엇일까?

#### 1. `type`은 새로운 속성을 추가하기 위해 다시 열 수 없는 반면 `interface`는 항상 확장가능하다.

타입스크립트 핸드북에는 아래와 같이 나와있는데, type을 re-opened 한다는 것?이 뭔지 잘 이해가 안 갔다.

> the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

그리고 아래 예시를 보고 이해할 수 있었는데,

`type`은 한번 선언한 후 또 같은 타입을 다시 선언하며 확장할 수 없다.
따라서 아래 코드는 에러를 발생시킨다.

```ts
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```

반면 `interface`는 다시 선언하여 Window interface를 확장시킬 수 있다.
이제 윈도우는 title과 ts속성을 둘다 포함하는 타입이 되었다.

```ts
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

#### 2. `type`은 `intersections (&)`을 사용해 타입을 확장하고, `interface`는 `extends` 키워드를 사용해 인터페이스를 확장한다.

type:

```ts
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

interface:

```ts
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

#### 3. 그 외 차이점들

[Useful table for Types vs Interfaces](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/#useful-table-for-types-vs-interfaces)

`type`과 `interface`의 차이는 매우 미묘하니 이에 너무 집착하지 말라는 조언과 함께 둘의 차이를 표로 정리한 글이다. 한번쯤 읽어보면 좋은 것 같다.

## ➡️ 왜 `interface`를 더 선호하는 것 일까? (feat. Microsoft)

TL;DR(Too Long; Didn't Read)에서 써놓았듯, 타입스크립트 문서는 `type`보다 `interface`사용을 추천한다. 직감적(heuristic)으로 무엇을 쓸지 고민중이라면 진짜 `type`이 필요성을 느끼기 전까진 `interface`를 먼저 사용하라고한다.

그 이유는 무엇일까?

그 이유는 Typescript 깃허브 레포지토리 위키에 있는 [Writing Easy-to-Compile Code](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections) 글에서 알 수 있었다.

간단히 말해 **interface가 더 컴파일 하기 쉬운 코드**이기 때문이다.

```ts
interface Foo {
  prop: string;
}

type Bar = { prop: string };
```

이런 단순한 타입정의에선 상관이 없는데, `&` 또는 `extends`를 사용해 타입을 확장할 때 차이가 생긴다고 한다

(다음 내용은 몇 번 읽어보고 해석해봐도 이해가 잘 안된다.. 의역이 있을 수 있어 궁금하다면 원문을 직접 보는 것을 추천한다. )

- `interface`는 속성끼리의 충돌을 감지하여 하나의 평평한 객체 타입(a single flat object)을 생성한다. 반면 `Intersections(&)`를 사용한 `type` 병합은 속성을 **재귀적으로 병합**하고 경우에 따라 `never`타입을 생성하기도 한다.
- `interfaces`를 사용한 코드는 일관되게 보여지므로 더 좋다. 반면 `Intersections(&)`를 사용해 병합한 `type-alias`는 다른 `intersections`의 일부로 보여지지 않는다.
- `intersection types`와 달리 `interface`간의 타입 관계는 **캐시**도 된다.
- 마지막 주목할만한 차이는 타겟 `intersection type`을 확인할 때, "effective"/"flattened" 타입을 확인하기 전에 모든 성분이 확인된다는 것이다.
  모든 성분이 확인된다. (?)

### More Advice

- 오픈소스와 같은 공개 API에서는 오픈소스를 사용하는 사람들이 `interface`를 확장해 병합할 수 있도록 `interface`를 사용하자.

- `type`이 일관성있고 더 제한적이기 때문에 위해 리액트 컴포넌트 prop또는 state의 타입정의는 `type` 사용을 고려해라.

---

### Refs

[Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

[Types or Interfaces?](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/#types-or-interfaces)

https://medium.com/humanscape-tech/type-vs-interface-%EC%96%B8%EC%A0%9C-%EC%96%B4%EB%96%BB%EA%B2%8C-f36499b0de50
