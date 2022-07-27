# 🧴Commerce

## 프로젝트 소개

인코스런에서 진행한 화장품 커머스 웹 어플리케이션 프로젝트입니다.</br>
[👉 사이트 바로가기](https://incourserun.cf/)

* Github Repo
    * Frontend: https://github.com/INCOURSE-RUN/2-incourserun-commerce-fe
    * Backend: https://github.com/INCOURSE-RUN/2-incourserun-commerce-be

## 개발 기간 및 인원

* 개발 기간: 2022.06.13 ~ 2022.07.29
* 개발 인원
    * Frontend: 1명 (박태준)
    * Backend: 2명 (모창일, 최보미)

## 사용 기술

### Frontend

<section>
<img src="https://img.shields.io/badge/HTML5-E34F26?&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Typescript-3178C6?&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Chakra%20UI-319795?&logo=Chakra%20UI&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?&logo=React&logoColor=black" />
<img src ="https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white"/>
</section>

### Backend

<section>
<img src="https://img.shields.io/badge/Django-092E20?logo=Django&logoColor=white"/>
<img src="https://img.shields.io/badge/Django%20REST%20Framework-092E20?logo=Django&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=PostgreSQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon%20RDS-527FFF?logo=Amazon%20RDS&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon%20S3-569A31?logo=Amazon%20S3&logoColor=white"/>
</section>

### Server

<section>
<img src="https://img.shields.io/badge/Amazon%20AWS-232F3E?logo=Amazon%20AWS&logoColor=white"/>

<img src="https://img.shields.io/badge/Docker-2496ED?logo=Docker&logoColor=white"/>
</section>

### Common

<section>
<img src="https://img.shields.io/badge/Git-F05032?logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/Github-181717?logo=Github&logoColor=white">
<img src="https://img.shields.io/badge/Github%20Actions-2088FF?logo=GithubActions&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=black">
<img src="https://img.shields.io/badge/Postman-FF6C37?logo=Postman&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Slack-4A154B?logo=Slack&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white">
</section>

## 구현 기능

### 🔐 로그인/회원가입

- Kakao 계정 소셜로그인으로 간편하게 회원가입이 가능합니다.
- 이후 회원가입 페이지에서 추가정보를 작성하여 회원가입을 완료하고 서비스를 이용할 수 있습니다.

👇 로그인 → 회원가입 → 메인페이지 → 로그아웃</br>
![](https://i.imgur.com/GZKTfcc.gif)

### 🍔 햄버거탭

- 메뉴바를 열어서 홈, 상품보기, 마이페이지로 이동할 수 있습니다.

### 👀 상품보기

* 상품 목록
    - 상품 목록의 상품카드들을 보고 상품의 간략한 정보를 알 수 있습니다.
    - 상품카드를 클릭하면 상품 상세페이지로 이동합니다.

* 상품 상세페이지
    - 상품의 상세정보, 구매정보 그리고 리뷰를 확인할 수 있습니다.

👇 메인페이지 → 상품목록 → 상세페이지</br>
![](https://i.imgur.com/NKbocPE.gif)

### 🛒 장바구니

- 장바구니에서 상품보기에서 담은 상품들을 확인할 수 있습니다.
- 주문할 상품을 선택 및 수량 변경을 하고 결제하기 버튼을 눌러 주문결제로 넘어갑니다.

👇 장바구니 전체삭제 → 빈 장바구니 → 상품목록에서 장바구니 담기</br>
![](https://i.imgur.com/YF9u2WB.gif)

### 📦 주문하기

- 상품선택 → 바로구매 또는 장바구니 → 결제하기로 주문을 진행할 수 있습니다.
- PC와 모바일 환경에서 모두 결제가 가능합니다.

👇 장바구니 → 주문 → 메인페이지</br>
![](https://i.imgur.com/DoOjLfq.gif)

👇 상품 상세페이지 → 바로구매 → 주문목록</br>
![](https://i.imgur.com/wqa3mc3.gif)

### 👤 마이페이지

* 회원정보 수정
    - 프로필사진, 닉네임 등의 회원정보를 수정할 수 있습니다.
* 주문내역
    - 날짜별, 주문별로 주문내역을 확인할 수 있습니다.
* 내상품 리뷰
    - 배송완료된 상품에 대해 리뷰를 작성할 수 있습니다.
    - 주문별로 각 상품에 대해 1회만 작성 가능합니다.
* 회원탈퇴
    - 탈퇴 사유 및 '인코스런' 텍스트를 입력해야 탈퇴가 가능합니다.
    - 탈퇴하기 버튼을 누르면 탈퇴 사유가 저장되고 사용자 정보는 초기화되며, 카카오 계정 연동도 자동으로 해제됩니다.
* 로그아웃
    - 로그아웃 시 '로그아웃 하시겠습니까?'라는 팝업창이 뜹니다.
    - 확인 버튼을 누르면 로그아웃되고 로그인 화면으로 넘어갑니다.

👇 로그인 → 마이페이지 → 회원정보수정 → 로그아웃</br>
![](https://i.imgur.com/sc1Cw3M.gif)

👇 메인페이지 → 마이페이지 → 주문내역 → 주문취소 → 리뷰작성 → 리뷰내역</br>
![](https://i.imgur.com/VmugQoj.gif)

👇 마이페이지 → 탈퇴 → 재가입</br>
![](https://i.imgur.com/RbREGyn.gif)

# 보일러플레이트 가이드

# Next.js starter

Kick off your project with this boilerplate.

# 🚀 Quick Start

```bash
git clone https://github.com/TokTokHan/next-init-2.0.git <Project Name>
cd <Project Name>
yarn install
yarn run dev
```

your site is now running at `http://localhost:3000`

# 📁 Folder Structure

A quick look at the directories you'll see in this project.

### Root driectory layout

    .
    ├── pages               #
    ├── public              #
    ├── styles              #
    ├── apis                #
    ├── models              #
    ├── components          #
    ├── hooks               # Custom hooks
    ├── utils               #
    ├── libs                #
    ├── cypress             # Automated tests
    ├── README.md           #
    └── ...

### Pages

Each page is associated with a route based on its file name.

    .
    ├── ...
    ├── pages               #
    │   ├── apis            # API endpoint
    │   ├── _app.tsx        # App component to initialize pages
    │   ├── _document.tsx   # Custom document to augment application's <html> and <body> tags
    │   └── ...
    └── ...

### Public

Next.js can serve static files, like images, under a folder called public in the root directory.

    .
    ├── ...
    ├── public              #
    │   ├── favicons        #
    │   └── ...
    └── ...

### Styles

Css, theme configuration files are placed into this folder.

    .
    ├── ...
    ├── styles              #
    │   ├── theme.tsx       #
    │   └── ...
    └── ...

### Api

Api call related functions.

### Components

Components are independent and reusable bits of code.

    .
    ├── ...
    ├── components          #
    │ ├── @Icons            # 아이콘~
    │ ├── @Layout           # 레이아웃~
    │ ├── Select            #
    │ ├── Calendar          #
    │ └── ...               #
    └── ...

### Container

Components are independent and reusable bits of code.

    .
    ├── ...
    ├── containers                  # containers에 하위 폴더들은 pages와 1:1 매칭
    │ ├── login                     #
    │ │  ├── _fragments             # _fragment는 Login 페이지에서만 사용되는 컴포넌트
    │ │  │  ├── LoginForm.tsx       # 중복되는 경우에는 components 폴더로 이동
    │ │  │  └── Intro.tsx           #
    │ │  ├── Login.tsx              #
    │ │  ├── LoginContainer.tsx     # LoginContainer 에서 모든 로직에 대한 부분들 작업 (state, props)
    │ │  └── index.tsx              #
    │ ├── home                      #
    │ └── ...                       #
    └── ...

### Hooks

Custom hook allows you to extract some components logic into a reusable function that starts with use and that call can other hooks.

    .
    ├── ...
    ├── hooks                #
    │   ├── useScript.tsx    #
    │   └── ...
    └── ...

### Utils

Small snippets you can use throughout the application. Short and specific functions and constants used throughout application.

### Libs

Libraries you can use throughout the application. A library is a JavaScript file that contains a bunch of functions, and those functions accomplish some specific purpose.

    .
    ├── ...
    ├── libs                  #
    │   ├── gtm.ts            #
    │   └── ...
    └── ...

### Generated

Generated files such as apis, components, ...

    .
    ├── ...
    ├── generated         If you run generate-script, it will be created
    │ ├── apis            # by swagger-typescript-api
    │ ├── mock         # by orval
    └── ...

- **generate apis**

1. set config about gen_api on your .env
2. script

   > ```
   > npm(or yarn) run gen:api
   > ```

3. usage mock data

   > ```
   > mock-data-path: /generated/mock/[filename].msw
   > mock-data: Use Function "~Mock"
   > network-mocking: Use function "~MSW" and set on "_App.ts"
   > ```

   mock-data by [orval](https://orval.dev/reference/configuration/overview), [faker](https://github.com/faker-js/faker), [msw](https://mswjs.io/docs/getting-started/mocks/rest-api)
   api-data by [swagger-typescript-api](https://www.npmjs.com/package/swagger-typescript-api)

### Cypress

Automated tests with cypress.

    .
    ├── ...
    ├── cypess                #
    │ ├── fixtures            # Fixed data sets
    │ ├── integration         # End-to-end, integration tests (alternatively `e2e`)
    │ ├── plugins             #
    │ ├── support             #
    └── ...

### Scripts

there is useful scripts in [package.json](package.json)

- **yarn run gen:api**
  - swagger => axios-api, react-hook, mock-data
- **yarn run gen:icon**
  - svg => chakra-icon

see more [README.md](/src/scripts/README.md)

# 📛 Naming

### 👨‍🦳 React Component

- **Extensions:** Use .tsx extension for React components.

- **Filename:** Use PascalCase for filenames. E.g., ReservationCard.tsx.

- **Reference Naming:** Use PascalCase for React components and camelCase for their instances.

  ```tsx
  // bad
  import reservationCard from './ReservationCard';

  
  
  
  /
  import ReservationCard from './ReservationCard';
  
  
  //
  const ReservationItem = <ReservationCard />;
  
  
  // g
  const reservationItem = <ReservationCard />;
  ```

- **Component Naming:** Use the filename as the component name. For example, ReservationCard.tsx should have a reference name of ReservationCard. However, for root components of a directory, use index.tsx as the filename and use the directory name as the component name:

  ```tsx
  // bad
  import Footer from './Footer/Footer';

  // bad
  import Footer from './Footer/index';

  // good
  import Footer from './Footer';
  ```

### 🐪 Others

Always use camelCase for others.

- scripts
- folders
- variables
- functions

# ⭐️ Stack

- **Framework:** Next.js
- **State Management:** React Query, Context API
- **Styling:** Chakra-ui, Emotion
- **Forms:** React Hook Form
- **Testing:** Cypress

# Reference

- [Folder-Structure-Conventions](https://github.com/kriasoft/Folder-Structure-Conventions/blob/master/README.md)
- [Airbnb React/JSX Style Guide - Naming](https://github.com/airbnb/javascript/tree/master/react#naming)
- [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions)
- [리액트 어플리케이션의 상태 관리하기](https://www.kenrhee.com/blog/react-application-state-management)
