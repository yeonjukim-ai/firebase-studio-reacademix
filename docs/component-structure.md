# ReAcademix React 컴포넌트 트리 구조

이 문서는 ReAcademix 프로젝트의 전체 React 컴포넌트 트리를 페이지 기준으로 정리한 문서입니다.

**최종 업데이트**: 2024년

---

## 📋 목차

- [전체 컴포넌트 계층 구조](#전체-컴포넌트-계층-구조)
- [페이지별 컴포넌트 트리](#페이지별-컴포넌트-트리)
  - [Root Layout](#1-root-layout)
  - [Home Page](#2-home-page)
  - [Login Page](#3-login-page)
  - [Dashboard Layout](#4-dashboard-layout)
  - [Dashboard Page](#5-dashboard-page)
  - [Students Page](#6-students-page)
  - [Reports Page](#7-reports-page)
  - [Data Page](#8-data-page)
  - [Settings Page](#9-settings-page)

---

## 전체 컴포넌트 계층 구조

```
RootLayout (app/layout.tsx)
├── html
├── head
│   └── Font Links (Inter, Space Grotesk)
└── body
    ├── {children} (페이지 컨텐츠)
    └── Toaster (전역 토스트 알림)
        └── Toast 컴포넌트들
```

---

## 페이지별 컴포넌트 트리

### 1. Root Layout

**파일**: `src/app/layout.tsx`

```
RootLayout
├── html
│   ├── head
│   │   ├── Font Preconnect Links
│   │   └── Google Fonts Stylesheet
│   └── body
│       ├── {children} (페이지 컨텐츠)
│       └── Toaster
│           └── Toast 컴포넌트들
```

**설명**: 
- 모든 페이지의 루트 레이아웃
- 폰트 로딩 및 전역 토스트 알림 제공

---

### 2. Home Page

**파일**: `src/app/page.tsx`

```
HomePage
└── redirect('/dashboard')
```

**설명**: 
- 홈 페이지는 대시보드로 자동 리다이렉트
- 실제 컴포넌트 렌더링 없음

---

### 3. Login Page

**파일**: `src/app/login/page.tsx`

```
LoginPage
└── div (컨테이너)
    └── Card
        ├── CardHeader
        │   ├── SVG Icon (로고)
        │   ├── CardTitle
        │   │   └── "ReAcademix"
        │   └── CardDescription
        │       └── "계속하려면 이메일과 비밀번호를 입력하세요"
        └── CardContent
            └── form
                ├── div (inputGroup)
                │   ├── Label ("이메일")
                │   └── Input (이메일 입력)
                ├── div (inputGroup)
                │   ├── div (flex container)
                │   │   ├── Label ("비밀번호")
                │   │   └── Link ("비밀번호 찾기")
                │   └── Input (비밀번호 입력)
                └── Button (로그인)
                    └── Link (→ /dashboard)
```

**주요 컴포넌트**:
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
- `Input`, `Label`, `Button`, `Link`

---

### 4. Dashboard Layout

**파일**: `src/app/dashboard/layout.tsx`

```
DashboardLayout
└── SidebarProvider
    ├── AppSidebar
    │   ├── Sidebar
    │   │   ├── SidebarHeader
    │   │   │   ├── SVG Icon (로고)
    │   │   │   └── h2 ("ReAcademix")
    │   │   ├── SidebarMenu
    │   │   │   └── SidebarMenuItem[] (메뉴 항목들)
    │   │   │       └── SidebarMenuButton
    │   │   │           └── Link (각 페이지로 이동)
    │   │   └── SidebarFooter
    │   │       └── SidebarMenu
    │   │           └── SidebarMenuItem
    │   │               └── SidebarMenuButton
    │   │                   └── Link (로그아웃)
    │   └── AppHeader
    │       └── header
    │           ├── SidebarTrigger (모바일 토글)
    │           ├── div (브레드크럼)
    │           │   └── "ReAcademix / Dashboard"
    │           └── div (우측 액션)
    │               ├── div (검색 영역)
    │               │   ├── Search Icon
    │               │   └── Input (검색 입력)
    │               ├── Button (알림)
    │               │   └── Bell Icon
    │               └── DropdownMenu
    │                   ├── DropdownMenuTrigger
    │                   │   └── Button
    │                   │       └── Avatar
    │                   │           ├── AvatarImage
    │                   │           └── AvatarFallback
    │                   └── DropdownMenuContent
    │                       ├── DropdownMenuLabel
    │                       ├── DropdownMenuSeparator
    │                       ├── DropdownMenuItem (프로필)
    │                       ├── DropdownMenuItem (설정)
    │                       ├── DropdownMenuSeparator
    │                       └── DropdownMenuItem (로그아웃)
    └── SidebarInset
        └── main
            └── {children} (대시보드 페이지들)
```

**주요 컴포넌트**:
- `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`
- `AppSidebar`, `AppHeader`
- `SidebarTrigger`, `Avatar`, `DropdownMenu`, `Input`, `Button`

---

### 5. Dashboard Page

**파일**: `src/app/dashboard/page.tsx`

```
DashboardPage
├── PageHeader
│   ├── div (제목 영역)
│   │   ├── h1 ("대시보드")
│   │   └── p ("전체 현황을 요약하여 보여줍니다.")
│   └── div (액션 버튼 영역)
│       ├── Button ("데이터 업로드")
│       │   └── Upload Icon
│       └── Button ("리포트 생성")
│           └── FilePlus Icon
├── div (KPI 그리드)
│   └── KpiCard[] (4개)
│       ├── Card
│       │   ├── CardHeader
│       │   │   ├── CardTitle (KPI 제목)
│       │   │   └── ArrowUpRight / ArrowDownRight Icon
│       │   └── CardContent
│       │       ├── div (KPI 값)
│       │       └── p (변화량)
│       └── ... (3개 더)
├── PerformanceChart
│   └── SectionCard
│       ├── CardHeader
│       │   ├── CardTitle ("학원/지점별 성과 추이")
│       │   └── CardDescription
│       └── CardContent
│           └── ChartContainer
│               └── BarChart
│                   ├── CartesianGrid
│                   ├── XAxis
│                   ├── YAxis
│                   ├── ChartTooltip
│                   │   └── ChartTooltipContent
│                   ├── Bar ("지점 A")
│                   └── Bar ("지점 B")
└── RecentActivityTable
    └── TableCard<Report>
        ├── CardHeader
        │   ├── CardTitle ("최근 활동")
        │   ├── CardDescription
        │   └── Button ("전체 보기")
        │       └── ArrowRight Icon
        └── CardContent
            └── Table
                ├── TableHeader
                │   └── TableRow
                │       └── TableHead[] (5개 컬럼)
                └── TableBody
                    └── TableRow[] (최근 5개 리포트)
                        └── TableCell[]
                            ├── 리포트 명
                            ├── 대상
                            ├── Badge (상태)
                            ├── 생성자
                            └── 생성일
```

**주요 컴포넌트**:
- `PageHeader`
- `KpiCard` (4개)
- `PerformanceChart` → `SectionCard` → `BarChart`
- `RecentActivityTable` → `TableCard` → `Table`

**Custom Hooks**:
- 없음 (페이지 레벨에서는 hooks 사용 안 함)

---

### 6. Students Page

**파일**: `src/app/dashboard/students/page.tsx`

```
StudentsPage
├── PageHeader
│   ├── div (제목 영역)
│   │   ├── h1 ("학생 관리")
│   │   └── p ("학원에 등록된 모든 학생의 정보를 관리합니다.")
│   └── div (액션 버튼 영역)
│       └── Button ("학생 추가")
│           └── PlusCircle Icon
└── StudentsTable
    ├── div (검색 및 필터 영역)
    │   ├── div (검색 입력)
    │   │   ├── Search Icon
    │   │   └── Input (검색어 입력)
    │   └── DropdownMenu (필터)
    │       ├── DropdownMenuTrigger
    │       │   └── Button ("필터")
    │       │       └── Filter Icon
    │       └── DropdownMenuContent
    │           ├── DropdownMenuLabel ("상태")
    │           ├── DropdownMenuCheckboxItem[] (active, inactive, on_leave)
    │           ├── DropdownMenuSeparator
    │           ├── DropdownMenuLabel ("지점")
    │           └── DropdownMenuCheckboxItem[] (각 지점)
    └── Table
        ├── TableHeader
        │   └── TableRow
        │       └── TableHead[] (7개 컬럼)
        └── TableBody
            └── TableRow[] (필터링된 학생 목록)
                └── TableCell[]
                    ├── 이름
                    ├── 지점
                    ├── 반
                    ├── Badge (상태)
                    ├── 등록일
                    ├── 최종 리포트일
                    └── Button ("상세 보기")
    └── Dialog (학생 상세 정보)
        ├── DialogContent
        │   ├── DialogHeader
        │   │   ├── DialogTitle (학생 이름)
        │   │   └── DialogDescription
        │   └── div (상세 정보)
        │       ├── div (ID)
        │       ├── div (지점)
        │       ├── div (반)
        │       ├── div (평균 점수)
        │       └── div (출석률)
```

**주요 컴포넌트**:
- `PageHeader`
- `StudentsTable`
  - `Input`, `DropdownMenu`, `Table`, `Dialog`, `Badge`, `Button`

**Custom Hooks**:
- `useStudentFilter`: 학생 필터링 로직 관리

---

### 7. Reports Page

**파일**: `src/app/dashboard/reports/page.tsx`

```
ReportsPage
├── PageHeader
│   ├── div (제목 영역)
│   │   ├── h1 ("리포트 관리")
│   │   └── p ("리포트 생성, 이력 조회 및 관리를 할 수 있습니다.")
│   └── (액션 버튼 없음)
└── Tabs
    ├── TabsList
    │   ├── TabsTrigger ("리포트 생성")
    │   ├── TabsTrigger ("생성 이력")
    │   └── TabsTrigger ("전송 이력")
    ├── TabsContent ("리포트 생성")
    │   └── ReportGeneration
    │       ├── SectionCard
    │       │   ├── CardHeader
    │       │   │   ├── CardTitle ("리포트 생성")
    │       │   │   └── CardDescription
    │       │   └── CardContent
    │       │       ├── div (템플릿 선택)
    │       │       │   ├── Label ("리포트 템플릿")
    │       │       │   └── Select
    │       │       │       ├── SelectTrigger
    │       │       │       ├── SelectValue
    │       │       │       └── SelectContent
    │       │       │           └── SelectItem[] (템플릿 옵션)
    │       │       ├── div (대상 선택)
    │       │       │   ├── Label ("리포트 대상")
    │       │       │   └── Select
    │       │       │       └── ... (동일 구조)
    │       │       ├── div (기간 선택)
    │       │       │   ├── Label ("리포트 기간")
    │       │       │   └── Popover
    │       │       │       ├── PopoverTrigger
    │       │       │       │   └── Button
    │       │       │       │       └── CalendarIcon
    │       │       │       └── PopoverContent
    │       │       │           └── Calendar
    │       │       │               └── DateRangePicker
    │       │       └── div (생성 버튼 영역)
    │       │           ├── Button ("리포트 생성 시작")
    │       │           └── (상태에 따라 다른 버튼 표시)
    │       │               ├── Progress (생성 중)
    │       │               ├── Alert (성공/실패)
    │       │               └── Button ("다운로드" / "다시 시도")
    │       └── ... (생성 상태에 따른 UI)
    ├── TabsContent ("생성 이력")
    │   └── HistoryTable
    │       └── DataTable<HistoryItem>
    │           └── Table
    │               ├── TableHeader
    │               │   └── TableRow
    │               │       └── TableHead[] (6개 컬럼)
    │               └── TableBody
    │                   └── TableRow[] (생성 이력)
    │                       └── TableCell[]
    │                           ├── 리포트 명
    │                           ├── 대상
    │                           ├── 생성자
    │                           ├── Badge (상태)
    │                           ├── 생성일
    │                           └── Button ("다운로드") (completed 상태만)
    └── TabsContent ("전송 이력")
        └── HistoryTable
            └── DataTable<HistoryItem>
                └── Table
                    ├── TableHeader
                    │   └── TableRow
                    │       └── TableHead[] (6개 컬럼)
                    └── TableBody
                        └── TableRow[] (전송 이력)
                            └── TableCell[]
                                ├── 리포트 명
                                ├── 수신자
                                ├── 채널 (Email/SMS)
                                ├── Badge (상태)
                                ├── 전송일
                                └── Button ("재전송") (sent 상태만)
```

**주요 컴포넌트**:
- `PageHeader`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `ReportGeneration` → `SectionCard` → `Select`, `Popover`, `Calendar`, `Progress`, `Alert`
- `HistoryTable` → `DataTable` → `Table`, `Badge`, `Button`

**Custom Hooks**:
- `useReportGeneration`: 리포트 생성 로직 관리

---

### 8. Data Page

**파일**: `src/app/dashboard/data/page.tsx`

```
DataPage
├── PageHeader
│   ├── div (제목 영역)
│   │   ├── h1 ("데이터 관리")
│   │   └── p ("학생 데이터 파일을 업로드하고, AI를 통해 데이터 유효성을 검사하며, 오류를 수정합니다.")
│   └── (액션 버튼 없음)
└── DataManagementClient
    └── SectionCard
        ├── CardHeader
        │   ├── CardTitle ("데이터 연동 및 검증")
        │   ├── CardDescription
        │   └── Button (뒤로가기) (상태에 따라 표시)
        │       └── ArrowLeft Icon
        └── CardContent
            ├── (state === 'idle')
            │   └── div (파일 업로드 영역)
            │       ├── UploadCloud Icon
            │       ├── p ("드래그 앤 드롭 또는 클릭하여 파일 업로드")
            │       └── Input (type="file", hidden)
            │
            ├── (state === 'file_selected')
            │   └── div (파일 정보 카드)
            │       ├── File Icon
            │       ├── div (파일 정보)
            │       │   ├── 파일 이름
            │       │   └── 파일 크기
            │       ├── Button (X) (파일 삭제)
            │       └── Button ("업로드 및 데이터 검증")
            │
            ├── (state === 'validating')
            │   └── div (검증 중)
            │       ├── Loader2 Icon (스피너)
            │       └── p ("AI가 데이터를 검증하고 있습니다...")
            │
            └── (state === 'validation_complete')
                ├── Alert (검증 결과)
                │   ├── AlertTitle
                │   └── AlertDescription
                │
                └── (검증 실패 시)
                    └── Table (수정 가능한 데이터 테이블)
                        ├── TableHeader
                        │   └── TableRow
                        │       └── TableHead[] (CSV 헤더)
                        └── TableBody
                            └── TableRow[] (데이터 행)
                                └── TableCell[]
                                    └── Input (에러 셀은 빨간색 배경)
                                        └── (에러 메시지 표시)
                        └── Button ("수정 내용 저장")
```

**주요 컴포넌트**:
- `PageHeader`
- `DataManagementClient` → `SectionCard` → `Input`, `Table`, `Alert`, `Button`

**Custom Hooks**:
- `useDataValidation`: 파일 업로드 및 AI 검증 로직 관리

**AI 통합**:
- `validateUploadedData` Flow (Genkit AI)
  - `validateDataPrompt` (AI 프롬프트)
  - Google GenAI API 호출

---

### 9. Settings Page

**파일**: `src/app/dashboard/settings/page.tsx`

```
SettingsPage
├── PageHeader
│   ├── div (제목 영역)
│   │   ├── h1 ("환경설정")
│   │   └── p ("시스템 및 알림 설정을 관리합니다.")
│   └── (액션 버튼 없음)
└── Tabs
    ├── TabsList
    │   ├── TabsTrigger ("알림 설정")
    │   ├── TabsTrigger ("계정 설정")
    │   └── TabsTrigger ("시스템")
    ├── TabsContent ("알림 설정")
    │   └── div (그리드)
    │       ├── SectionCard ("발신자 정보 설정")
    │       │   ├── CardHeader
    │       │   │   ├── CardTitle ("발신자 정보 설정")
    │       │   │   └── CardDescription
    │       │   └── CardContent
    │       │       ├── div (inputGroup)
    │       │       │   ├── Label ("발신 이메일 주소")
    │       │       │   └── Input
    │       │       ├── div (inputGroup)
    │       │       │   ├── Label ("발신자 이름")
    │       │       │   └── Input
    │       │       ├── div (inputGroup)
    │       │       │   ├── Label ("발신 SMS 번호")
    │       │       │   └── Input
    │       │       └── Button ("저장")
    │       └── SectionCard ("알림 템플릿 관리")
    │           ├── CardHeader
    │           │   ├── CardTitle ("알림 템플릿 관리")
    │           │   └── CardDescription
    │           └── CardContent
    │               ├── div (inputGroup)
    │               │   ├── Label ("이메일 템플릿")
    │               │   └── Textarea
    │               ├── div (inputGroup)
    │               │   ├── Label ("SMS 템플릿")
    │               │   └── Textarea
    │               └── div (buttonGroup)
    │                   ├── Button ("저장")
    │                   └── Button ("테스트 발송")
    ├── TabsContent ("계정 설정")
    │   └── SectionCard ("계정 정보")
    │       ├── CardHeader
    │       │   ├── CardTitle ("계정 정보")
    │       │   └── CardDescription
    │       └── CardContent
    │           └── p ("계정 설정 폼이 여기에 표시됩니다.")
    └── TabsContent ("시스템")
        └── SectionCard ("시스템 설정")
            ├── CardHeader
            │   ├── CardTitle ("시스템 설정")
            │   └── CardDescription
            └── CardContent
                └── p ("시스템 설정 폼이 여기에 표시됩니다.")
```

**주요 컴포넌트**:
- `PageHeader`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `SectionCard` → `Input`, `Textarea`, `Label`, `Button`

**Custom Hooks**:
- 없음

---

## 컴포넌트 분류

### 레이아웃 컴포넌트
- `RootLayout` (app/layout.tsx)
- `DashboardLayout` (app/dashboard/layout.tsx)
- `AppHeader` (components/layout/AppHeader.tsx)
- `AppSidebar` (components/layout/AppSidebar.tsx)

### 공유 컴포넌트 (Shared)
- `PageHeader` (components/shared/PageHeader.tsx)
- `SectionCard` (components/shared/SectionCard.tsx)
- `TableCard` (components/shared/TableCard.tsx)
- `DataTable` (components/shared/DataTable.tsx)

### 기능 컴포넌트 (Feature)
- `KpiCard` (components/dashboard/KpiCard.tsx)
- `PerformanceChart` (components/dashboard/PerformanceChart.tsx)
- `RecentActivityTable` (components/dashboard/RecentActivityTable.tsx)
- `StudentsTable` (components/students/StudentsTable.tsx)
- `ReportGeneration` (components/reports/ReportGeneration.tsx)
- `HistoryTable` (components/reports/HistoryTable.tsx)
- `DataManagementClient` (components/data/DataManagementClient.tsx)

### UI 컴포넌트 (shadcn/ui)
- `Button`, `Card`, `Input`, `Label`, `Textarea`
- `Table`, `Dialog`, `DropdownMenu`, `Select`, `Popover`, `Calendar`
- `Tabs`, `Badge`, `Alert`, `Progress`, `Avatar`
- `Sidebar`, `Toaster`, `Toast`

---

## Custom Hooks

### useStudentFilter
- **위치**: `src/hooks/useStudentFilter.ts`
- **사용 컴포넌트**: `StudentsTable`
- **기능**: 학생 목록 필터링 (검색어, 상태, 지점)

### useReportGeneration
- **위치**: `src/hooks/useReportGeneration.ts`
- **사용 컴포넌트**: `ReportGeneration`
- **기능**: 리포트 생성 상태 및 진행률 관리

### useDataValidation
- **위치**: `src/hooks/useDataValidation.ts`
- **사용 컴포넌트**: `DataManagementClient`
- **기능**: 파일 업로드 및 AI 검증 로직 관리

---

## 데이터 흐름 요약

### 더미 데이터 사용
- `kpis` → `DashboardPage` → `KpiCard[]`
- `students` → `StudentsPage` → `StudentsTable`
- `reportHistory` → `ReportsPage` → `HistoryTable`
- `transmissionHistory` → `ReportsPage` → `HistoryTable`
- `performanceChartData` → `DashboardPage` → `PerformanceChart`

### AI 통합
- `DataManagementClient` → `useDataValidation` → `validateUploadedData` Flow → Google GenAI

---

## 컴포넌트 재사용성

### 높은 재사용성
- `PageHeader`: 모든 페이지에서 사용
- `SectionCard`: Settings, Reports, Data 페이지에서 사용
- `TableCard`: Dashboard, Reports 페이지에서 사용
- `DataTable`: Reports 페이지에서 사용

### 중간 재사용성
- `KpiCard`: Dashboard 페이지에서만 사용 (4개 인스턴스)
- `PerformanceChart`: Dashboard 페이지에서만 사용
- `RecentActivityTable`: Dashboard 페이지에서만 사용

### 낮은 재사용성 (단일 사용)
- `StudentsTable`: Students 페이지에서만 사용
- `ReportGeneration`: Reports 페이지에서만 사용
- `DataManagementClient`: Data 페이지에서만 사용

---

## 컴포넌트 트리 통계

- **총 페이지 수**: 9개 (Root Layout 포함)
- **레이아웃 컴포넌트**: 4개
- **공유 컴포넌트**: 4개
- **기능 컴포넌트**: 7개
- **UI 컴포넌트**: 20+ 개 (shadcn/ui)
- **Custom Hooks**: 3개

---

**문서 작성일**: 2024년  
**다음 업데이트**: 새로운 페이지 또는 컴포넌트 추가 시

