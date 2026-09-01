---
title: "React 프로젝트 생성 및 기초"

titleImage: "https://github.com/user-attachments/assets/96765271-02c8-4b0c-bacd-292be7d93bc0"

date: "2026-04-05"

description: "Vite를 활용한 React 프로젝트 생성 및 기본 구조"
category: "tech"
tags: ["React", "Vite", "프론트엔드"]
---

"멋쟁이 사자처럼 대학 14기" 프론트엔드 2주차의 교육 내용 정리이다.

이번 주차는 React 프로젝트 생성과 기본 문법 관련 내용이다.

React를 꽤 자주 사용했기에 기본적인 건 알고 있었다.

가볍게 다시 정리한다는 생각으로 공부했다.

## React란?

UI를 만들기 위한 JavaScript 라이브러리이다.

화면을 컴포넌트 단위로 나누어 개발하며, 데이터 상태만 바꾸면 화면이 자동으로 업데이트된다.

프로젝트 규모가 클수록 VanillaJS보다 코드 재사용과 유지보수에 유리하다.

## Vite

React 프로젝트를 빠르게 생성하고 실행할 수 있게 해주는 빌드 도구이다.

```bash
npm create vite@latest [name] --template react
cd [name] && npm install && npm run dev
```

실행 후 `http://localhost:5173`에서 확인할 수 있다.

## JSX 문법

JavaScript 안에서 HTML처럼 작성하는 문법이다.

- 반드시 하나의 부모 요소로 감싸야 한다
- `{}` 안에 JavaScript 표현식을 사용할 수 있다
- `class` 대신 `className`을 사용한다

```jsx
function App() {
  const name = "홍길동";
  return <h1 className="box">Hello {name}</h1>;
}
```

## 컴포넌트

화면을 기능 단위로 나눈 각각의 조각이다.

이름은 대문자로 시작하며, 반복되는 UI를 기준으로 분리한다.

React를 사용할 때, 대부분의 상황에서 기능별로 컴포넌트를 분리하여 작성한다.

이후 레고 조립하듯 여러 곳에서 사용하게 된다.

```jsx
function Header() {
  return <h1>My Website</h1>;
}

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

## Props

부모에서 자식 컴포넌트로 데이터를 전달하는 방식이다.

같은 컴포넌트를 다른 데이터로 재사용할 수 있게 해준다.

```jsx
function Welcome({ name }) {
  return <h1>{name} 님 환영합니다!</h1>;
}
```

## map

배열 데이터를 JSX로 변환하여 리스트를 렌더링할 때 사용한다.

데이터가 추가되어도 UI 코드를 수동으로 추가할 필요가 없다.

```jsx
const notices = [
  { id: 1, title: "공지사항 1" },
  { id: 2, title: "공지사항 2" },
];

return (
  <div>
    {notices.map((notice) => (
      <p key={notice.id}>{notice.title}</p>
    ))}
  </div>
);
```

## Mock 데이터

API가 준비되지 않았을 때 사용하는 임시 데이터다.

이건 React에서만 사용하는 것은 아니다.

프론트엔드를 작성할 때, 대부분의 경우 API가 완성되어 있지 않다.

이러한 상황에서 Mock 데이터를 활용하게 된다.

별도 파일로 분리하여 관리하고, 이후 API 연동을 고려해 백엔드 명세에 맞게 설계하는 것이 좋다.

```js
// data/messages.js
export const messages = [
  { id: 1, name: "A", message: "hi" },
  { id: 2, name: "B", message: "hello" },
];
```
