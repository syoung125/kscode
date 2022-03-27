---
title: "[CSS] 스크롤이 가능하지만 스크롤바는 숨기기"
date: "2022.03.27"
tags:
  - CSS
---

아래는 wrapper라는 className을 가진 div의 스크롤바를 숨기는 css 코드다.

```css
.wrapper::-webkit-scrollbar {
  /* Chrome, Safari and Opera */
  display: none;
}
.wrapper {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
```

---

### Refs

https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp
