# ReAcademix 컴포넌트 트리 구조

이 문서는 ReAcademix 프로젝트의 전체 페이지 및 컴포넌트 구조를 트리 형태로 정리하고, 각 컴포넌트의 역할과 포함 관계를 설명합니다.

**최종 업데이트**: 2024년

---

## 📋 목차

- [전체 구조 개요](#전체-구조-개요)
- [페이지 계층 구조](#페이지-계층-구조)
- [컴포넌트 상세 트리](#컴포넌트-상세-트리)
- [컴포넌트 역할 설명](#컴포넌트-역할-설명)
- [데이터 흐름](#데이터-흐름)

---

## 전체 구조 개요

```
ReAcademix 애플리케이션
│
├── 📄 Root Layout (app/layout.tsx)
│   └── 모든 페이지의 최상위 레이아웃
│
├── 📄 Pages (라우팅)
│   ├── / (홈) → /dashboard로 리다이렉트
│   ├── /login (로그인 페이지)
│   └── /dashboard/* (대시보드 하위 페이지들)
│
└── 🧩 Components (재사용 컴포넌트)
    ├── Layout Components (레이아웃)
    ├── Shared Components (공유)
    ├── Feature Components (기능별)
    └── UI Components (기본 UI)
```

---

## 페이지 계층 구조

### 1. Root Layout (`app/layout.tsx`)

**경로**: `/` (모든 페이지의 루트 레이아웃)  
**역할**: HTML 문서 구조, 전역 스타일, 폰트 로드, 전역 컴포넌트 제공

```
RootLayout
├── <html> (lang="en")
│   ├── <head>
│   │   ├── 폰트 프리커넥트 (Google Fonts)
│   │   └── 폰트 스타일시트 (Inter, Space Grotesk)
│   └── <body>
│       ├── {children} (페이지 콘텐츠)
│       └── <Toaster /> (전역 토스트 알림)
└── globals.css (전역 스타일)
```

**포함 컴포넌트**:
- `Toaster` (`@/components/ui/toaster`) - 전역 토스트 알림 시스템

---

### 2. Home Page (`app/page.tsx`)

**경로**: `/`  
**역할**: 루트 경로 접속 시 대시보드로 자동 리다이렉트

```
HomePage
└── redirect('/dashboard')
```

**동작**: 서버 사이드에서 `/dashboard`로 리다이렉트

---

### 3. Login Page (`app/login/page.tsx`)

**경로**: `/login`  
**역할**: 사용자 인증을 위한 로그인 폼 제공

```
LoginPage
└── <div> (전체 화면 컨테이너)
    └── <Card>
        ├── <CardHeader>
        │   ├── 로고 (SVG 아이콘)
        │   ├── <CardTitle> "ReAcademix"
        │   └── <CardDescription> 로그인 안내
        └── <CardContent>
            ├── 이메일 입력 필드
            │   ├── <Label> "이메일"
            │   └── <Input> (type="email")
            ├── 비밀번호 입력 필드
            │   ├── <Label> "비밀번호"
            │   ├── <Link> "비밀번호 찾기"
            │   └── <Input> (type="password")
            └── <Button> "로그인" → /dashboard로 이동
```

**포함 컴포넌트**:
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (UI)
- `Input`, `Label` (UI)
- `Button` (UI)
- `Link` (Next.js)

---

### 4. Dashboard Layout (`app/dashboard/layout.tsx`)

**경로**: `/dashboard/*` (모든 대시보드 하위 페이지의 공통 레이아웃)  
**역할**: 대시보드 페이지들의 공통 레이아웃 제공 (사이드바, 헤더)

```
DashboardLayout
└── <SidebarProvider> (사이드바 상태 관리)
    ├── <AppSidebar /> (좌측 네비게이션)
    └── <SidebarInset> (메인 콘텐츠 영역)
        ├── <AppHeader /> (상단 헤더)
        └── <main> (페이지별 콘텐츠)
            └── {children} (각 페이지 컴포넌트)
```

**포함 컴포넌트**:
- `SidebarProvider`, `SidebarInset` (UI - 사이드바 시스템)
- `AppSidebar` (`@/components/layout/AppSidebar`) - 좌측 메뉴
- `AppHeader` (`@/components/layout/AppHeader`) - 상단 헤더

---

### 5. Dashboard Page (`app/dashboard/page.tsx`)

**경로**: `/dashboard`  
**역할**: 전체 현황을 한눈에 볼 수 있는 메인 대시보드

```
DashboardPage
├── <PageHeader>
│   ├── title: "대시보드"
│   ├── description: "전체 현황을 요약하여 보여줍니다."
│   └── 액션 버튼들
│       ├── <Button variant="outline"> "데이터 업로드"
│       └── <Button> "리포트 생성"
│
├── KPI 카드 그리드 (4개)
│   └── <KpiCard /> × 4
│       ├── 총 등록생 수
│       ├── 월간 활성 학생
│       ├── 평균 성적 변화
│       └── 리포트 생성률
│
└── 하단 섹션
    ├── <PerformanceChart /> (성과 차트 - 2/5 열)
    └── <RecentActivityTable /> (최근 활동 - 3/5 열)
```

**포함 컴포넌트**:
- `PageHeader` (`@/components/shared/PageHeader`)
- `Button` (UI)
- `KpiCard` (`@/components/dashboard/KpiCard`) × 4
- `PerformanceChart` (`@/components/dashboard/PerformanceChart`)
- `RecentActivityTable` (`@/components/dashboard/RecentActivityTable`)

---

### 6. Students Page (`app/dashboard/students/page.tsx`)

**경로**: `/dashboard/students`  
**역할**: 학생 정보 조회, 검색, 필터링, 상세 정보 확인

```
StudentsPage
├── <PageHeader>
│   ├── title: "학생 관리"
│   ├── description: "학원에 등록된 모든 학생의 정보를 관리합니다."
│   └── <Button> "학생 추가"
│
└── <StudentsTable />
    ├── 검색 및 필터 UI
    │   ├── <Input> (검색창)
    │   └── <DropdownMenu> (필터)
    │       ├── 학생 상태 필터
    │       └── 지점 필터
    │
    ├── <Table> (학생 목록)
    │   ├── <TableHeader>
    │   │   └── 컬럼: 이름, 지점, 반, 상태, 등록일, 최종 리포트일
    │   └── <TableBody>
    │       └── <TableRow> × N (학생 데이터)
    │           ├── 학생 정보
    │           ├── <Badge> (상태 표시)
    │           └── <Button> "상세 보기"
    │
    └── <Dialog> (학생 상세 정보 모달)
        └── 학생 상세 정보 표시
```

**포함 컴포넌트**:
- `PageHeader` (`@/components/shared/PageHeader`)
- `Button` (UI)
- `StudentsTable` (`@/components/students/StudentsTable`)
  - `Input`, `DropdownMenu` (UI)
  - `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` (UI)
  - `Badge` (UI)
  - `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` (UI)

---

### 7. Reports Page (`app/dashboard/reports/page.tsx`)

**경로**: `/dashboard/reports`  
**역할**: 리포트 생성, 생성 이력 조회, 전송 이력 조회

```
ReportsPage
├── <PageHeader>
│   ├── title: "리포트 관리"
│   └── description: "리포트 생성, 이력 조회 및 관리를 할 수 있습니다."
│
└── <Tabs> (3개 탭)
    ├── <TabsList>
    │   ├── "리포트 생성"
    │   ├── "생성 이력"
    │   └── "전송 이력"
    │
    └── <TabsContent>
        ├── "리포트 생성" 탭
        │   └── <ReportGeneration />
        │
        ├── "생성 이력" 탭
        │   └── <HistoryTable type="generation" />
        │
        └── "전송 이력" 탭
            └── <HistoryTable type="transmission" />
```

**포함 컴포넌트**:
- `PageHeader` (`@/components/shared/PageHeader`)
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` (UI)
- `ReportGeneration` (`@/components/reports/ReportGeneration`)
- `HistoryTable` (`@/components/reports/HistoryTable`) × 2

---

### 8. Data Page (`app/dashboard/data/page.tsx`)

**경로**: `/dashboard/data`  
**역할**: 학생 데이터 파일 업로드, AI 검증, 오류 수정

```
DataPage
├── <PageHeader>
│   ├── title: "데이터 관리"
│   └── description: "학생 데이터 파일을 업로드하고, AI를 통해 데이터 유효성을 검사하며, 오류를 수정합니다."
│
└── <DataManagementClient />
    ├── [idle 상태] 파일 업로드 UI
    │   └── 드래그 앤 드롭 영역
    │
    ├── [file_selected 상태] 파일 정보 + 검증 시작
    │   ├── 파일 정보 표시
    │   └── <Button> "업로드 및 데이터 검증"
    │
    ├── [validating 상태] 검증 진행 중
    │   └── 로딩 UI
    │
    └── [validation_complete 상태] 검증 결과
        ├── [유효함] 성공 <Alert>
        └── [오류 있음]
            ├── 오류 <Alert>
            └── 수정 가능한 <Table>
                └── <Input> (각 셀 편집 가능)
```

**포함 컴포넌트**:
- `PageHeader` (`@/components/shared/PageHeader`)
- `DataManagementClient` (`@/components/data/DataManagementClient`)
  - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (UI)
  - `Button`, `Input` (UI)
  - `Alert`, `AlertTitle`, `AlertDescription` (UI)
  - `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` (UI)

---

### 9. Settings Page (`app/dashboard/settings/page.tsx`)

**경로**: `/dashboard/settings`  
**역할**: 시스템 설정, 알림 설정, 계정 설정 관리

```
SettingsPage
├── <PageHeader>
│   ├── title: "환경설정"
│   └── description: "시스템 및 알림 설정을 관리합니다."
│
└── <Tabs> (3개 탭)
    ├── <TabsList>
    │   ├── "알림 설정"
    │   ├── "계정 설정"
    │   └── "시스템"
    │
    └── <TabsContent>
        ├── "알림 설정" 탭
        │   └── <div> (2열 그리드)
        │       ├── <Card> "발신자 정보 설정"
        │       │   ├── <CardHeader>
        │       │   └── <CardContent>
        │       │       ├── <Input> (발신 이메일)
        │       │       ├── <Input> (발신자 이름)
        │       │       ├── <Input> (발신 SMS 번호)
        │       │       └── <Button> "저장"
        │       │
        │       └── <Card> "알림 템플릿 관리"
        │           ├── <CardHeader>
        │           └── <CardContent>
        │               ├── <Textarea> (이메일 템플릿)
        │               ├── <Textarea> (SMS 템플릿)
        │               └── <Button> "저장" / "테스트 발송"
        │
        ├── "계정 설정" 탭
        │   └── <Card> "계정 정보"
        │       └── <CardContent>
        │           └── (계정 설정 폼 - 준비 중)
        │
        └── "시스템" 탭
            └── <Card> "시스템 설정"
                └── <CardContent>
                    └── (시스템 설정 폼 - 준비 중)
```

**포함 컴포넌트**:
- `PageHeader` (`@/components/shared/PageHeader`)
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` (UI)
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (UI)
- `Input`, `Label`, `Textarea` (UI)
- `Button` (UI)

---

## 컴포넌트 상세 트리

### Layout Components (`src/components/layout/`)

#### AppSidebar (`AppSidebar.tsx`)

**사용 위치**: `app/dashboard/layout.tsx`  
**역할**: 좌측 네비게이션 메뉴 제공

```
AppSidebar
└── <Sidebar>
    ├── <SidebarHeader>
    │   └── 로고 + "ReAcademix" 제목
    │
    ├── <SidebarMenu>
    │   ├── <SidebarMenuItem>
    │   │   └── <SidebarMenuButton> → /dashboard
    │   │       └── "대시보드" (LayoutDashboard 아이콘)
    │   │
    │   ├── <SidebarMenuItem>
    │   │   └── <SidebarMenuButton> → /dashboard/students
    │   │       └── "학생 관리" (UsersRound 아이콘)
    │   │
    │   ├── <SidebarMenuItem>
    │   │   └── <SidebarMenuButton> → /dashboard/reports
    │   │       └── "리포트 관리" (FileText 아이콘)
    │   │
    │   ├── <SidebarMenuItem>
    │   │   └── <SidebarMenuButton> → /dashboard/data
    │   │       └── "데이터 연동" (Database 아이콘)
    │   │
    │   └── <SidebarMenuItem>
    │       └── <SidebarMenuButton> → /dashboard/settings
    │           └── "환경설정" (Settings 아이콘)
    │
    └── <SidebarFooter>
        └── <SidebarMenuItem>
            └── <SidebarMenuButton> → /login
                └── "로그아웃" (LogOut 아이콘)
```

**포함 컴포넌트**:
- `Sidebar`, `SidebarHeader`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarFooter` (UI)
- `Link` (Next.js)

---

#### AppHeader (`AppHeader.tsx`)

**사용 위치**: `app/dashboard/layout.tsx`  
**역할**: 상단 헤더 (검색, 알림, 사용자 메뉴)

```
AppHeader
└── <header> (sticky top)
    ├── <SidebarTrigger> (모바일 전용 - 사이드바 토글)
    │
    ├── 브레드크럼: "ReAcademix / Dashboard"
    │
    └── 우측 액션 영역
        ├── <Input> (검색창 - 데스크톱 전용)
        │   └── placeholder: "학생 또는 리포트 검색..."
        │
        ├── <Button variant="ghost"> (알림 버튼)
        │   └── <Bell> 아이콘
        │
        └── <DropdownMenu> (사용자 메뉴)
            ├── <DropdownMenuTrigger>
            │   └── <Avatar>
            │       ├── <AvatarImage> (사용자 아바타)
            │       └── <AvatarFallback> (User 아이콘)
            │
            └── <DropdownMenuContent>
                ├── <DropdownMenuLabel> "내 계정"
                ├── <DropdownMenuItem> "프로필"
                ├── <DropdownMenuItem> "설정"
                └── <DropdownMenuItem> "로그아웃"
```

**포함 컴포넌트**:
- `SidebarTrigger` (UI)
- `Input` (UI)
- `Button` (UI)
- `Avatar`, `AvatarImage`, `AvatarFallback` (UI)
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator` (UI)

---

### Shared Components (`src/components/shared/`)

#### PageHeader (`PageHeader.tsx`)

**사용 위치**: 모든 대시보드 페이지  
**역할**: 페이지 제목, 설명, 액션 버튼 영역 제공

```
PageHeader
└── <div> (flex container)
    ├── 제목 영역
    │   ├── <h1> (title prop)
    │   └── <p> (description prop - optional)
    │
    └── 액션 영역 (children prop - optional)
        └── 버튼들
```

**Props**:
- `title: string` - 페이지 제목
- `description?: string` - 페이지 설명
- `children?: ReactNode` - 우측 액션 버튼들

---

### Dashboard Components (`src/components/dashboard/`)

#### KpiCard (`KpiCard.tsx`)

**사용 위치**: `app/dashboard/page.tsx`  
**역할**: 주요 성과 지표(KPI)를 카드 형태로 표시

```
KpiCard
└── <Card>
    ├── <CardHeader>
    │   ├── <CardTitle> (KPI 제목)
    │   └── 화살표 아이콘
    │       ├── <ArrowUpRight> (증가 시 - 녹색)
    │       └── <ArrowDownRight> (감소 시 - 빨간색)
    │
    └── <CardContent>
        ├── <div> (KPI 값 - 큰 숫자)
        └── <p> (변화량 텍스트 - "vs last month")
```

**Props** (Kpi 타입):
- `title: string` - KPI 제목
- `value: string` - KPI 값
- `change: string` - 변화량
- `changeType: 'increase' | 'decrease'` - 변화 방향

---

#### PerformanceChart (`PerformanceChart.tsx`)

**사용 위치**: `app/dashboard/page.tsx`  
**역할**: 지점별 성과 추이를 막대 그래프로 시각화

```
PerformanceChart
└── <Card> (2/5 열 차지)
    ├── <CardHeader>
    │   ├── <CardTitle> "학원/지점별 성과 추이"
    │   └── <CardDescription> "지난 6개월간의 평균 성적 추이입니다."
    │
    └── <CardContent>
        └── <ChartContainer>
            └── <BarChart> (Recharts)
                ├── <CartesianGrid> (격자)
                ├── <XAxis> (월별)
                ├── <YAxis> (점수)
                ├── <ChartTooltip> (호버 시 정보)
                └── <Bar> × 2
                    ├── "지점 A" (파란색)
                    └── "지점 B" (청록색)
```

**포함 컴포넌트**:
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (UI)
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent` (UI)
- `BarChart`, `Bar`, `CartesianGrid`, `XAxis`, `YAxis` (Recharts)

---

#### RecentActivityTable (`RecentActivityTable.tsx`)

**사용 위치**: `app/dashboard/page.tsx`  
**역할**: 최근 생성된 리포트 목록을 테이블로 표시

```
RecentActivityTable
└── <Card> (3/5 열 차지)
    ├── <CardHeader>
    │   ├── <CardTitle> "최근 활동"
    │   ├── <CardDescription> "최근 생성 및 전송된 리포트 목록입니다."
    │   └── <Button> "전체 보기" → /dashboard/reports
    │
    └── <CardContent>
        └── <Table>
            ├── <TableHeader>
            │   └── <TableRow>
            │       ├── 리포트 명
            │       ├── 대상
            │       ├── 상태
            │       ├── 생성자
            │       └── 생성일
            │
            └── <TableBody>
                └── <TableRow> × 5 (최근 5개만 표시)
                    ├── 리포트 정보
                    ├── <Badge> (상태 표시)
                    └── 기타 정보
```

**포함 컴포넌트**:
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (UI)
- `Table`, `TableHeader`, `TableHead`, `TableBody`, `TableRow`, `TableCell` (UI)
- `Badge` (UI)
- `Button` (UI)

---

### Students Components (`src/components/students/`)

#### StudentsTable (`StudentsTable.tsx`)

**사용 위치**: `app/dashboard/students/page.tsx`  
**역할**: 학생 목록 표시, 검색, 필터링, 상세 정보 모달

```
StudentsTable
├── 검색 및 필터 영역
│   ├── <Input> (검색창)
│   │   └── <Search> 아이콘
│   │
│   └── <DropdownMenu> (필터)
│       ├── <DropdownMenuTrigger>
│       │   └── <Button> "필터"
│       │
│       └── <DropdownMenuContent>
│           ├── 학생 상태 필터
│           │   └── <DropdownMenuCheckboxItem> × N
│           │
│           └── 지점 필터
│               └── <DropdownMenuCheckboxItem> × N
│
├── <Table> (학생 목록)
│   ├── <TableHeader>
│   │   └── <TableRow>
│   │       ├── 이름
│   │       ├── 지점
│   │       ├── 반
│   │       ├── 상태
│   │       ├── 등록일
│   │       ├── 최종 리포트일
│   │       └── (빈 열)
│   │
│   └── <TableBody>
│       └── <TableRow> × N (필터링된 학생 목록)
│           ├── 학생 정보
│           ├── <Badge> (상태 표시)
│           │   ├── "active" (녹색)
│           │   ├── "inactive" (빨간색)
│           │   └── "on_leave" (회색)
│           └── <Button> "상세 보기"
│
└── <Dialog> (학생 상세 정보 모달)
    └── <DialogContent>
        ├── <DialogHeader>
        │   ├── <DialogTitle> "{학생 이름} 학생 정보"
        │   └── <DialogDescription>
        │
        └── 학생 상세 정보
            ├── ID
            ├── 지점
            ├── 반
            ├── 평균 점수
            └── 출석률
```

**상태 관리**:
- `searchTerm` - 검색어
- `selectedStudent` - 선택된 학생 (모달 표시용)
- `statusFilter` - 상태 필터 배열
- `branchFilter` - 지점 필터 배열

---

### Reports Components (`src/components/reports/`)

#### ReportGeneration (`ReportGeneration.tsx`)

**사용 위치**: `app/dashboard/reports/page.tsx` (리포트 생성 탭)  
**역할**: 리포트 생성 폼, 진행 상황 표시, 결과 처리

```
ReportGeneration
└── <Card>
    ├── <CardHeader>
    │   ├── <CardTitle> "리포트 생성"
    │   └── <CardDescription>
    │
    ├── <CardContent>
    │   ├── [idle 상태] 리포트 생성 폼
    │   │   ├── 리포트 템플릿 선택
    │   │   │   └── <Select>
    │   │   │       ├── "월간 성과 리포트"
    │   │   │       ├── "시험 분석 리포트"
    │   │   │       └── "출결 리포트"
    │   │   │
    │   │   ├── 리포트 대상 선택
    │   │   │   └── <Select>
    │   │   │       ├── "전체 학생"
    │   │   │       ├── "A반"
    │   │   │       ├── "B반"
    │   │   │       └── "개별 선택"
    │   │   │
    │   │   └── 리포트 기간 선택
    │   │       └── <Popover>
    │   │           ├── <PopoverTrigger>
    │   │           │   └── <Button> (날짜 표시)
    │   │           └── <PopoverContent>
    │   │               └── <Calendar> (날짜 범위 선택)
    │   │
    │   ├── [generating 상태] 로딩 UI
    │   │   ├── <Loader2> (스피너 아이콘)
    │   │   ├── <Progress> (진행률 바)
    │   │   └── 진행률 텍스트
    │   │
    │   ├── [completed 상태] 성공 알림
    │   │   └── <Alert> (녹색 배경)
    │   │       ├── <AlertTitle> "리포트 생성 완료!"
    │   │       └── <AlertDescription>
    │   │
    │   └── [failed 상태] 실패 알림
    │       └── <Alert variant="destructive">
    │           ├── <AlertTitle> "생성 실패"
    │           └── <AlertDescription>
    │
    └── <CardFooter>
        ├── [idle] <Button> "리포트 생성 시작"
        ├── [completed]
        │   ├── <Button variant="outline"> "새 리포트 생성"
        │   └── <Button> "다운로드"
        └── [failed] <Button variant="outline"> "다시 시도"
```

**상태 관리**:
- `date` - 선택된 날짜 범위
- `generationState` - 'idle' | 'generating' | 'completed' | 'failed'
- `progress` - 생성 진행률 (0-100)

---

#### HistoryTable (`HistoryTable.tsx`)

**사용 위치**: `app/dashboard/reports/page.tsx` (생성 이력/전송 이력 탭)  
**역할**: 리포트 생성 이력 또는 전송 이력을 테이블로 표시

```
HistoryTable
└── <Table>
    ├── <TableHeader>
    │   └── <TableRow>
    │       ├── 리포트 명
    │       ├── 대상/수신자
    │       ├── 생성자/채널
    │       ├── 상태
    │       ├── 생성일/전송일
    │       └── 작업
    │
    └── <TableBody>
        └── <TableRow> × N
            ├── 리포트 정보
            ├── <Badge> (상태 표시)
            │   ├── "completed" / "sent" (파란색)
            │   ├── "failed" (빨간색)
            │   └── "in_progress" (회색)
            │
            └── <Button> (작업 버튼)
                ├── [generation + completed] "다운로드"
                └── [transmission + sent] "재전송"
```

**Props**:
- `data: any[]` - 리포트 이력 데이터
- `type: 'generation' | 'transmission'` - 테이블 타입

---

### Data Components (`src/components/data/`)

#### DataManagementClient (`DataManagementClient.tsx`)

**사용 위치**: `app/dashboard/data/page.tsx`  
**역할**: 파일 업로드, AI 검증, 데이터 수정

```
DataManagementClient
└── <Card>
    ├── <CardHeader>
    │   ├── [idle 제외] <Button variant="ghost"> (뒤로가기)
    │   ├── <CardTitle> "데이터 연동 및 검증"
    │   └── <CardDescription>
    │
    └── <CardContent>
        ├── [idle 상태] 파일 업로드 UI
        │   └── <div> (드래그 앤 드롭 영역)
        │       ├── <UploadCloud> 아이콘
        │       ├── "드래그 앤 드롭 또는 클릭하여 파일 업로드"
        │       └── <Input type="file"> (숨김)
        │
        ├── [file_selected 상태] 파일 정보
        │   ├── <div> (파일 정보 표시)
        │   │   ├── <File> 아이콘
        │   │   ├── 파일명
        │   │   ├── 파일 크기
        │   │   └── <Button> (파일 제거)
        │   │
        │   └── <Button> "업로드 및 데이터 검증"
        │
        ├── [validating 상태] 검증 진행 중
        │   ├── <Loader2> (스피너)
        │   ├── "AI가 데이터를 검증하고 있습니다..."
        │   └── 진행 메시지
        │
        └── [validation_complete 상태] 검증 결과
            ├── [유효함] 성공 <Alert>
            │   ├── <CheckCircle> 아이콘
            │   ├── <AlertTitle> "검증 완료"
            │   └── <AlertDescription>
            │
            └── [오류 있음]
                ├── 오류 <Alert>
                │   ├── <AlertCircle> 아이콘
                │   ├── <AlertTitle> "검증 오류 발견"
                │   └── <AlertDescription>
                │
                ├── 수정 가능한 <Table>
                │   ├── <TableHeader>
                │   │   └── CSV 헤더 열들
                │   │
                │   └── <TableBody>
                │       └── <TableRow> × N
                │           └── <TableCell> × M
                │               ├── <Input> (편집 가능)
                │               │   └── [오류 있음] 빨간 테두리
                │               └── <p> (오류 메시지)
                │
                └── <Button> "수정 내용 저장"
```

**상태 관리**:
- `state` - 'idle' | 'file_selected' | 'validating' | 'validation_complete'
- `file` - 선택된 파일
- `validationResult` - 검증 결과
- `editableData` - 수정 가능한 데이터 (2D 배열)

---

## 컴포넌트 역할 설명

### 페이지 컴포넌트

| 컴포넌트 | 경로 | 주요 역할 |
|---------|------|----------|
| `RootLayout` | `/` | 전역 레이아웃, HTML 구조, 폰트, 전역 스타일 |
| `HomePage` | `/` | 대시보드로 리다이렉트 |
| `LoginPage` | `/login` | 사용자 인증 폼 |
| `DashboardLayout` | `/dashboard/*` | 대시보드 공통 레이아웃 (사이드바, 헤더) |
| `DashboardPage` | `/dashboard` | 전체 현황 대시보드 (KPI, 차트, 최근 활동) |
| `StudentsPage` | `/dashboard/students` | 학생 정보 관리 |
| `ReportsPage` | `/dashboard/reports` | 리포트 생성 및 이력 관리 |
| `DataPage` | `/dashboard/data` | 데이터 업로드 및 검증 |
| `SettingsPage` | `/dashboard/settings` | 시스템 설정 관리 |

### 레이아웃 컴포넌트

| 컴포넌트 | 위치 | 주요 역할 |
|---------|------|----------|
| `AppSidebar` | 좌측 | 네비게이션 메뉴, 로고, 로그아웃 |
| `AppHeader` | 상단 | 검색, 알림, 사용자 메뉴 |

### 공유 컴포넌트

| 컴포넌트 | 위치 | 주요 역할 |
|---------|------|----------|
| `PageHeader` | 모든 페이지 | 페이지 제목, 설명, 액션 버튼 영역 |

### 기능별 컴포넌트

#### Dashboard
- `KpiCard`: 주요 성과 지표 카드
- `PerformanceChart`: 성과 추이 막대 그래프
- `RecentActivityTable`: 최근 활동 테이블

#### Students
- `StudentsTable`: 학생 목록, 검색, 필터, 상세 정보

#### Reports
- `ReportGeneration`: 리포트 생성 폼 및 진행 상황
- `HistoryTable`: 리포트 생성/전송 이력

#### Data
- `DataManagementClient`: 파일 업로드, AI 검증, 데이터 수정

### UI 컴포넌트 (shadcn/ui)

프로젝트는 shadcn/ui 기반의 표준화된 UI 컴포넌트를 사용합니다:

- **Form**: `button`, `input`, `label`, `textarea`, `select`, `checkbox`, `radio-group`
- **Layout**: `card`, `separator`, `scroll-area`
- **Overlay**: `dialog`, `dropdown-menu`, `popover`, `sheet`, `alert-dialog`
- **Feedback**: `alert`, `toast`, `progress`, `skeleton`
- **Data Display**: `table`, `badge`, `avatar`
- **Navigation**: `tabs`, `sidebar`, `menubar`
- **Chart**: `chart` (Recharts 래퍼)
- **기타**: `accordion`, `calendar`, `carousel`, `collapsible`, `slider`, `switch`, `tooltip`

---

## 데이터 흐름

### 1. 더미 데이터 흐름

```
lib/dummy-data.ts
├── kpis → DashboardPage → KpiCard × 4
├── students → StudentsPage → StudentsTable
├── reportHistory → ReportsPage → HistoryTable
├── transmissionHistory → ReportsPage → HistoryTable
└── performanceChartData → DashboardPage → PerformanceChart
```

### 2. 상태 관리 흐름

```
클라이언트 컴포넌트 ("use client")
├── useState → 로컬 상태 관리
├── useEffect → 사이드 이펙트 처리
└── 이벤트 핸들러 → 사용자 인터랙션 처리
```

### 3. AI 검증 흐름

```
DataManagementClient
├── 파일 업로드
├── fileToDataUri (변환)
├── validateUploadedData (AI 플로우 호출)
│   └── ai/flows/validate-uploaded-data.ts
│       └── Genkit AI 서버
└── 검증 결과 표시 및 수정
```

---

## 컴포넌트 의존성 관계

```
RootLayout
└── DashboardLayout
    ├── AppSidebar
    ├── AppHeader
    └── Pages
        ├── DashboardPage
        │   ├── PageHeader
        │   ├── KpiCard × 4
        │   ├── PerformanceChart
        │   └── RecentActivityTable
        │
        ├── StudentsPage
        │   ├── PageHeader
        │   └── StudentsTable
        │       └── Dialog (상세 정보)
        │
        ├── ReportsPage
        │   ├── PageHeader
        │   └── Tabs
        │       ├── ReportGeneration
        │       └── HistoryTable × 2
        │
        ├── DataPage
        │   ├── PageHeader
        │   └── DataManagementClient
        │
        └── SettingsPage
            ├── PageHeader
            └── Tabs
                └── Card × 3 (각 설정 섹션)
```

---

## 컴포넌트 특징

### 서버 vs 클라이언트 컴포넌트

**서버 컴포넌트** (기본):
- `app/**/page.tsx` (대부분)
- `app/**/layout.tsx`
- 데이터 페칭, SEO 최적화

**클라이언트 컴포넌트** (`"use client"`):
- 사용자 인터랙션이 필요한 컴포넌트
- 상태 관리가 필요한 컴포넌트
- 브라우저 API 사용 컴포넌트
- 예: `StudentsTable`, `ReportGeneration`, `DataManagementClient`, `AppHeader`, `AppSidebar`

### 타입 안정성

모든 컴포넌트는 TypeScript로 작성되어 있으며, `src/lib/types.ts`에서 중앙 집중식 타입 관리:

- `Student` - 학생 정보
- `Report` - 리포트 정보
- `Transmission` - 전송 정보
- `Kpi` - KPI 정보
- `PerformanceData` - 성과 데이터

---

이 문서는 프로젝트의 컴포넌트 구조를 이해하고 유지보수하는 데 도움이 됩니다.
