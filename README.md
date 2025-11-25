# ReAcademix

학원 관리 시스템을 위한 통합 대시보드 및 리포트 생성 플랫폼입니다. Firebase Studio와 Next.js를 기반으로 구축되었으며, 학생 데이터 관리, 자동화된 리포트 생성, AI 기반 데이터 검증 등의 기능을 제공합니다.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-orange?logo=firebase)

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [사전 요구사항](#-사전-요구사항)
- [설치 방법](#-설치-방법)
- [실행 방법](#️-실행-방법)
- [프로젝트 구조](#-프로젝트-구조)
- [환경 변수 설정](#-환경-변수-설정)
- [주요 스크립트](#-주요-스크립트)
- [문제 해결](#-문제-해결)
- [배포](#-배포)
- [문서](#-문서)

## 🎯 프로젝트 개요

ReAcademix는 학원 운영진을 위한 종합 관리 시스템입니다. 학생 데이터를 효율적으로 관리하고, 리포트 생성 시간을 대폭 단축하며, AI를 활용한 데이터 검증을 통해 데이터 품질을 향상시킵니다.

### 핵심 가치

- **효율성**: 리포트 생성 시간 단축
- **정확성**: AI 기반 데이터 검증
- **편의성**: 직관적인 대시보드 인터페이스
- **신뢰성**: Firebase 기반 안정적인 인프라

## ✨ 주요 기능

### 1. 보안 로그인
- 이메일/비밀번호 기반 인증 시스템
- Firebase Authentication 통합
- 안전한 세션 관리

### 2. 중앙화된 대시보드
- 주요 성과 지표(KPI) 실시간 표시
- 최근 활동 내역 추적
- 성능 추이 차트 시각화
- 지점별 성과 비교

### 3. 학생 데이터 관리
- 전체 학생 목록 조회
- 검색 및 필터링 기능
- 학생별 상세 정보 관리
- 출석률, 평균 점수 등 핵심 지표 표시

### 4. 자동화된 리포트 생성
- 템플릿 기반 리포트 생성
- 대상 학생 선택 기능
- 날짜 범위 지정
- 리포트 생성 시간 대폭 단축

### 5. 실시간 리포트 상태 추적
- 리포트 생성 진행 상황 모니터링
- 완료 시 다운로드 기능
- 오류 발생 시 알림 제공

### 6. AI 기반 데이터 검증 도구
- Excel 파일 업로드 및 검증
- AI를 활용한 누락 데이터 감지
- 오류 하이라이트 및 수정 가이드
- 대화형 데이터 입력 도구

### 7. 리포트 히스토리 및 설정
- 리포트 생성 및 전송 이력 관리
- 이메일/SMS 설정 커스터마이징
- 전송 상태 추적

## 🛠 기술 스택

### 프론트엔드
- **Next.js 15.3.3** - React 프레임워크 (App Router)
- **React 18.3.1** - UI 라이브러리
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS 3.4.1** - 유틸리티 기반 CSS 프레임워크
- **Radix UI** - 접근성 우선 컴포넌트 라이브러리
- **Recharts 2.15.1** - 차트 시각화
- **React Hook Form 7.54.2** - 폼 관리
- **Zod 3.24.2** - 스키마 검증

### 백엔드 & 인프라
- **Firebase 11.9.1** - 백엔드 서비스
  - Authentication
  - Firestore
  - App Hosting
- **Genkit 1.20.0** - AI 워크플로우 관리
- **Google GenAI** - AI 모델 통합

### 개발 도구
- **Turbopack** - 빠른 번들링
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 후처리

## 📦 사전 요구사항

프로젝트를 실행하기 전에 다음이 설치되어 있어야 합니다:

### 필수 요구사항

- **Node.js** 18.x 이상 (권장: 20.x LTS)
- **npm** 9.x 이상 (또는 **yarn**, **pnpm**)
- **Git** 2.x 이상

### 선택적 요구사항

- **Firebase CLI** (배포 시 필요)
- **VS Code** 또는 다른 코드 에디터

### 설치 확인 방법

터미널(또는 명령 프롬프트)을 열고 다음 명령어로 버전을 확인하세요:

```bash
# Node.js 버전 확인 (18.0.0 이상이어야 함)
node --version

# npm 버전 확인 (9.0.0 이상이어야 함)
npm --version

# Git 버전 확인
git --version
```

**예상 출력 예시**:
```
v20.11.0
10.2.4
git version 2.42.0
```

### Node.js가 설치되어 있지 않은 경우

1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 프로그램 실행 및 기본 설정으로 설치
3. 설치 완료 후 터미널을 재시작
4. 위의 확인 명령어로 설치 확인

## 🚀 설치 방법

이 섹션에서는 프로젝트를 처음부터 설치하는 방법을 단계별로 안내합니다.

### 1단계: 저장소 클론

프로젝트를 로컬 컴퓨터에 다운로드합니다.

#### Windows (PowerShell 또는 명령 프롬프트)

```powershell
# 원하는 디렉토리로 이동 (예: C:\Users\YourName\Projects)
cd C:\Users\YourName\Projects

# 저장소 클론
git clone <repository-url>

# 프로젝트 디렉토리로 이동
cd firebase-studio-reacademix
```

#### macOS / Linux (터미널)

```bash
# 원하는 디렉토리로 이동 (예: ~/Projects)
cd ~/Projects

# 저장소 클론
git clone <repository-url>

# 프로젝트 디렉토리로 이동
cd firebase-studio-reacademix
```

**확인 방법**: `ls` (macOS/Linux) 또는 `dir` (Windows) 명령어로 파일 목록이 보이면 성공입니다.

---

### 2단계: 의존성 설치

프로젝트에 필요한 모든 패키지를 설치합니다.

```bash
npm install
```

**설치 과정 설명**:
- 이 명령어는 `package.json` 파일을 읽어 필요한 모든 패키지를 다운로드합니다
- 처음 실행 시 2-5분 정도 소요될 수 있습니다
- 설치가 완료되면 `node_modules` 폴더가 생성됩니다

**성공 확인**:
```
added 1234 packages, and audited 1235 packages in 2m
```

**오류 발생 시**:
- 네트워크 연결 확인
- `npm cache clean --force` 실행 후 다시 시도
- Node.js 버전이 18 이상인지 확인

---

### 3단계: 환경 변수 설정

애플리케이션이 정상 작동하려면 Firebase 설정이 필요합니다.

#### 3-1. 환경 변수 파일 생성

프로젝트 루트 디렉토리(`firebase-studio-reacademix`)에 `.env.local` 파일을 생성합니다.

**Windows (PowerShell)**:
```powershell
New-Item -Path .env.local -ItemType File
```

**Windows (명령 프롬프트)**:
```cmd
type nul > .env.local
```

**macOS / Linux**:
```bash
touch .env.local
```

또는 코드 에디터에서 직접 새 파일을 생성할 수도 있습니다.

#### 3-2. Firebase 프로젝트 설정 가져오기

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. 프로젝트 설정(⚙️) > 일반 설정으로 이동
4. "내 앱" 섹션에서 웹 앱 추가 (이미 있다면 선택)
5. Firebase 구성 값 복사

#### 3-3. 환경 변수 파일 작성

`.env.local` 파일을 열고 다음 내용을 추가합니다:

```env
# Firebase 설정 (Firebase 콘솔에서 복사한 값으로 교체)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Genkit AI 설정 (선택사항 - AI 기능 사용 시에만 필요)
GENKIT_ENV=dev
GOOGLE_GENAI_API_KEY=your_genai_api_key_here
```

**중요 사항**:
- `your_`로 시작하는 부분을 실제 값으로 반드시 교체해야 합니다
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함되어 있음)
- 파일 저장 후 개발 서버를 재시작해야 변경사항이 적용됩니다

**Firebase 설정이 없는 경우**:
- 개발 초기 단계에서는 환경 변수 없이도 UI는 확인할 수 있습니다
- Firebase 기능(인증, 데이터베이스 등)은 작동하지 않습니다
- 더미 데이터로 기본 기능을 테스트할 수 있습니다

## ▶️ 실행 방법

### 개발 서버 실행 (기본)

가장 일반적인 개발 방법입니다.

#### 1단계: 개발 서버 시작

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
npm run dev
```

#### 2단계: 서버 시작 확인

터미널에 다음과 같은 메시지가 표시되면 성공입니다:

```
▲ Next.js 15.3.3
- Local:        http://localhost:9002
- Ready in 2.3s
```

#### 3단계: 브라우저에서 접속

웹 브라우저(Chrome, Firefox, Edge 등)를 열고 다음 주소로 접속합니다:

```
http://localhost:9002
```

**자동으로 브라우저가 열리지 않는 경우**:
- 주소창에 `http://localhost:9002`를 직접 입력하세요
- 포트 번호(9002)가 다른 경우, 터미널에 표시된 주소를 사용하세요

#### 4단계: 애플리케이션 확인

다음과 같은 화면이 보이면 정상적으로 실행된 것입니다:
- 로그인 페이지 또는 대시보드 페이지
- 에러 메시지 없이 페이지가 로드됨

**개발 서버 중지 방법**:
- 터미널에서 `Ctrl + C` (Windows/Linux) 또는 `Cmd + C` (macOS)를 누릅니다

---

### Genkit AI 개발 서버 실행 (선택사항)

AI 데이터 검증 기능을 사용하거나 개발하려면 별도의 Genkit 서버가 필요합니다.

#### 새 터미널 창 열기

개발 서버가 실행 중인 상태에서 **새 터미널 창**을 엽니다.

#### Genkit 서버 실행

```bash
npm run genkit:dev
```

**또는 파일 변경 시 자동 재시작**:

```bash
npm run genkit:watch
```

**성공 확인**:
```
Genkit server running at http://localhost:4000
```

**중요**: 
- Genkit 서버는 AI 기능을 사용할 때만 필요합니다
- 일반적인 UI 개발에는 필요하지 않습니다
- 환경 변수 `GOOGLE_GENAI_API_KEY`가 설정되어 있어야 합니다

---

### 프로덕션 빌드 및 실행

실제 배포 환경과 유사하게 테스트하려면 프로덕션 빌드를 사용합니다.

#### 1단계: 프로덕션 빌드 생성

```bash
npm run build
```

**빌드 과정**:
- TypeScript 컴파일
- 코드 최적화 및 번들링
- 정적 페이지 생성
- 약 1-3분 소요

**성공 확인**:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

#### 2단계: 프로덕션 서버 시작

```bash
npm start
```

**접속 주소**:
```
http://localhost:3000
```

**개발 서버와의 차이점**:
- 더 빠른 로딩 속도
- 최적화된 코드
- 프로덕션 환경과 동일한 동작
- Hot reload 없음 (코드 변경 시 서버 재시작 필요)

---

### 실행 모드 비교

| 모드 | 명령어 | 포트 | Hot Reload | 최적화 | 용도 |
|------|--------|------|------------|--------|------|
| 개발 | `npm run dev` | 9002 | ✅ | ❌ | 개발 중 |
| 프로덕션 | `npm start` | 3000 | ❌ | ✅ | 배포 전 테스트 |
| Genkit | `npm run genkit:dev` | 4000 | ✅ | ❌ | AI 기능 개발 |

## 📁 프로젝트 구조

```
firebase-studio-reacademix/
├── src/
│   ├── ai/                    # AI 관련 코드
│   │   ├── dev.ts            # Genkit 개발 설정
│   │   ├── genkit.ts         # Genkit 구성
│   │   └── flows/            # AI 워크플로우
│   │       └── validate-uploaded-data.ts
│   ├── app/                   # Next.js App Router
│   │   ├── dashboard/        # 대시보드 페이지
│   │   │   ├── data/        # 데이터 관리 페이지
│   │   │   ├── reports/     # 리포트 페이지
│   │   │   ├── settings/    # 설정 페이지
│   │   │   └── students/    # 학생 관리 페이지
│   │   ├── login/           # 로그인 페이지
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 홈 페이지 (대시보드로 리다이렉트)
│   ├── components/          # React 컴포넌트
│   │   ├── dashboard/       # 대시보드 컴포넌트
│   │   ├── data/            # 데이터 관리 컴포넌트
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   ├── reports/         # 리포트 컴포넌트
│   │   ├── shared/          # 공유 컴포넌트
│   │   ├── students/        # 학생 관리 컴포넌트
│   │   └── ui/              # UI 컴포넌트 (shadcn/ui)
│   ├── hooks/               # 커스텀 React 훅
│   └── lib/                 # 유틸리티 및 타입 정의
│       ├── types.ts         # TypeScript 타입 정의
│       └── utils.ts         # 유틸리티 함수
├── docs/                    # 문서
│   ├── ARCHITECTURE_OVERVIEW.md  # 아키텍처 개요
│   ├── USER_WORKFLOW.md          # 사용자 워크플로우
│   ├── COMPONENT_ANALYSIS.md     # 컴포넌트 분석
│   ├── CODE_QUALITY.md           # 코드 품질 평가
│   ├── component-tree.md         # 컴포넌트 트리 구조
│   └── blueprint.md              # 프로젝트 설계 문서
├── apphosting.yaml          # Firebase App Hosting 설정
├── next.config.ts           # Next.js 설정
├── tailwind.config.ts       # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
└── package.json            # 프로젝트 의존성 및 스크립트
```

## 🔧 환경 변수 설정

### 필수 환경 변수

프로젝트를 정상적으로 실행하려면 다음 환경 변수가 필요합니다:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 선택적 환경 변수

AI 기능을 사용하려면:

- `GOOGLE_GENAI_API_KEY`

## 📜 주요 스크립트

프로젝트에서 사용 가능한 npm 스크립트:

| 스크립트 | 설명 |
|---------|------|
| `npm run dev` | 개발 서버 실행 (포트 9002, Turbopack 사용) |
| `npm run genkit:dev` | Genkit AI 개발 서버 실행 |
| `npm run genkit:watch` | Genkit AI 개발 서버 실행 (파일 변경 감지) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint로 코드 검사 |
| `npm run typecheck` | TypeScript 타입 검사 |

## 🚢 배포

### Firebase App Hosting 배포

이 프로젝트는 Firebase App Hosting을 사용하여 배포할 수 있습니다.

#### 사전 준비

1. Firebase 프로젝트가 생성되어 있어야 합니다
2. Firebase 콘솔에서 App Hosting이 활성화되어 있어야 합니다

#### 1단계: Firebase CLI 설치

전역으로 Firebase CLI를 설치합니다:

```bash
npm install -g firebase-tools
```

**설치 확인**:
```bash
firebase --version
```

#### 2단계: Firebase 로그인

Firebase 계정으로 로그인합니다:

```bash
firebase login
```

브라우저가 자동으로 열리며 Google 계정으로 로그인하세요.

#### 3단계: 프로젝트 초기화

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
firebase init
```

**초기화 과정**:
1. "App Hosting" 선택
2. 기존 Firebase 프로젝트 선택 또는 새 프로젝트 생성
3. 설정 파일 생성 확인

#### 4단계: 프로덕션 빌드

배포 전에 프로덕션 빌드를 생성합니다:

```bash
npm run build
```

#### 5단계: 배포 실행

다음 명령어로 배포를 시작합니다:

```bash
firebase deploy --only hosting
```

**배포 과정**:
- 빌드 파일 업로드
- Firebase 서버에 배포
- 배포 URL 생성

**배포 완료 후**:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project/overview
Hosting URL: https://your-project.web.app
```

### 배포 설정

`apphosting.yaml` 파일에서 배포 설정을 관리할 수 있습니다:

```yaml
runConfig:
  maxInstances: 1  # 트래픽에 따라 자동으로 인스턴스 수 조정
```

### 배포 후 확인 사항

1. **배포된 URL 접속**: Hosting URL로 접속하여 정상 작동 확인
2. **환경 변수 설정**: Firebase 콘솔에서 환경 변수가 올바르게 설정되었는지 확인
3. **도메인 연결** (선택사항): 커스텀 도메인 연결

### 배포 롤백

문제가 발생한 경우 이전 버전으로 롤백할 수 있습니다:

```bash
# 배포 이력 확인
firebase hosting:channel:list

# 특정 버전으로 롤백
firebase hosting:rollback
```

## 🎨 스타일 가이드

프로젝트는 다음 디자인 시스템을 따릅니다:

- **주요 색상**: 신뢰감을 주는 파란색 (#4285F4)
- **배경 색상**: 밝은 회색 (#F5F5F5)
- **강조 색상**: 부드러운 청록색 (#009688)
- **본문 폰트**: Inter (가독성 최적화)
- **제목 폰트**: Space Grotesk (현대적이고 기술적인 느낌)

## 🔧 문제 해결

### 일반적인 문제

#### 1. 포트가 이미 사용 중입니다

**오류 메시지**:
```
Error: listen EADDRINUSE: address already in use :::9002
```

**해결 방법**:
```bash
# Windows: 포트를 사용하는 프로세스 찾기
netstat -ano | findstr :9002

# macOS/Linux: 포트를 사용하는 프로세스 찾기
lsof -i :9002

# 프로세스 종료 후 다시 실행
```

또는 다른 포트 사용:
```bash
npm run dev -- -p 9003
```

---

#### 2. 모듈을 찾을 수 없습니다

**오류 메시지**:
```
Module not found: Can't resolve '@/components/...'
```

**해결 방법**:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

#### 3. 환경 변수가 적용되지 않습니다

**해결 방법**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일명이 정확한지 확인 (`.env.local` - 앞에 점 포함)
3. 개발 서버를 완전히 종료 후 재시작
4. 환경 변수 이름이 `NEXT_PUBLIC_`로 시작하는지 확인

---

#### 4. TypeScript 오류

**해결 방법**:
```bash
# 타입 검사만 실행
npm run typecheck

# 오류 메시지를 확인하고 수정
# 또는 임시로 타입 체크 건너뛰기 (권장하지 않음)
```

---

#### 5. 빌드 실패

**해결 방법**:
```bash
# .next 폴더 삭제 후 재빌드
rm -rf .next
npm run build
```

---

### Firebase 관련 문제

#### Firebase 연결 오류

**증상**: 로그인 또는 데이터 로드 실패

**확인 사항**:
1. `.env.local` 파일의 Firebase 설정 값이 올바른지 확인
2. Firebase 콘솔에서 프로젝트가 활성화되어 있는지 확인
3. Firebase Authentication이 활성화되어 있는지 확인
4. 브라우저 콘솔에서 에러 메시지 확인 (F12)

---

### 성능 문제

#### 개발 서버가 느립니다

**해결 방법**:
- Turbopack이 이미 활성화되어 있습니다 (`--turbopack` 플래그)
- `node_modules`가 많다면 시간이 걸릴 수 있습니다
- SSD 사용 시 더 빠릅니다

---

### 추가 도움말

문제가 계속되면:
1. 브라우저 콘솔(F12)에서 에러 메시지 확인
2. 터미널의 전체 에러 메시지 확인
3. GitHub Issues에 문제 보고

---

## 📚 문서

프로젝트의 상세한 문서는 `docs/` 디렉토리에서 확인할 수 있습니다:

### 핵심 문서

- **[ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md)** - 전체 아키텍처 개요
  - 컴포넌트 역할, Props 구조, 데이터 흐름, 이벤트 흐름
  - Custom Hooks 설명
  - 아키텍처 패턴 및 성능 최적화 전략

- **[USER_WORKFLOW.md](docs/USER_WORKFLOW.md)** - 사용자 워크플로우
  - 핵심 UX 흐름 문서화
  - 주요 사용자 시나리오
  - 사용자 인터랙션 패턴

- **[COMPONENT_ANALYSIS.md](docs/COMPONENT_ANALYSIS.md)** - 컴포넌트 분석
  - 컴포넌트 트리 구조
  - 컴포넌트 분류 및 의존성 분석
  - 개선점 및 권장사항

- **[CODE_QUALITY.md](docs/CODE_QUALITY.md)** - 코드 품질 평가
  - 가독성, 재사용성, 유지보수성, 일관성, 성능 평가
  - 개선 완료 사항
  - 향후 개선 계획

### 참고 문서

- **[component-tree.md](docs/component-tree.md)** - 컴포넌트 트리 구조 상세
- **[blueprint.md](docs/blueprint.md)** - 프로젝트 설계 문서

### 문서 업데이트

모든 주요 컴포넌트에는 상세한 docstring이 포함되어 있으며, 코드와 문서가 함께 유지보수됩니다.

---

## 📝 추가 정보

### 기술적 세부사항

- **프레임워크**: Next.js 15 App Router 사용
- **UI 라이브러리**: Radix UI + shadcn/ui 기반 컴포넌트
- **타입 안정성**: TypeScript strict 모드
- **스타일링**: Tailwind CSS 유틸리티 클래스 (Best Practice 적용)
- **상태 관리**: React Hooks + Custom Hooks
- **폼 관리**: React Hook Form + Zod 검증
- **성능 최적화**: useMemo, useCallback, Cleanup 처리

### 개발 워크플로우

1. **기능 개발**: `src/app/` 또는 `src/components/`에서 작업
2. **타입 정의**: `src/lib/types.ts`에 추가
3. **유틸리티 함수**: `src/lib/utils.ts` 또는 `src/lib/utils/*.ts`에 추가
4. **스타일 수정**: Tailwind 클래스 또는 `src/lib/utils/styles.ts`의 유틸리티 사용
5. **Custom Hook**: `src/hooks/`에 추가
6. **문서화**: 컴포넌트에 docstring 추가

### 파일 구조 규칙

- **페이지**: `src/app/**/page.tsx`
- **레이아웃**: `src/app/**/layout.tsx`
- **컴포넌트**: `src/components/**/*.tsx`
  - `layout/`: 레이아웃 컴포넌트
  - `shared/`: 공유 컴포넌트
  - `dashboard/`, `students/`, `reports/`, `data/`: 기능별 컴포넌트
- **Hooks**: `src/hooks/*.ts`
- **타입**: `src/lib/types.ts`
- **유틸리티**: `src/lib/utils.ts` 또는 `src/lib/utils/*.ts`
- **스타일**: `src/lib/utils/styles.ts`

### 코드 품질

- **종합 점수**: 4.3/5.0 ⭐⭐⭐⭐
- **재사용성**: 4.5/5.0 (Custom Hooks, 재사용 가능한 컴포넌트)
- **성능**: 4.0/5.0 (메모이제이션, Cleanup 처리)
- **가독성**: 4.5/5.0 (Docstring, 명확한 네이밍)
- **일관성**: 4.5/5.0 (스타일 시스템, 코딩 컨벤션)

자세한 내용은 [CODE_QUALITY.md](docs/CODE_QUALITY.md)를 참고하세요.

## 🤝 기여

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.

## 📞 문의

프로젝트에 대한 질문이나 문제가 있으시면 이슈를 생성해 주세요.

---

**ReAcademix** - 학원 관리의 새로운 표준
