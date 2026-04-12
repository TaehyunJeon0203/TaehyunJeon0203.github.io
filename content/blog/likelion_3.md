---
title: "React 상태 관리와 Git 협업"

titleImage: "https://github.com/user-attachments/assets/9875431b-74ff-49eb-a25f-1ef654b97409"

date: "2026-04-12"

description: "React 상태 관리 기초와 Git Branch 기반 협업 흐름"
category: "tech"
---

"멋쟁이 사자처럼 대학 14기" 프론트엔드 3주차의 교육 내용 정리이다.

이번 주차는 React 상태 관리와 Git 협업 흐름에 대한 내용이다.

React 상태 관리는 간단히 정리하고, Git 협업 방식을 좀 더 깊이 다뤄본다.

---

## State

컴포넌트 내부에서 동적인 데이터를 관리하기 위해 사용하는 객체이다.

State 값이 변경되면 React는 해당 컴포넌트를 리렌더링한다.

일반 변수는 값이 바뀌어도 React가 감지하지 못하기 때문에, 화면에 반영되어야 하는 값은 반드시 State로 관리해야 한다.

## useState

컴포넌트에 State를 추가할 때 사용하는 Hook이다.

현재 값과 setter 함수를 배열로 반환하며, 비구조화 할당으로 사용한다.

```jsx
const [count, setCount] = useState(0);
```

State는 직접 수정할 수 없고, setter를 통해서만 변경해야 한다.

## Event Handling

사용자의 행동에 따라 특정 동작을 실행하는 것이다.

React에서는 `onClick`, `onChange` 등의 JSX 속성으로 이벤트를 처리한다.

주의할 점은 함수를 실행하는 것이 아니라 전달해야 한다는 것이다.

```jsx
onClick={handleClick}    // O
onClick={handleClick()}  // X — 렌더링 시점에 바로 실행됨
```

이벤트 핸들링은 보통 useState와 함께 사용하여 상태를 변경하고 화면에 반영한다.

## useEffect

컴포넌트가 렌더링된 이후 특정 작업을 수행하기 위한 Hook이다.

의존성 배열에 따라 실행 시점이 달라진다.

```jsx
useEffect(() => { /* 최초 1회 */ }, []);
useEffect(() => { /* count 변경 시 */ }, [count]);
useEffect(() => { /* 매 렌더링 */ });
```

API 호출, 이벤트 등록/해제, 데이터 저장 등에 활용된다.

## localStorage

브라우저에 데이터를 저장하여 페이지를 새로고침해도 유지되도록 하는 기능이다.

문자열 형태로 저장되며, 같은 도메인에서만 접근 가능하다.

```js
localStorage.setItem("key", "value");       // 저장
localStorage.getItem("key");                // 조회
localStorage.removeItem("key");             // 삭제
```

useEffect와 함께 사용하면 상태 변경 시 자동으로 저장할 수 있다.

```js
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

## react-router

URL 경로에 따라 다른 화면을 보여주는 기능이다.

기존 웹은 페이지 이동 시 전체가 새로고침되지만, React에서는 컴포넌트만 교체하여 화면을 전환한다.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

`useNavigate`로 코드에서 페이지를 이동하고, `useParams`로 URL 파라미터를 가져올 수 있다.

```jsx
const navigate = useNavigate();
navigate("/detail/1");

const { id } = useParams(); // URL의 :id 값을 가져옴
```

`useParams`는 값을 문자열로 반환하므로, 숫자가 필요한 경우 `Number(id)`로 변환해야 한다.

---
**이제 Git, Github에서의 협업 흐름에 대해 알아본다.** 

**여기서부터가 내가 생각하는 이번 주차의 핵심이다.**

## Git Branch 전략


협업에서는 모든 작업을 main 브랜치에서 직접 하지 않는다.

main은 최종적으로 안정된 코드만 모아두는 브랜치이고, 새로운 기능 개발이나 오류 수정은 별도의 브랜치에서 진행한다.

이렇게 하는 이유는 작업 중인 코드가 바로 메인 코드에 반영되는 것을 막고, 각 작업을 독립적으로 관리하기 위함이다.

### Main 브랜치

프로젝트의 기준이 되는 브랜치이다.

배포 가능한 상태이거나, 팀이 함께 관리하는 가장 안정적인 코드가 들어 있다.

따라서 협업에서는 다음 원칙을 지킨다.

- main에서 직접 작업하지 않기
- 기능 추가, 수정, 오류 해결은 별도 브랜치에서 진행
- 검토가 끝난 작업만 main에 합치기

프로젝트에 따라 main 대신 다른 기준 브랜치를 사용하기도 한다.

예를 들어 develop 브랜치를 개발용 기준으로 사용하고, main은 실제 배포용으로만 쓰는 방식이다.

이 경우 개발 작업은 feat 브랜치에서 진행하고, 완료되면 develop에 병합한다.

최종 안정화가 끝나면 develop을 main에 병합하여 배포한다.

또한 레포지토리 설정에 따라 기본 브랜치 이름이 master인 경우도 있다.

이는 master 라는 단어 어감에서 오는 인종차별 문제 때문에 main으로 변경된 것이라고 한다.

### 브랜치 네이밍 컨벤션

브랜치 이름만 봐도 어떤 작업인지 알 수 있게 작성하는 것이 좋다.

```
feat/login-page        # 새로운 기능
feat/product-detail    # 새로운 기능
fix/todo-bugs          # 오류 수정
refactor/auth-logic    # 코드 구조 개선
chore/setup-eslint     # 설정 및 기타 작업
```

팀마다 컨벤션이 다를 수 있지만, `카테고리/작업내용` 형태가 가장 보편적이다.

### 브랜치 생성과 이동

```bash
# 새 브랜치 생성과 동시에 이동
git checkout -b feat/login-page

# 기존 브랜치로 이동
git checkout main

# 브랜치 목록 확인
git branch
```

`git checkout -b`는 브랜치 생성과 이동을 동시에 수행한다.

작업을 시작하기 전에 항상 어떤 브랜치에서 분기하는지 확인해야 한다.

보통 main이나 develop에서 최신 상태를 pull 받은 후 새 브랜치를 생성한다.

```bash
git checkout main
git pull origin main
git checkout -b feat/new-feature
```

---

## 협업 흐름: Issue부터 Merge까지

실제 협업에서는 다음 순서로 작업을 진행한다.

```
(1) Issue 생성
(2) 브랜치 생성
(3) 브랜치에서 작업
(4) 커밋 & 푸시
(5) Pull Request 생성
(6) 코드 리뷰
(7) Merge
```

각 단계를 하나씩 살펴본다.

### 1. Issue 생성

해야 할 작업을 이슈(Issue)로 등록한다.

레포지토리의 Issues 탭에서 New Issue 버튼을 통해 생성할 수 있다.

이슈를 생성하는 이유는 무슨 작업을 왜 하는지 기록하고, 작업 단위를 분리하기 위함이다.

초기에는 제목과 간단한 설명만으로도 충분하다.

이슈에는 고유 번호(예: `#83`)가 부여되며, 이후 PR에서 이 번호를 참조하여 이슈와 연결할 수 있다.

### 2. 브랜치 생성

이슈를 기준으로 새로운 브랜치를 만든다.

```bash
git checkout -b fix/todo-bugs
```

브랜치 이름은 이슈의 작업 내용을 반영하여 짓는다.

### 3. 브랜치에서 작업

생성한 브랜치에서 코드 수정, 기능 추가, 테스트를 진행한다.

이때 중요한 점은 **작업 내용과 관련 없는 수정을 함께 넣지 않는 것**이다.

예를 들어 `fix/todo-bugs` 브랜치라면, 해당 브랜치에서는 투두 오류에 관련된 작업만 하는 것이 좋다.

관련 없는 수정이 섞이면 코드 리뷰가 복잡해지고, 문제가 생겼을 때 원인을 찾기 어려워진다.

### 4. 커밋 & 푸시

작업 내용을 기능 단위로 커밋한다.

```bash
git add .
git commit -m "feat: 상품 상세 페이지 UI 구현"
git push origin feat/product-detail
```

> ![커밋메시지](https://github.com/user-attachments/assets/81cc74c2-87ba-47ce-8802-ff43c988f40d)

> 위 이미지는 3-4년 전쯤 사촌형이 만들어 사용하는 걸 보고 나 랩탑에 저장해 놨던 것이다.<br>
> 커밋시 Type이 고민될 때 꽤나 유용하게 사용하고 있다.


커밋 메시지는 무엇을 했는지 알 수 있도록 작성해야 한다.

```
feat: 상품 상세 페이지 UI 구현
feat: 장바구니 수량 변경 기능 추가
fix: 버튼 오류 수정
```

로컬에서 브랜치를 생성했더라도 깃허브에는 아직 반영되지 않은 상태다.

`git push origin [브랜치명]`을 통해 원격에 브랜치를 생성하고 코드를 업로드한다.

### 5. Pull Request 생성

PR(Pull Request)은 내 브랜치의 작업 내용을 다른 브랜치에 병합해 달라고 요청하는 것이다.

작업이 끝나면 브랜치를 main에 바로 합치는 것이 아니라 PR을 생성하여 코드 리뷰를 진행한다.

즉, "내가 작업한 내용을 main에 합쳐도 괜찮은지 검토해주세요"라고 요청하는 단계이다.

PR을 생성할 때는 다음 내용을 포함한다.

- **제목**: 어떤 작업인지 한눈에 알 수 있게
- **설명**: 변경 사항, 관련 이슈 번호
- **Closes 키워드**: `Closes #83`처럼 작성하면 Merge 시 연결된 이슈가 자동으로 닫힌다

```
Closes #83

## Description
- Todo 오류 수정 및 리팩토링
```

### 6. 코드 리뷰

팀원 또는 프로젝트 내 깃 담당자가 PR 내용을 확인한다.

코드가 정상적으로 동작하는지, 불필요한 수정이 들어가 있지 않은지, 구조가 적절한지 등을 확인한다.

필요하면 수정 요청을 하고, 수정이 끝나면 다시 확인한다.

코드 리뷰는 단순히 잘못된 코드를 찾는 것뿐만 아니라, 팀 전체의 코드 품질을 높이고 서로의 작업을 이해하는 과정이기도 하다.

### 7. Merge

검토가 끝난 PR은 main 브랜치로 병합한다.

이제 해당 작업은 프로젝트의 기준 코드에 반영된다.

Merge 시 `Closes` 키워드로 연결된 이슈가 자동으로 닫힌다.

**중요:** merge 전에는 반드시 main의 최신 내용을 먼저 가져와서 충돌을 방지해야 한다.

```bash
git pull origin main
```

충돌이 발생하면 해당 파일을 열어 수동으로 해결한 뒤 커밋한다.

---

## 충돌(Conflict) 해결

여러 사람이 같은 파일의 같은 부분을 수정하면 충돌이 발생한다.

Git은 어떤 변경 사항을 적용해야 할지 판단할 수 없기 때문에, 개발자가 직접 선택해야 한다.

충돌이 발생하면 파일에 다음과 같은 표시가 나타난다.

```
<<<<<<< HEAD
내가 수정한 코드
=======
상대방이 수정한 코드
>>>>>>> feat/other-branch
```

이 부분을 원하는 내용으로 수정하고, 마커(`<<<<<<<`, `=======`, `>>>>>>>`)를 모두 제거한 뒤 커밋하면 된다.

충돌을 줄이려면 다음을 습관화하는 것이 좋다.

- 작업 시작 전 `git pull`로 최신 코드 가져오기
- 작업 단위를 작게 유지하기
- 같은 파일을 동시에 수정하는 상황 최소화하기

---

## 자주 사용하는 Git 명령어 정리

```bash
# 브랜치
git branch                    # 브랜치 목록 확인
git checkout -b [이름]         # 브랜치 생성 + 이동
git checkout [이름]            # 브랜치 이동

# 상태 확인
git status                    # 변경된 파일 확인
git log --oneline             # 커밋 히스토리 간략히 보기

# 스테이징 & 커밋
git add .                     # 모든 변경 파일 스테이징
git add [파일명]               # 특정 파일만 스테이징
git commit -m "메시지"         # 커밋

# 원격 저장소
git push origin [브랜치명]     # 원격에 푸시
git pull origin [브랜치명]     # 원격에서 최신 코드 가져오기

# 병합
git merge [브랜치명]           # 현재 브랜치에 다른 브랜치 병합
```

---

## 마무리

React 상태 관리는 useState, useEffect, localStorage를 중심으로 화면과 데이터를 연결하는 것이 핵심이다.

하지만 이번 주차에서 더 중요하게 느낀 것은 Git 협업 흐름이다.

혼자 개발할 때는 main에 바로 push해도 문제가 없지만, 팀 프로젝트에서는 브랜치를 나누고, Issue-PR-Review-Merge 흐름을 지키는 것이 필수적이다.

이런 흐름이 체계적으로 갖춰져 있어야 코드 충돌을 줄이고, 문제가 생겼을 때 빠르게 원인을 찾을 수 있다.
