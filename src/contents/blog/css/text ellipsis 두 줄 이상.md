---
title: "[CSS] text-overflow: ellipsis 두줄 이상 처리"
date: "2022.11.08"
---

text ellipsis를 설정하기 위해 찾아본적이 정말 여러번인데 이제는 그만 찾아보고 척척 쓸 때가 되지 않았나 해서 까먹지 않으려고 적어둔다.

### 한줄일때

> 안녕하세...

```css
p {
  width: 6rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

- width 값을 지정해야 한다!
- `overflow: hidden;`, `white-space: nowrap;` 으로 설정한다.

https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow

### 두줄이상

> 안녕하세요 저는
> 서울에 살고...

```css
p {
  width: 6rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
}
```

- `white-space:nowrap`을 하면 두줄이상이 될 수 없으므로 `word-break: break-word;`으로 변경하고,
- `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;`를 추가한다.
