---
title: "프론트엔드 API 연동 핵심 정리"

titleImage: "https://github.com/user-attachments/assets/135a0d3c-c290-4433-b373-cc72fc36acdf"

date: "2026-05-03"

description: "Endpoint부터 Status Code, 인증 방식, 환경변수 관리까지 API 연동 기본기"
category: "tech"
tags: ["React", "API", "프론트엔드"]
---

"멋쟁이 사자처럼 대학 14기" 프론트엔드 4주차의 교육 내용 정리이다.

이번 주차는 프론트와 백엔드를 연결할 때 꼭 알아야 하는 API 명세 읽는 방법 중심으로 학습했다.

---

## API란?

API(Application Programming Interface)는 프론트엔드와 백엔드가 데이터를 주고받기 위한 약속이다.

프론트가 요청을 보내면 백엔드는 정해진 형식으로 응답을 반환하고, 프론트는 그 응답을 화면에 반영한다.

즉, API 연동은 "요청(Request)과 응답(Response)을 약속대로 주고받는 작업"이다.

## API 명세에서 먼저 볼 것

처음 API 문서를 보면 정보가 많아서 복잡해 보이는데, 아래 순서로 읽으면 훨씬 쉽다.

1. Method 확인
2. Endpoint 확인
3. Path Parameter 확인
4. Query Parameter 확인
5. Request Body 확인
6. Header 확인
7. Response 구조 확인
8. Status Code 확인

---

## 1) Endpoint (URL)

요청을 보내는 주소 경로다.

`[Base URL] + [Endpoint]` 구조로 보통 표현한다.

```txt
https://api.example.com/products
```

여기서 `/products`가 Endpoint이다.

```txt
/products
/products/{productId}
```

엔드포인트가 다르면 완전히 다른 API다.

## 2) Method

같은 Endpoint라도 Method가 다르면 역할이 달라진다.

- `GET /products` → 목록 조회
- `GET /products/3` → 상세 조회
- `POST /products` → 데이터 생성
- `PATCH /cart/items/10` → 일부 수정
- `PUT /cart/items/10` → 전체 교체
- `DELETE /cart/items/10` → 데이터 삭제

핵심은 `Endpoint + Method`를 함께 봐야 API 의미가 정확해진다는 점이다.

---

## 3) Request

프론트가 백엔드로 보내는 요청 전체를 말한다.

Request에는 보통 아래 항목이 포함된다.

- Endpoint
- Method
- Header
- Path Params
- Query Parameter
- Request Body

예시:

```http
POST /cart/items
Content-Type: application/json
Authorization: Bearer accessToken
```

```json
{
  "productId": 3,
  "quantity": 2
}
```

의미: 로그인한 사용자의 장바구니에 3번 상품을 2개 담는 요청

## 4) Path Parameter

URL 경로 안에 포함되는 값이다.

```txt
/products/{productId}
```

```js
const productId = 3;
fetch(`${BASE_URL}/products/${productId}`);
```

## 5) Query Parameter

목록 조회에서 필터, 정렬, 페이지네이션 같은 조건을 붙일 때 사용한다.

```txt
/products?category=shoes&page=1&size=20
```

보통 `GET` 요청과 함께 사용하고, URL 뒤에 `?`로 시작한다.

---

## 6) Request Body

서버에 보낼 실제 데이터다.

주로 `POST`, `PATCH`, `PUT`에서 사용한다.

```json
{
  "productId": 3,
  "quantity": 2
}
```

Body가 필요한 API와 필요 없는 API를 구분해서 요청을 보내야 한다.

## 7) Header

요청의 부가 정보다.

### Content-Type

Body 데이터 형식을 알려준다.

```js
headers: {
  "Content-Type": "application/json",
}
```

### Authorization

로그인 사용자 인증 토큰을 전달할 때 사용한다.

```js
headers: {
  Authorization: `Bearer ${accessToken}`,
}
```

인증이 필요한 API에 토큰 없이 요청하면 보통 `401 Unauthorized`가 발생한다.

---

## 8) Response

백엔드가 프론트로 돌려주는 응답 데이터다.

```json
{
  "data": {
    "id": 3,
    "name": "오버핏 후드티",
    "price": 39000,
    "description": "부드러운 소재의 후드티입니다.",
    "imageUrl": "https://...",
    "stock": 20
  }
}
```

프론트는 이 Response를 파싱해서 화면 상태를 갱신한다.

## 9) Status Code

요청 결과를 숫자로 알려주는 값이다.

- `2xx`: 성공
- `3xx`: 리다이렉션
- `4xx`: 클라이언트 요청 오류
- `5xx`: 서버 오류

자주 보는 코드:

- `200 OK` → 정상 처리
- `201 Created` → 생성 성공
- `400 Bad Request` → 잘못된 요청 형식
- `401 Unauthorized` → 인증 필요/실패
- `403 Forbidden` → 권한 부족
- `404 Not Found` → 리소스 없음
- `500 Internal Server Error` → 서버 내부 오류
- `503 Service Unavailable` → 서버 일시 불가

---

## 쿠키, 세션, 토큰 인증 정리

### 쿠키(Cookie)

브라우저에 저장되는 작은 데이터다.

서버가 `Set-Cookie`를 내려주면 브라우저가 저장하고, 이후 같은 도메인 요청에 자동 포함해 전송한다.

### 세션(Session)

실제 사용자 상태는 서버가 저장하고, 브라우저는 세션 ID가 담긴 쿠키를 보낸다.

즉, 쿠키에는 식별자만, 사용자 데이터는 서버에 저장하는 방식이다.

### 토큰 기반 인증(JWT)

프론트가 토큰을 직접 저장하고 `Authorization` 헤더에 넣어 전송한다.

```txt
Authorization: Bearer accessToken
```

쿠키 기반은 자동 전송이 편하고, 토큰 기반은 클라이언트가 직접 제어하기 쉽다.

---

## 환경변수(.env)와 .gitignore

API URL 같은 환경별 설정값은 코드에 하드코딩하지 않고 `.env`로 분리한다.

```txt
API_URL=https://api.example.com
```

```js
const BASE_URL = process.env.API_URL;
```

`.env` 파일에는 민감 정보가 들어갈 수 있으므로 반드시 `.gitignore`에 포함해야 한다.

```gitignore
node_modules/
.env
.env.local
.env.*
```

주의할 점은, 프론트 `.env` 값은 완전한 보안 수단이 아니라는 점이다.

API URL 같은 설정값 관리에는 적합하지만, Secret Key/DB 비밀번호 같은 값은 프론트에 두면 안 된다.

---

## 마무리

API 연동은 결국 "명세를 정확히 읽고, 요청을 정확한 형식으로 보내는 것"이 핵심이다.

실전에서는 에러가 나면 감으로 고치기보다 Method, Endpoint, Header, Body, Status Code 순서대로 체크하는 습관이 훨씬 빠르게 문제를 해결해준다.
