---
title: "[canvas] canvas에서 context의 scale을 2배 해주는 이유? DPR(Device-pixel-ratio)란?"
date: "2022.02.13"
---

## ➡️ 들어가며

아래 코드는 스크린에 꽉차는 canvas를 깔아주기 위한 scaffolding 코드 중 하나다.

```js
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2); // 레티나 디스플레이에서도 선명하게 보이도록 하기 위해
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
```

이때 resize 함수의 코드를 보면, scale메서드를 사용해 캔버스의 너비와 높이를 스크린 사이즈의 2배로 설정하고 context의 scale을 2배 해주는 코드를 볼 수 있다.

> 그 이유는 **레티나 디스플레이에서도 캔버스 작업이 선명하게 보이도록 하기 위함**인데,이를 **안티 엘리어싱**을 위해서라고도 바꿔 말할 수 있다.

- 레티나 디스플레이: 과거 스티브 잡슨가 아이폰4를 공개하면서 사용한 명칭으로, 인간의 망막(retina)으로 화면 내의 화소가 보이지 않을 만큼의 고밀도 디스플레이를 지칭한 것이다.
- 앨리어싱: 컴퓨터 그래픽에서 해상도의 한계로 선 등이 우둘투둘하게 되는 현상을 의미하며, 결과물이 깨져보이므로 "계단현상"이라고도 부른다.
- 안티-앨리어싱(Anti-Aliasing): 앨리어싱에 방지하는 뜻의 안티(Anti-)가 붙여져 이러한 계단 현상을 방지하는 것을 의미한다.

### 그렇다면 왜 굳이 **2배**를 해주는 것일까?!

그 이유는 레티나 디스플레이의 DPR(Device-pixel-ratio)이 2이기 때문이다.

이제 DPR이 무엇인지 살펴보자

## ➡️ DPR(Device-pixel-ratio)

> DPR은 **현재 표시 장치의 물리적 픽셀과 CSS 픽셀의 비율**을 나타낸다.

- 물리적 픽셀(physical pixel): (= 디바이스 픽셀) 단말이 실제로 표현할 수 있는 물리적인 화소(pixel) 기본 단위. 예 ) 사진 기본 크기
- 논리적 픽셀(logical pixel): (= css 픽셀) html/css에서 논리적으로 표현할 수 있는 화소 기본 단위. 예 ) 사진 출력 크기

![](/blog/javascript/canvas/one-css-px-to-many-screen-px.png)

사실 우리가 사용하는 css의 1px과 그 1px을 구성하는 물리적 픽셀 수는 기기별로 다른데, 그 중 레티나 디스플레이는 css의 1픽셀을 물리적으로 2픽셀을 사용하여 나타낸다. 추가로 Apple iPhone 12 Pro Max의 dpr은 3, Samsung Galaxy S8+ dpr은 4, Microsoft Surface Pro 3의 dpr은 1.5이다.

- 최신 기기들의 pixel ratio를 확인할 수 있는 사이트: https://www.mydevice.io/

---

## ➡️ 기기마다 다른 DPR에 따라 canvas 크기를 보정하는 방법

이러한 이유로 디스플레이마다 CSS 1픽셀을 그리는 데 사용되는 실제 픽셀 수가 다르기 때문에 Canvas 크기를 DPR에 따라 보정해야 한다.

고맙게도 자바스크립트에서는 웹 브라우저의 전역변수 [Window.devicePixelRatio](https://developer.mozilla.org/ko/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_%3Ccanvas%3E)를 통해 편리하게 dpr 값을 알아낼 수 있다.

#### 예시 코드

아래는 모든 기기에서의 선명도를 보장하기 위해 dpr을 반영하여 canvas resize코드를 작성한 코드다.

```js
resize() {
  this.stageWidth = document.body.clientWidth;
  this.stageHeight = document.body.clientHeight;

  var scale = window.devicePixelRatio;

  this.canvas.width = this.stageWidth * scale;
  this.canvas.height =  this.stageHeight * scale;

  this.ctx.scale(scale, scale);
}
```

#### 예상 결과

![](/blog/javascript/canvas/device-pixel-ratio-example.png)
출처: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

이렇게 dpr에 따라 canvas 너비와 높이를 보정함으로써 특정 device에서의 앨리어싱 현상을 방지할 수 있으며, 이는 캔버스 프로젝트를 시작할 때 꼭 고려해야 할 사항이다.

---

### Refs

https://ui.toast.com/weekly-pick/ko_20210526

https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

https://stackoverflow.com/questions/8785643/what-exactly-is-device-pixel-ratio

https://velog.io/@vnfdusdl/DPRDevice-pixel-ratio%EC%9D%98-%EC%9D%B4%ED%95%B4

https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=eirene100999&logNo=221652853751
