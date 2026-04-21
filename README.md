# Todo 어플리케이션

React와 Node.js를 사용한 풀스택 Todo 관리 애플리케이션입니다.

## 주요 기능

- ✅ 할 일 CRUD (생성, 조회, 수정, 삭제)
- 🎯 우선순위 설정 (높음, 보통, 낮음)
- 📁 카테고리 관리 및 분류
- 📅 마감일 설정 및 알림
- 🔍 검색 및 필터링
- 📊 정렬 기능 (생성일, 마감일, 우선순위, 제목)
- 🎨 반응형 UI (Tailwind CSS)

## 기술 스택

### 프론트엔드
- React 18 + TypeScript
- Vite (빌드 툴)
- Tailwind CSS (스타일링)
- Zustand (상태 관리)
- Axios (HTTP 클라이언트)
- date-fns (날짜 처리)

### 백엔드
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL

## 프로젝트 구조

```
todo-app/
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/    # React 컴포넌트
│   │   ├── hooks/         # 커스텀 훅 (Zustand store)
│   │   ├── services/      # API 호출
│   │   ├── types/         # TypeScript 타입
│   │   └── utils/         # 유틸리티 함수
│   └── package.json
└── server/                # Express 백엔드
    ├── src/
    │   ├── routes/        # API 라우트
    │   ├── controllers/   # 비즈니스 로직
    │   ├── models/        # Prisma 클라이언트
    │   └── index.ts       # 서버 엔트리
    ├── prisma/
    │   └── schema.prisma  # DB 스키마
    └── package.json
```

## 설치 및 실행

### 사전 요구사항
- Node.js 18 이상
- PostgreSQL 14 이상

### 1. 저장소 클론 및 의존성 설치

```bash
# 백엔드 의존성 설치
cd server
npm install

# 프론트엔드 의존성 설치
cd ../client
npm install
```

### 2. 데이터베이스 설정

PostgreSQL 데이터베이스를 생성하고 환경 변수를 설정합니다.

```bash
cd server
cp .env.example .env
```

`.env` 파일을 편집하여 데이터베이스 연결 정보를 입력합니다:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/todo_db?schema=public"
PORT=5000
```

### 3. 데이터베이스 마이그레이션

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 4. 서버 실행

#### 개발 모드

터미널 1 - 백엔드:
```bash
cd server
npm run dev
```

터미널 2 - 프론트엔드:
```bash
cd client
npm run dev
```

#### 프로덕션 빌드

```bash
# 백엔드 빌드
cd server
npm run build
npm start

# 프론트엔드 빌드
cd client
npm run build
npm run preview
```

### 5. 애플리케이션 접속

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## API 엔드포인트

### Todo API

- `GET /api/todos` - 할 일 목록 조회 (필터링, 검색 지원)
  - Query Parameters: `completed`, `priority`, `categoryId`, `search`, `sortBy`, `order`
- `GET /api/todos/:id` - 특정 할 일 조회
- `POST /api/todos` - 새 할 일 생성
- `PUT /api/todos/:id` - 할 일 수정
- `DELETE /api/todos/:id` - 할 일 삭제

### Category API

- `GET /api/categories` - 카테고리 목록 조회
- `POST /api/categories` - 새 카테고리 생성
- `PUT /api/categories/:id` - 카테고리 수정
- `DELETE /api/categories/:id` - 카테고리 삭제

## 주요 컴포넌트

- **App.tsx** - 메인 애플리케이션 컴포넌트
- **TodoList.tsx** - 할 일 목록 표시
- **TodoItem.tsx** - 개별 할 일 아이템
- **TodoForm.tsx** - 할 일 추가/수정 폼
- **FilterBar.tsx** - 검색 및 필터 바
- **CategoryManager.tsx** - 카테고리 관리

## 데이터베이스 스키마

### Todo 테이블
```prisma
model Todo {
  id          String    @id @default(uuid())
  title       String
  description String?
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  dueDate     DateTime?
  categoryId  String?
  category    Category?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Category 테이블
```prisma
model Category {
  id        String   @id @default(uuid())
  name      String   @unique
  color     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  todos     Todo[]
}
```

## 개발 팁

### Prisma Studio 사용
데이터베이스를 GUI로 확인하고 관리하려면:
```bash
cd server
npx prisma studio
```

### 데이터베이스 리셋
```bash
cd server
npx prisma migrate reset
```

## 라이선스

MIT

## 기여

이슈와 PR을 환영합니다!
