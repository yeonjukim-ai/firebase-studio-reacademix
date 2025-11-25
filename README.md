# ReAcademix

학원 관리 시스템을 위한 통합 대시보드 및 리포트 생성 플랫폼입니다. Firebase Studio와 Next.js를 기반으로 구축되었으며, 학생 데이터 관리, 자동화된 리포트 생성, AI 기반 데이터 검증 등의 기능을 제공합니다.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-orange?logo=firebase)

## 📋 목차

- [① 프로젝트 소개](#-프로젝트-소개)
- [② 주요 기능](#-주요-기능)
- [③ 기술 스택](#-기술-스택)
- [④ 설치/실행 방법](#-설치실행-방법)
- [⑤ 폴더 구조 요약](#-폴더-구조-요약)
- [⑥ 데이터 흐름 개요](#-데이터-흐름-개요)
- [⑦ 향후 개선 아이디어 리스트](#-향후-개선-아이디어-리스트)

---

## ① 프로젝트 소개

### 개요

ReAcademix는 학원 운영진을 위한 종합 관리 시스템입니다. 학생 데이터를 효율적으로 관리하고, 리포트 생성 시간을 대폭 단축하며, AI를 활용한 데이터 검증을 통해 데이터 품질을 향상시킵니다.

### 핵심 가치

- **효율성**: 리포트 생성 시간 단축으로 업무 효율성 향상
- **정확성**: AI 기반 데이터 검증으로 데이터 품질 보장
- **편의성**: 직관적인 대시보드 인터페이스로 쉬운 사용
- **신뢰성**: Firebase 기반 안정적인 인프라

### 프로젝트 목표

1. 학원 관리자의 업무 효율성 향상
2. 학생 데이터 관리의 자동화 및 정확성 개선
3. 리포트 생성 프로세스의 간소화
4. AI 기술을 활용한 데이터 검증 자동화

---

## ② 주요 기능

### 1. 보안 로그인 시스템
- 이메일/비밀번호 기반 인증 시스템
- Firebase Authentication 통합
- 안전한 세션 관리

### 2. 중앙화된 대시보드
- **KPI 카드**: 총 학생 수, 활성 학생 수, 리포트 생성률, 평균 출석률 등 주요 지표 실시간 표시
- **성과 차트**: 지점별 성과 추이를 막대 그래프로 시각화
- **최근 활동**: 최근 생성된 리포트 목록 추적
- 빠른 네비게이션: 데이터 업로드 및 리포트 생성으로의 원클릭 접근

### 3. 학생 데이터 관리
- 전체 학생 목록 조회 및 관리
- **검색 기능**: 이름, 반, ID로 실시간 검색
- **필터링**: 상태(active/inactive/on_leave), 지점별 다중 필터링
- 학생별 상세 정보 조회 (Dialog 모달)
- 출석률, 평균 점수 등 핵심 지표 표시

### 4. 자동화된 리포트 생성
- **템플릿 선택**: 월간 성과 리포트, 시험 분석 리포트, 출결 리포트 등
- **대상 선택**: 전체 학생, 특정 반, 개별 학생 선택
- **날짜 범위 지정**: Calendar 컴포넌트를 통한 직관적인 날짜 선택
- 리포트 생성 진행률 실시간 표시
- 생성 완료 시 다운로드 기능

### 5. AI 기반 데이터 검증 도구
- **파일 업로드**: CSV 파일 드래그 앤 드롭 또는 클릭 업로드
- **AI 검증**: Google GenAI를 활용한 자동 데이터 검증
- **에러 감지**: 누락 데이터, 형식 오류, 유효하지 않은 값 자동 감지
- **인터랙티브 수정**: 에러가 있는 셀을 직접 수정 가능한 테이블 제공
- 에러 하이라이트 및 상세 메시지 표시

### 6. 리포트 이력 관리
- **생성 이력**: 리포트 생성 및 상태 추적
- **전송 이력**: 이메일/SMS 전송 내역 관리
- 상태별 필터링 (completed/failed/in_progress)
- 다운로드 및 재전송 기능

### 7. 설정 관리
- 발신자 정보 설정 (이메일, SMS)
- 알림 템플릿 관리 (이메일/SMS 템플릿)
- 템플릿 테스트 발송 기능

---

## ③ 기술 스택

### 프론트엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 15.3.3 | React 프레임워크 (App Router) |
| **React** | 18.3.1 | UI 라이브러리 |
| **TypeScript** | 5 | 타입 안정성 |
| **Tailwind CSS** | 3.4.1 | 유틸리티 기반 CSS 프레임워크 |
| **Radix UI** | Latest | 접근성 우선 컴포넌트 라이브러리 |
| **shadcn/ui** | - | Radix UI 기반 컴포넌트 시스템 |
| **Recharts** | 2.15.1 | 차트 시각화 |
| **React Hook Form** | 7.54.2 | 폼 관리 |
| **Zod** | 3.24.2 | 스키마 검증 |
| **Lucide React** | 0.475.0 | 아이콘 라이브러리 |

### 백엔드 & 인프라

| 기술 | 버전 | 용도 |
|------|------|------|
| **Firebase** | 11.9.1 | 백엔드 서비스 |
| - Authentication | - | 사용자 인증 |
| - Firestore | - | 데이터베이스 |
| - App Hosting | - | 호스팅 |
| **Genkit** | 1.20.0 | AI 워크플로우 관리 |
| **Google GenAI** | - | AI 모델 통합 |

### 개발 도구

- **Turbopack**: 빠른 번들링 및 개발 서버
- **ESLint**: 코드 품질 관리
- **PostCSS**: CSS 후처리
- **TypeScript**: 타입 체크

---

## ④ 설치/실행 방법

### 사전 요구사항

- **Node.js** 18.x 이상 (권장: 20.x LTS)
- **npm** 9.x 이상 (또는 yarn, pnpm)
- **Git** 2.x 이상

### 설치 방법

#### 1단계: 저장소 클론

```bash
git clone <repository-url>
cd firebase-studio-reacademix
```

#### 2단계: 의존성 설치

```bash
npm install
```

#### 3단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Firebase 설정 (Firebase 콘솔에서 복사한 값으로 교체)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Genkit AI 설정 (AI 기능 사용 시에만 필요)
GENKIT_ENV=dev
GOOGLE_GENAI_API_KEY=your_genai_api_key_here
```

**Firebase 설정 가져오기**:
1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. 프로젝트 설정(⚙️) > 일반 설정으로 이동
4. "내 앱" 섹션에서 웹 앱 추가
5. Firebase 구성 값 복사하여 `.env.local`에 붙여넣기

### 실행 방법

#### 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 브라우저에서 `http://localhost:9002`로 접속합니다.

#### Genkit AI 개발 서버 실행 (선택사항)

AI 데이터 검증 기능을 사용하려면 별도의 터미널에서 Genkit 서버를 실행합니다:

```bash
npm run genkit:dev
```

또는 파일 변경 시 자동 재시작:

```bash
npm run genkit:watch
```

#### 프로덕션 빌드 및 실행

```bash
# 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

### 주요 스크립트

| 스크립트 | 설명 |
|---------|------|
| `npm run dev` | 개발 서버 실행 (포트 9002, Turbopack 사용) |
| `npm run genkit:dev` | Genkit AI 개발 서버 실행 |
| `npm run genkit:watch` | Genkit AI 개발 서버 실행 (파일 변경 감지) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint로 코드 검사 |
| `npm run typecheck` | TypeScript 타입 검사 |

---

## ⑤ 폴더 구조 요약

```
firebase-studio-reacademix/
├── src/
│   ├── ai/                          # AI 관련 코드
│   │   ├── dev.ts                   # Genkit 개발 설정
│   │   ├── genkit.ts                # Genkit 구성
│   │   └── flows/                   # AI 워크플로우
│   │       └── validate-uploaded-data.ts  # 데이터 검증 플로우
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── dashboard/               # 대시보드 페이지들
│   │   │   ├── data/                # 데이터 관리 페이지
│   │   │   ├── reports/             # 리포트 페이지
│   │   │   ├── settings/           # 설정 페이지
│   │   │   ├── students/           # 학생 관리 페이지
│   │   │   ├── layout.tsx          # 대시보드 레이아웃
│   │   │   └── page.tsx            # 대시보드 메인 페이지
│   │   ├── login/                  # 로그인 페이지
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   └── page.tsx               # 홈 페이지 (대시보드로 리다이렉트)
│   │
│   ├── components/                 # React 컴포넌트
│   │   ├── dashboard/              # 대시보드 컴포넌트
│   │   │   ├── KpiCard.tsx        # KPI 카드
│   │   │   ├── PerformanceChart.tsx  # 성과 차트
│   │   │   └── RecentActivityTable.tsx  # 최근 활동 테이블
│   │   ├── data/                   # 데이터 관리 컴포넌트
│   │   │   └── DataManagementClient.tsx  # 데이터 업로드/검증
│   │   ├── layout/                 # 레이아웃 컴포넌트
│   │   │   ├── AppHeader.tsx      # 상단 헤더
│   │   │   └── AppSidebar.tsx     # 사이드바
│   │   ├── reports/                # 리포트 컴포넌트
│   │   │   ├── HistoryTable.tsx   # 리포트 이력 테이블
│   │   │   └── ReportGeneration.tsx  # 리포트 생성
│   │   ├── shared/                 # 공유 컴포넌트
│   │   │   ├── DataTable.tsx      # 재사용 가능한 테이블
│   │   │   ├── PageHeader.tsx     # 페이지 헤더
│   │   │   ├── SectionCard.tsx    # 섹션 카드
│   │   │   └── TableCard.tsx      # 테이블 카드
│   │   ├── students/               # 학생 관리 컴포넌트
│   │   │   └── StudentsTable.tsx  # 학생 목록 테이블
│   │   └── ui/                     # UI 컴포넌트 (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ... (기타 UI 컴포넌트)
│   │
│   ├── hooks/                      # 커스텀 React 훅
│   │   ├── use-mobile.tsx         # 모바일 감지
│   │   ├── use-toast.ts           # 토스트 알림
│   │   ├── useDataValidation.ts  # 데이터 검증 로직
│   │   ├── useReportGeneration.ts # 리포트 생성 로직
│   │   └── useStudentFilter.ts    # 학생 필터링 로직
│   │
│   └── lib/                        # 유틸리티 및 타입 정의
│       ├── dummy-data.ts          # 더미 데이터
│       ├── types.ts               # TypeScript 타입 정의
│       ├── utils.ts               # 유틸리티 함수
│       └── utils/
│           └── styles.ts          # 스타일 유틸리티
│
├── docs/                           # 문서
│   ├── ARCHITECTURE_OVERVIEW.md   # 아키텍처 개요
│   ├── USER_WORKFLOW.md           # 사용자 워크플로우
│   ├── COMPONENT_ANALYSIS.md      # 컴포넌트 분석
│   ├── CODE_QUALITY.md            # 코드 품질 평가
│   ├── component-tree.md          # 컴포넌트 트리 구조
│   └── blueprint.md               # 프로젝트 설계 문서
│
├── apphosting.yaml                # Firebase App Hosting 설정
├── next.config.ts                 # Next.js 설정
├── tailwind.config.ts             # Tailwind CSS 설정
├── tsconfig.json                  # TypeScript 설정
└── package.json                   # 프로젝트 의존성 및 스크립트
```

### 주요 디렉토리 설명

- **`src/app/`**: Next.js App Router 기반 페이지 및 라우팅
- **`src/components/`**: 재사용 가능한 React 컴포넌트
  - `shared/`: 공통 컴포넌트 (PageHeader, SectionCard, DataTable 등)
  - `dashboard/`, `students/`, `reports/`, `data/`: 기능별 컴포넌트
  - `ui/`: shadcn/ui 기반 기본 UI 컴포넌트
- **`src/hooks/`**: 커스텀 React 훅 (비즈니스 로직 분리)
- **`src/lib/`**: 유틸리티 함수, 타입 정의, 더미 데이터
- **`src/ai/`**: Genkit AI 워크플로우 및 설정

---

## ⑥ 데이터 흐름 개요

### 전체 데이터 흐름 아키텍처

```
[사용자 인터랙션]
    ↓
[React 컴포넌트]
    ↓
[Custom Hooks] ←→ [로컬 상태 관리 (useState)]
    ↓
[Firebase Services] ←→ [AI Services (Genkit)]
    ↓
[데이터베이스/스토리지]
```

### 주요 데이터 흐름 패턴

#### 1. 대시보드 데이터 흐름

```
더미 데이터 (dummy-data.ts)
    ↓
DashboardPage 컴포넌트
    ↓
├── KpiCard[] (KPI 데이터)
├── PerformanceChart (차트 데이터)
└── RecentActivityTable (리포트 이력)
```

**특징**:
- 현재는 더미 데이터를 직접 import하여 사용
- 향후 Firebase Firestore와 연동 예정

#### 2. 학생 관리 데이터 흐름

```
더미 데이터 (students)
    ↓
StudentsTable 컴포넌트
    ↓
useStudentFilter Hook
    ├── 검색어 필터링
    ├── 상태 필터링
    └── 지점 필터링
    ↓
필터링된 학생 목록 표시
```

**상태 관리**:
- `searchTerm`: 검색어 (useState)
- `statusFilter`: 상태 필터 배열 (useState)
- `branchFilter`: 지점 필터 배열 (useState)
- `filteredStudents`: 필터링 결과 (useMemo로 메모이제이션)

#### 3. 리포트 생성 데이터 흐름

```
ReportGeneration 컴포넌트
    ↓
useReportGeneration Hook
    ├── 날짜 범위 선택 (DateRange)
    ├── 템플릿 선택
    ├── 대상 선택
    └── 생성 상태 관리
    ↓
생성 진행률 표시 (Progress Bar)
    ↓
생성 완료/실패 처리
```

**상태 관리**:
- `date`: 선택된 날짜 범위
- `generationState`: "idle" | "generating" | "completed" | "failed"
- `progress`: 진행률 (0-100)
- interval과 timeout을 ref로 관리하여 cleanup 처리

#### 4. AI 데이터 검증 데이터 흐름

```
파일 업로드 (CSV)
    ↓
DataManagementClient 컴포넌트
    ↓
useDataValidation Hook
    ├── 파일 파싱
    ├── Data URI 변환
    └── AI 검증 요청
    ↓
Genkit AI 서버 (validateUploadedData Flow)
    ├── Google GenAI API 호출
    └── 검증 결과 반환
    ↓
검증 결과 처리
    ├── 성공: Alert 표시
    └── 실패: 에러 테이블 표시 및 수정 가능
```

**AI 검증 프로세스**:
1. 파일 업로드 → `file` 상태 설정
2. "업로드 및 데이터 검증" 클릭 → `state`를 'validating'으로 변경
3. Genkit AI Flow 호출 → `validateUploadedData` 실행
4. AI가 데이터 분석 → 검증 결과 반환
5. 결과에 따라 성공/실패 UI 표시

#### 5. 컴포넌트 간 데이터 전달

**Props 기반 전달**:
```
부모 컴포넌트
    ↓ (Props)
자식 컴포넌트
```

**Hook 기반 상태 관리**:
```
컴포넌트
    ↓ (Hook 호출)
Custom Hook
    ├── 상태 관리 (useState)
    ├── 부수 효과 (useEffect)
    └── 계산된 값 (useMemo)
```

### 데이터 흐름 특징

1. **단방향 데이터 흐름**: React의 표준 패턴 준수
2. **Hook 기반 로직 분리**: 복잡한 비즈니스 로직을 Custom Hook으로 분리
3. **메모이제이션 최적화**: useMemo, useCallback으로 불필요한 재계산 방지
4. **Cleanup 처리**: useEffect cleanup으로 메모리 누수 방지

### 향후 개선 방향

- **Firebase Firestore 연동**: 더미 데이터를 실제 데이터베이스로 교체
- **React Query 도입**: 서버 상태 관리 및 캐싱
- **실시간 업데이트**: Firestore 실시간 리스너 활용
- **API 레이어 구축**: 데이터 페칭 로직을 별도 레이어로 분리

---

## ⑦ 향후 개선 아이디어 리스트

### 🔴 우선순위 높음 (1-2개월)

#### 1. 테스트 코드 추가
- **Unit 테스트**: 컴포넌트, hooks 테스트
- **Integration 테스트**: 주요 워크플로우 테스트
- **도구**: Vitest, React Testing Library
- **예상 시간**: 2-3주
- **목표 커버리지**: 80% 이상

#### 2. 에러 처리 강화
- **Error Boundary**: 전역 에러 처리 컴포넌트 추가
- **통일된 에러 처리**: 에러 처리 유틸리티 함수 생성
- **에러 로깅**: 에러 발생 시 로깅 시스템 연동
- **예상 시간**: 1주

#### 3. 접근성 개선
- **ARIA 라벨**: 스크린 리더 지원 강화
- **키보드 네비게이션**: 모든 인터랙티브 요소 키보드 접근 가능
- **포커스 관리**: 모달, 드롭다운 등에서 포커스 트랩 구현
- **예상 시간**: 1-2주

### 🟡 우선순위 중간 (2-4개월)

#### 4. 컴포넌트 분리 및 리팩토링
- **대형 컴포넌트 분리**: StudentsTable, DataManagementClient를 더 작은 컴포넌트로 분리
- **예상 분리 대상**:
  - `StudentSearchBar`
  - `StudentFilterMenu`
  - `StudentTable`
  - `StudentDetailDialog`
- **예상 시간**: 2주

#### 5. 상태 관리 개선
- **전역 상태 관리**: Zustand 또는 Jotai 도입 고려
- **적용 대상**: 사이드바 상태, 사용자 정보, 테마 설정
- **예상 시간**: 1주

#### 6. API 호출 최적화
- **React Query 또는 SWR 도입**: 서버 상태 관리 및 캐싱
- **기능**: 자동 재시도, 백그라운드 업데이트, 캐시 무효화
- **예상 시간**: 2주

#### 7. Firebase Firestore 연동
- **더미 데이터 교체**: 실제 Firestore 데이터베이스 연동
- **실시간 업데이트**: Firestore 리스너를 통한 실시간 동기화
- **데이터 페칭 레이어**: API 호출 로직을 별도 레이어로 분리
- **예상 시간**: 2-3주

### 🟢 우선순위 낮음 (4개월 이후)

#### 8. 성능 최적화
- **가상화 적용**: 대용량 리스트에 가상 스크롤 적용 (react-window)
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **번들 크기 최적화**: 번들 분석 및 코드 스플리팅 최적화
- **예상 시간**: 2-3주

#### 9. 검색 기능 강화
- **검색어 하이라이트**: 검색 결과에서 키워드 강조
- **검색 히스토리**: 최근 검색어 저장 및 표시
- **자동완성**: 검색어 입력 시 자동완성 제안
- **예상 시간**: 1주

#### 10. 필터 기능 개선
- **필터 초기화 버튼**: 모든 필터를 한 번에 초기화
- **필터 상태 저장**: 로컬 스토리지에 필터 상태 저장
- **필터 조합 미리보기**: 선택한 필터 조합 미리보기
- **예상 시간**: 1주

#### 11. 진행 중 작업 취소 기능
- **리포트 생성 취소**: 생성 중인 리포트 취소 기능
- **데이터 검증 취소**: AI 검증 중 취소 기능
- **예상 시간**: 1주

#### 12. 키보드 단축키
- **전역 검색**: Ctrl+K로 전역 검색 열기
- **모달 닫기**: ESC 키로 모달 닫기 (현재 지원, 확장)
- **폼 제출**: Enter 키로 폼 제출
- **예상 시간**: 1주

#### 13. 타입 안정성 강화
- **엄격한 TypeScript 설정**: 더 엄격한 타입 체크 활성화
- **런타임 타입 검증**: Zod를 활용한 런타임 검증
- **예상 시간**: 1주

#### 14. 리포트 기능 확장
- **리포트 다운로드**: 실제 파일 다운로드 기능 구현
- **리포트 이메일/SMS 전송**: 실제 전송 기능 구현
- **리포트 템플릿 커스터마이징**: 사용자 정의 템플릿 생성
- **예상 시간**: 3-4주

#### 15. 대시보드 개선
- **실시간 데이터 업데이트**: Firestore 리스너를 통한 실시간 업데이트
- **커스터마이징 가능한 위젯**: 사용자가 원하는 위젯 배치
- **날짜 범위 필터**: 대시보드 데이터의 날짜 범위 필터링
- **예상 시간**: 2-3주

### 📊 개선 로드맵 요약

| 우선순위 | 항목 수 | 예상 총 시간 |
|---------|--------|------------|
| 높음 | 3개 | 4-6주 |
| 중간 | 4개 | 7-9주 |
| 낮음 | 8개 | 12-15주 |
| **총계** | **15개** | **23-30주** |

### 개선 완료 사항 ✅

다음 항목들은 이미 완료되었습니다:

1. ✅ **재사용 가능한 컴포넌트 추출**: SectionCard, TableCard, DataTable 생성
2. ✅ **Custom Hooks 분리**: useStudentFilter, useReportGeneration, useDataValidation
3. ✅ **성능 최적화**: useMemo, useCallback 적용, Cleanup 처리
4. ✅ **스타일 시스템 개선**: TailwindCSS best practice 적용
5. ✅ **문서화**: ARCHITECTURE_OVERVIEW.md, USER_WORKFLOW.md 등 생성

---

## 📚 추가 문서

프로젝트의 상세한 문서는 `docs/` 디렉토리에서 확인할 수 있습니다:

- **[ARCHITECTURE_OVERVIEW.md](docs/ARCHITECTURE_OVERVIEW.md)** - 전체 아키텍처 개요
- **[USER_WORKFLOW.md](docs/USER_WORKFLOW.md)** - 사용자 워크플로우
- **[COMPONENT_ANALYSIS.md](docs/COMPONENT_ANALYSIS.md)** - 컴포넌트 분석
- **[CODE_QUALITY.md](docs/CODE_QUALITY.md)** - 코드 품질 평가

---

## 🚀 배포

### Firebase App Hosting 배포

1. Firebase CLI 설치 및 로그인
```bash
npm install -g firebase-tools
firebase login
```

2. 프로덕션 빌드
```bash
npm run build
```

3. 배포
```bash
firebase deploy --only hosting
```

자세한 배포 방법은 [배포 섹션](#배포)을 참고하세요.

---

## 🤝 기여

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

---

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.

---

## 📞 문의

프로젝트에 대한 질문이나 문제가 있으시면 이슈를 생성해 주세요.

---

**ReAcademix** - 학원 관리의 새로운 표준
