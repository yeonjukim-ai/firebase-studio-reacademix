# ReAcademix 아키텍처 개요

이 문서는 ReAcademix 프로젝트의 주요 컴포넌트들의 역할, props 구조, 데이터 흐름, 이벤트 흐름을 정리한 아키텍처 개요입니다.

**최종 업데이트**: 2024년

---

## 📋 목차

- [공유 컴포넌트 (Shared Components)](#공유-컴포넌트-shared-components)
- [레이아웃 컴포넌트 (Layout Components)](#레이아웃-컴포넌트-layout-components)
- [대시보드 컴포넌트 (Dashboard Components)](#대시보드-컴포넌트-dashboard-components)
- [기능 컴포넌트 (Feature Components)](#기능-컴포넌트-feature-components)
- [페이지 컴포넌트 (Page Components)](#페이지-컴포넌트-page-components)
- [Custom Hooks](#custom-hooks)

---

## 공유 컴포넌트 (Shared Components)

### PageHeader

**파일**: `src/components/shared/PageHeader.tsx`

**역할**:
- 페이지의 제목, 설명, 액션 버튼을 표시하는 공통 헤더 컴포넌트
- 모든 페이지에서 일관된 헤더 스타일을 제공

**Props 구조**:
- `title: string` - 페이지 제목 (필수)
- `description?: string` - 페이지 설명 (선택)
- `children?: ReactNode` - 우측에 표시될 액션 버튼들 (선택)
- `className?: string` - 추가 CSS 클래스 (선택)

**데이터 흐름**:
- Props로 받은 title, description을 표시
- children으로 전달된 ReactNode를 우측에 배치
- 스타일 유틸리티(heading1, bodySmall, buttonGroup)를 사용하여 일관된 디자인 적용

**이벤트 흐름**:
- 이 컴포넌트 자체는 이벤트를 발생시키지 않음
- children으로 전달된 버튼들이 각자의 이벤트 핸들러를 가짐

---

### SectionCard

**파일**: `src/components/shared/SectionCard.tsx`

**역할**:
- Card + Header + Title + Description + Content 패턴을 표준화한 재사용 가능한 섹션 카드
- Settings 페이지, ReportGeneration, DataManagementClient 등에서 사용
- 일관된 카드 스타일과 레이아웃을 제공

**Props 구조**:
- `title: string` - 카드 제목 (필수)
- `description?: string` - 카드 설명 (선택)
- `children: ReactNode` - 카드 본문 내용 (필수)
- `footer?: ReactNode` - 카드 하단에 표시될 내용 (선택)
- `headerAction?: ReactNode` - 헤더 우측에 표시될 액션 버튼 (선택)
- `className?: string` - 카드 컨테이너에 적용할 추가 CSS 클래스 (선택)
- `contentClassName?: string` - 콘텐츠 영역에 적용할 추가 CSS 클래스 (선택)
- `interactive?: boolean` - 호버 효과 활성화 여부 (기본값: false)

**데이터 흐름**:
- Props로 받은 title, description을 CardHeader에 표시
- children을 CardContent에 렌더링
- footer가 있으면 CardFooter에 렌더링
- headerAction이 있으면 헤더 우측에 배치
- interactive가 true이면 호버 시 그림자와 테두리 효과 적용

**이벤트 흐름**:
- 이 컴포넌트 자체는 이벤트를 발생시키지 않음
- children이나 footer, headerAction으로 전달된 컴포넌트들이 각자의 이벤트 핸들러를 가짐
- interactive가 true일 때 호버 이벤트에 반응하여 스타일 변경

---

### TableCard

**파일**: `src/components/shared/TableCard.tsx`

**역할**:
- Card로 감싸진 테이블 패턴을 표준화한 재사용 가능한 컴포넌트
- RecentActivityTable, HistoryTable 등에서 사용
- 제네릭 타입을 사용하여 다양한 데이터 타입 지원

**Props 구조**:
- `title: string` - 테이블 제목 (필수)
- `description?: string` - 테이블 설명 (선택)
- `columns: TableColumn[]` - 테이블 컬럼 정의 배열 (필수)
  - `key: string` - 컬럼 고유 키
  - `label: string` - 컬럼 헤더 라벨
  - `className?: string` - 컬럼 헤더에 적용할 CSS 클래스
- `data: T[]` - 테이블에 표시할 데이터 배열 (필수)
- `renderRow: (item: T, index: number) => ReactNode` - 각 행을 렌더링하는 함수 (필수)
- `headerAction?: ReactNode` - 헤더 우측에 표시될 액션 버튼 (선택)
- `className?: string` - 카드 컨테이너에 적용할 추가 CSS 클래스 (선택)
- `emptyMessage?: string` - 데이터가 없을 때 표시할 메시지 (기본값: "데이터가 없습니다.")

**데이터 흐름**:
- columns 배열을 순회하여 TableHeader 생성
- data 배열을 순회하며 renderRow 함수를 호출하여 각 행 렌더링
- data가 비어있으면 emptyMessage 표시
- headerAction이 있으면 헤더 우측에 배치

**이벤트 흐름**:
- 이 컴포넌트 자체는 이벤트를 발생시키지 않음
- renderRow 함수 내에서 생성된 TableCell들이 각자의 이벤트 핸들러를 가질 수 있음
- 테이블 행에 호버 시 배경색 변경 효과 적용

---

### DataTable

**파일**: `src/components/shared/DataTable.tsx`

**역할**:
- Card 없이 테이블만 필요한 경우 사용하는 재사용 가능한 테이블 컴포넌트
- HistoryTable 등에서 사용
- 제네릭 타입을 사용하여 다양한 데이터 타입 지원
- 컬럼별 커스텀 렌더링 함수 지원

**Props 구조**:
- `columns: DataTableColumn<T>[]` - 테이블 컬럼 정의 배열 (필수)
  - `key: string` - 컬럼 고유 키
  - `label: string` - 컬럼 헤더 라벨
  - `className?: string` - 컬럼에 적용할 CSS 클래스
  - `render?: (item: T, index: number) => ReactNode` - 셀 커스텀 렌더링 함수 (선택)
- `data: T[]` - 테이블에 표시할 데이터 배열 (필수)
- `className?: string` - 테이블 컨테이너에 적용할 추가 CSS 클래스 (선택)
- `emptyMessage?: string` - 데이터가 없을 때 표시할 메시지 (기본값: "데이터가 없습니다.")
- `getRowKey?: (item: T, index: number) => string | number` - 행의 고유 키 생성 함수 (기본값: index)

**데이터 흐름**:
- columns 배열을 순회하여 TableHeader 생성
- data 배열을 순회하며 각 행 생성
- 각 셀은 column.render 함수가 있으면 해당 함수로 렌더링, 없으면 item[column.key] 값 표시
- data가 비어있으면 emptyMessage 표시

**이벤트 흐름**:
- 이 컴포넌트 자체는 이벤트를 발생시키지 않음
- column.render 함수 내에서 생성된 컴포넌트들이 각자의 이벤트 핸들러를 가질 수 있음
- 테이블 행에 호버 시 배경색 변경 효과 적용

---

## 레이아웃 컴포넌트 (Layout Components)

### AppHeader

**파일**: `src/components/layout/AppHeader.tsx`

**역할**:
- 애플리케이션의 상단 헤더 바 컴포넌트
- 검색, 알림, 사용자 프로필 메뉴를 제공
- 모바일에서 사이드바 토글 버튼 표시
- sticky 포지셔닝으로 스크롤 시에도 상단에 고정

**Props 구조**:
- Props 없음 (자체적으로 필요한 데이터를 관리)

**데이터 흐름**:
- PlaceHolderImages에서 사용자 아바타 이미지 가져오기
- 검색 입력 필드는 현재 상태 관리 없음 (향후 구현 예정)
- 사용자 드롭다운 메뉴는 정적 메뉴 항목 표시

**이벤트 흐름**:
- SidebarTrigger 클릭 → 사이드바 토글 (모바일)
- 검색 입력 필드 포커스 → 포커스 링 효과
- 알림 버튼 호버 → 스케일 효과 및 펄스 애니메이션
- 사용자 아바타 클릭 → 드롭다운 메뉴 열기/닫기
- 드롭다운 메뉴 항목 클릭 → 각각의 액션 수행 (현재는 정적)

---

## 대시보드 컴포넌트 (Dashboard Components)

### KpiCard

**파일**: `src/components/dashboard/KpiCard.tsx`

**역할**:
- 대시보드에 표시되는 KPI(핵심 성과 지표) 카드 컴포넌트
- 제목, 값, 변화량, 변화 방향(증가/감소)을 표시
- 호버 효과와 반응형 디자인 지원

**Props 구조 (Kpi 타입)**:
- `title: string` - KPI 제목 (예: "총 학생 수")
- `value: string` - KPI 값 (예: "1,234")
- `change: string` - 변화량 표시 (예: "+12.5%")
- `changeType: 'increase' | 'decrease'` - 변화 방향

**데이터 흐름**:
- Props로 받은 Kpi 데이터를 카드 형태로 표시
- changeType에 따라 화살표 아이콘과 색상이 변경됨
  - 'increase': ArrowUpRight (녹색)
  - 'decrease': ArrowDownRight (빨간색)
- value는 큰 폰트로 강조 표시
- change는 작은 폰트로 value 아래에 표시

**이벤트 흐름**:
- 카드에 호버 시 그림자와 테두리 효과 적용 (cardInteractive 스타일)
- 화살표 아이콘에 호버 시 스케일 효과 적용
- 클릭 이벤트는 없음 (표시 전용 컴포넌트)

---

### PerformanceChart

**파일**: `src/components/dashboard/PerformanceChart.tsx`

**역할**:
- 대시보드에 표시되는 학원/지점별 성과 추이 차트
- Recharts의 BarChart를 사용하여 막대 그래프 표시
- SectionCard로 감싸져 있음

**Props 구조**:
- Props 없음 (내부에서 performanceChartData를 직접 import)

**데이터 흐름**:
- performanceChartData (dummy-data) → BarChart의 data prop
- chartConfig: 차트 설정 (지점 A, 지점 B의 색상 정의)
- config: chartConfig를 useMemo로 메모이제이션 (일관성을 위해)

**이벤트 흐름**:
- 차트 호버 → ChartTooltip 표시
- 이벤트 직접 발생 없음 (표시 전용 컴포넌트)

**차트 구성**:
- X축: 월 (month)
- Y축: 성적 점수
- 데이터 시리즈: 지점 A, 지점 B

---

### RecentActivityTable

**파일**: `src/components/dashboard/RecentActivityTable.tsx`

**역할**:
- 대시보드에 표시되는 최근 리포트 활동 테이블
- reportHistory에서 최근 5개 항목만 표시
- TableCard 컴포넌트를 사용하여 구현

**Props 구조**:
- Props 없음 (내부에서 reportHistory 데이터를 직접 import)

**데이터 흐름**:
- reportHistory (dummy-data) → slice(0, 5) → recentReports (useMemo로 메모이제이션)
- columns: 테이블 컬럼 정의 (useMemo로 메모이제이션)
- headerAction: "전체 보기" 버튼 (useMemo로 메모이제이션)
- getBadgeVariant: 상태에 따른 배지 variant 결정 함수 (useMemo로 메모이제이션)

**이벤트 흐름**:
- "전체 보기" 버튼 클릭 → /dashboard/reports로 링크 이동
- 테이블 행 호버 → TableCard의 tableRowHover 스타일 적용

**성능 최적화**:
- 모든 정적 데이터를 useMemo로 메모이제이션하여 불필요한 리렌더링 방지

---

## 기능 컴포넌트 (Feature Components)

### StudentsTable

**파일**: `src/components/students/StudentsTable.tsx`

**역할**:
- 학생 목록을 테이블 형태로 표시하고 관리하는 컴포넌트
- 검색, 필터링(상태, 지점), 학생 상세 정보 조회 기능 제공
- useStudentFilter hook을 사용하여 필터링 로직 관리

**Props 구조**:
- Props 없음 (내부에서 students 데이터를 직접 import)

**데이터 흐름**:
- students (dummy-data) → useStudentFilter hook으로 필터링
- useStudentFilter 반환값:
  - filteredStudents: 검색어, 상태 필터, 지점 필터에 따라 필터링된 학생 목록
  - uniqueBranches, uniqueStatuses: 필터 옵션으로 사용할 고유 값들
  - handleSearchChange, handleStatusChange, handleBranchChange: 필터 변경 핸들러
- selectedStudent: 상세 정보를 보기 위해 선택된 학생 (Dialog 표시용)

**이벤트 흐름**:
- 검색 입력 변경 → handleSearchChange → searchTerm 업데이트 → filteredStudents 재계산
- 상태 필터 체크박스 클릭 → handleStatusChange → statusFilter 업데이트 → filteredStudents 재계산
- 지점 필터 체크박스 클릭 → handleBranchChange → branchFilter 업데이트 → filteredStudents 재계산
- "상세 보기" 버튼 클릭 → handleSelectStudent → selectedStudent 설정 → Dialog 열림
- Dialog 닫기 → handleCloseDialog → selectedStudent null로 설정 → Dialog 닫힘

**상태 관리**:
- selectedStudent: 로컬 state로 관리 (Dialog 열림/닫힘 제어)
- 필터링 관련 state는 useStudentFilter hook에서 관리

---

### ReportGeneration

**파일**: `src/components/reports/ReportGeneration.tsx`

**역할**:
- 리포트 생성 프로세스를 관리하는 컴포넌트
- 리포트 템플릿, 대상, 기간 선택 → 리포트 생성 → 진행률 표시 → 완료/실패 처리
- useReportGeneration hook을 사용하여 상태 및 로직 관리

**Props 구조**:
- Props 없음 (내부에서 필요한 상태를 hook으로 관리)

**데이터 흐름**:
- useReportGeneration hook 반환값:
  - date: 선택된 날짜 범위 (DateRange)
  - generationState: 리포트 생성 상태 ("idle" | "generating" | "completed" | "failed")
  - progress: 생성 진행률 (0-100)
  - handleGenerate: 리포트 생성 시작 함수
  - resetState: 상태 초기화 함수
- formattedDateRange: date를 포맷팅한 문자열 (useMemo로 메모이제이션)

**이벤트 흐름**:
- 날짜 선택 → setDate → date 업데이트 → formattedDateRange 재계산
- "리포트 생성 시작" 버튼 클릭 → handleGenerate → generationState를 "generating"으로 변경
  → progress interval 시작 → 5초 후 완료/실패 처리
- 생성 완료 시 → "새 리포트 생성" 또는 "다운로드" 버튼 표시
- 생성 실패 시 → "다시 시도" 버튼 표시
- resetState 호출 → 모든 상태 초기화 → "idle" 상태로 복귀

**상태 관리**:
- 리포트 생성 관련 상태는 useReportGeneration hook에서 관리
- interval과 timeout은 hook 내부에서 ref로 관리하여 cleanup 처리

---

### DataManagementClient

**파일**: `src/components/data/DataManagementClient.tsx`

**역할**:
- 파일 업로드 및 AI 기반 데이터 검증을 처리하는 컴포넌트
- CSV 파일 업로드 → AI 검증 → 에러 수정 → 저장 프로세스 관리
- useDataValidation hook을 사용하여 복잡한 상태 및 로직 관리

**Props 구조**:
- Props 없음 (내부에서 필요한 상태를 hook으로 관리)

**데이터 흐름**:
- useDataValidation hook 반환값:
  - state: 현재 상태 ('idle' | 'file_selected' | 'validating' | 'validation_complete')
  - file: 업로드된 파일 객체
  - validationResult: AI 검증 결과 (ValidateUploadedDataOutput)
  - editableData: 수정 가능한 CSV 데이터 (2차원 배열)
  - handleFileChange, handleDrop, handleDragOver: 파일 업로드 핸들러
  - handleValidate: 데이터 검증 시작 함수
  - handleCellChange: 테이블 셀 값 변경 핸들러
  - handleSaveChanges: 수정된 데이터 저장 함수
  - reset: 상태 초기화 함수
  - getCellError: 특정 셀의 에러 정보 조회 함수
- fileSize: 파일 크기 포맷팅 (useMemo로 메모이제이션)
- headerAction: 헤더에 표시될 뒤로가기 버튼 (useMemo로 메모이제이션)

**이벤트 흐름**:
- 파일 드래그 앤 드롭 또는 클릭 → handleDrop/handleFileChange → file 설정 → state를 'file_selected'로 변경
- "업로드 및 데이터 검증" 버튼 클릭 → handleValidate → state를 'validating'으로 변경
  → AI 검증 API 호출 (2초 시뮬레이션) → validationResult 설정 → state를 'validation_complete'로 변경
- 검증 성공 시 → 성공 Alert 표시
- 검증 실패 시 → 에러 Alert 및 수정 가능한 테이블 표시
- 테이블 셀 값 변경 → handleCellChange → editableData 업데이트
- "수정 내용 저장" 버튼 클릭 → handleSaveChanges → 토스트 알림 → reset 호출
- 뒤로가기 버튼 클릭 → reset → 모든 상태 초기화 → 'idle' 상태로 복귀

**상태 관리**:
- 파일 업로드 및 검증 관련 상태는 useDataValidation hook에서 관리
- timeout은 hook 내부에서 ref로 관리하여 cleanup 처리

---

### HistoryTable

**파일**: `src/components/reports/HistoryTable.tsx`

**역할**:
- 리포트 생성 이력 또는 전송 이력을 표시하는 테이블 컴포넌트
- DataTable 컴포넌트를 사용하여 구현
- type prop에 따라 생성 이력 또는 전송 이력으로 동작

**Props 구조**:
- `data: HistoryItem[]` - 표시할 이력 데이터 배열 (필수)
- `type: "generation" | "transmission"` - 이력 타입 (필수)

**데이터 흐름**:
- data prop → DataTable의 data prop
- type prop에 따라 컬럼 라벨과 렌더링 로직이 변경됨
  - "generation": 리포트 명, 대상, 생성자, 생성일 표시
  - "transmission": 리포트 명, 수신자, 채널, 전송일 표시
- columns: type에 따라 동적으로 생성되는 컬럼 정의 배열

**이벤트 흐름**:
- "다운로드" 버튼 클릭 (생성 이력, completed 상태) → 현재는 이벤트 핸들러 없음
- "재전송" 버튼 클릭 (전송 이력, sent 상태) → 현재는 이벤트 핸들러 없음
- 테이블 행 호버 → DataTable의 tableRowHover 스타일 적용

**상태 표시**:
- completed/sent: 파란색 배지 (default variant)
- failed: 빨간색 배지 (destructive variant)
- 기타: 회색 배지 (secondary variant)

---

## 페이지 컴포넌트 (Page Components)

### DashboardPage

**파일**: `src/app/dashboard/page.tsx`

**역할**:
- 애플리케이션의 메인 대시보드 페이지
- KPI 카드, 성과 차트, 최근 활동 테이블을 표시
- 데이터 업로드 및 리포트 생성으로의 빠른 네비게이션 제공

**Props 구조**:
- Props 없음 (서버 컴포넌트)

**데이터 흐름**:
- kpis (dummy-data) → KpiCard 컴포넌트들로 렌더링
- PerformanceChart: performanceChartData를 내부에서 사용
- RecentActivityTable: reportHistory를 내부에서 사용
- useMemo로 KPI 카드 목록 메모이제이션하여 불필요한 리렌더링 방지

**이벤트 흐름**:
- "데이터 업로드" 버튼 클릭 → handleUploadClick → /dashboard/data로 라우팅
- "리포트 생성" 버튼 클릭 → handleReportClick → /dashboard/reports로 라우팅
- useCallback으로 핸들러 메모이제이션하여 성능 최적화

**컴포넌트 구조**:
- PageHeader: 페이지 제목과 액션 버튼
- KpiCard[]: 4개의 KPI 카드 (그리드 레이아웃)
- PerformanceChart: 성과 차트 (2/5 열)
- RecentActivityTable: 최근 활동 테이블 (3/5 열)

---

### StudentsPage

**파일**: `src/app/dashboard/students/page.tsx`

**역할**:
- 학생 목록을 관리하는 페이지
- PageHeader와 StudentsTable 컴포넌트를 조합하여 구성

**Props 구조**:
- Props 없음 (서버 컴포넌트)

**데이터 흐름**:
- PageHeader: 정적 제목과 설명 표시
- StudentsTable: students 데이터를 내부에서 import하여 표시

**이벤트 흐름**:
- "학생 추가" 버튼 클릭 → 현재는 이벤트 핸들러 없음 (향후 구현 예정)
- StudentsTable 내부의 이벤트는 해당 컴포넌트에서 처리

---

### ReportsPage

**파일**: `src/app/dashboard/reports/page.tsx`

**역할**:
- 리포트 생성, 생성 이력, 전송 이력을 관리하는 페이지
- Tabs 컴포넌트를 사용하여 3개의 탭으로 구성

**Props 구조**:
- Props 없음 (서버 컴포넌트)

**데이터 흐름**:
- reportHistory (dummy-data) → HistoryTable (type="generation")
- transmissionHistory (dummy-data) → HistoryTable (type="transmission")
- ReportGeneration: 내부에서 필요한 상태를 hook으로 관리

**이벤트 흐름**:
- 탭 전환 → Tabs 컴포넌트가 내부적으로 처리
- "리포트 생성" 탭: ReportGeneration 컴포넌트의 이벤트 처리
- "생성 이력" 탭: HistoryTable 컴포넌트의 이벤트 처리
- "전송 이력" 탭: HistoryTable 컴포넌트의 이벤트 처리

**컴포넌트 구조**:
- PageHeader: 페이지 제목과 설명
- Tabs: 3개의 탭 (리포트 생성, 생성 이력, 전송 이력)
  - TabsContent "generate": ReportGeneration 컴포넌트
  - TabsContent "generation-history": HistoryTable (type="generation")
  - TabsContent "transmission-history": HistoryTable (type="transmission")

---

## Custom Hooks

### useStudentFilter

**파일**: `src/hooks/useStudentFilter.ts`

**역할**:
- 학생 필터링 로직을 관리하는 custom hook
- 검색어, 상태 필터, 지점 필터를 관리하고 필터링된 학생 목록을 반환

**반환값**:
- `searchTerm: string` - 검색어
- `statusFilter: string[]` - 선택된 상태 필터 배열
- `branchFilter: string[]` - 선택된 지점 필터 배열
- `uniqueBranches: string[]` - 고유한 지점 목록 (useMemo로 메모이제이션)
- `uniqueStatuses: string[]` - 고유한 상태 목록 (useMemo로 메모이제이션)
- `filteredStudents: Student[]` - 필터링된 학생 목록 (useMemo로 메모이제이션)
- `handleSearchChange: (value: string) => void` - 검색어 변경 핸들러 (useCallback)
- `handleStatusChange: (status: string) => void` - 상태 필터 변경 핸들러 (useCallback)
- `handleBranchChange: (branch: string) => void` - 지점 필터 변경 핸들러 (useCallback)
- `resetFilters: () => void` - 모든 필터 초기화 (useCallback)

**데이터 흐름**:
- students 배열을 받아서 필터링 로직 수행
- searchTerm, statusFilter, branchFilter가 변경될 때마다 filteredStudents 재계산
- 모든 계산 결과와 핸들러를 메모이제이션하여 성능 최적화

---

### useReportGeneration

**파일**: `src/hooks/useReportGeneration.ts`

**역할**:
- 리포트 생성 로직을 관리하는 custom hook
- 리포트 생성 상태, 진행률, 날짜 범위를 관리하고 생성 프로세스를 제어

**반환값**:
- `date: DateRange | undefined` - 선택된 날짜 범위
- `setDate: (date: DateRange | undefined) => void` - 날짜 범위 설정 함수
- `generationState: GenerationState` - 리포트 생성 상태
- `progress: number` - 생성 진행률 (0-100)
- `handleGenerate: () => void` - 리포트 생성 시작 함수 (useCallback)
- `resetState: () => void` - 상태 초기화 함수 (useCallback)

**데이터 흐름**:
- 리포트 생성 프로세스의 모든 상태를 관리
- interval과 timeout을 ref로 관리하여 cleanup 처리
- 컴포넌트 언마운트 시 자동으로 interval과 timeout 정리

**이벤트 흐름**:
- handleGenerate 호출 → generationState를 "generating"으로 변경 → progress interval 시작
- 5초 후 → interval 정리 → progress를 100으로 설정 → generationState를 "completed" 또는 "failed"로 변경
- resetState 호출 → 모든 상태 초기화

---

### useDataValidation

**파일**: `src/hooks/useDataValidation.ts`

**역할**:
- 파일 업로드 및 데이터 검증 로직을 관리하는 custom hook
- 파일 선택, 드래그 앤 드롭, 데이터 검증, 에러 수정을 관리

**반환값**:
- `state: State` - 현재 상태 ('idle' | 'file_selected' | 'validating' | 'validation_complete')
- `file: File | null` - 업로드된 파일 객체
- `validationResult: ValidateUploadedDataOutput | null` - AI 검증 결과
- `editableData: string[][]` - 수정 가능한 CSV 데이터
- `handleFileChange: (file: File | null) => void` - 파일 변경 핸들러 (useCallback)
- `handleDrop: (event: React.DragEvent) => void` - 드래그 앤 드롭 핸들러 (useCallback)
- `handleDragOver: (event: React.DragEvent) => void` - 드래그 오버 핸들러 (useCallback)
- `handleValidate: () => Promise<void>` - 데이터 검증 시작 함수 (useCallback)
- `handleCellChange: (rowIndex: number, cellIndex: number, value: string) => void` - 셀 값 변경 핸들러 (useCallback)
- `handleSaveChanges: () => void` - 변경사항 저장 함수 (useCallback)
- `reset: () => void` - 상태 초기화 함수 (useCallback)
- `getCellError: (rowIndex: number, colName: string) => ValidationError | undefined` - 셀 에러 조회 함수 (useCallback)

**데이터 흐름**:
- 파일 업로드 → file 설정 → state를 'file_selected'로 변경
- 검증 시작 → state를 'validating'으로 변경 → AI API 호출 → validationResult 설정 → state를 'validation_complete'로 변경
- 검증 실패 시 → editableData 설정하여 수정 가능한 테이블 표시
- 셀 값 변경 → editableData 업데이트

**이벤트 흐름**:
- 파일 드래그 앤 드롭 또는 클릭 → handleDrop/handleFileChange
- "업로드 및 데이터 검증" 버튼 클릭 → handleValidate
- 테이블 셀 값 변경 → handleCellChange
- "수정 내용 저장" 버튼 클릭 → handleSaveChanges → reset
- timeout은 ref로 관리하여 cleanup 처리

---

## 아키텍처 패턴

### 컴포넌트 계층 구조

```
App (Root Layout)
├── AppHeader (레이아웃)
├── AppSidebar (레이아웃)
└── Pages
    ├── DashboardPage
    │   ├── PageHeader
    │   ├── KpiCard[]
    │   ├── PerformanceChart
    │   └── RecentActivityTable
    ├── StudentsPage
    │   ├── PageHeader
    │   └── StudentsTable
    └── ReportsPage
        ├── PageHeader
        └── Tabs
            ├── ReportGeneration
            └── HistoryTable[]
```

### 데이터 흐름 패턴

1. **상향식 데이터 흐름**: Props를 통해 데이터가 부모에서 자식으로 전달
2. **Hook 기반 상태 관리**: 복잡한 로직은 custom hook으로 분리
3. **메모이제이션**: useMemo, useCallback을 사용하여 성능 최적화
4. **Cleanup 처리**: useEffect와 ref를 사용하여 메모리 누수 방지

### 이벤트 흐름 패턴

1. **이벤트 핸들러 메모이제이션**: useCallback을 사용하여 안정적인 참조 유지
2. **상태 업데이트**: setState를 통한 상태 변경 → 리렌더링 트리거
3. **조건부 렌더링**: 상태에 따라 다른 UI 표시
4. **비동기 처리**: async/await를 사용한 비동기 작업 처리

---

## 성능 최적화 전략

1. **메모이제이션**: useMemo, useCallback을 적극 활용
2. **Hook 분리**: 복잡한 로직을 custom hook으로 분리하여 재사용성 향상
3. **Cleanup 처리**: interval, timeout을 ref로 관리하여 메모리 누수 방지
4. **조건부 렌더링**: 필요한 경우에만 컴포넌트 렌더링

---

## 향후 개선 사항

1. **상태 관리 라이브러리**: 전역 상태가 필요할 경우 Zustand 또는 Jotai 도입 고려
2. **에러 바운더리**: 에러 처리 및 복구 메커니즘 추가
3. **로딩 상태**: Suspense를 활용한 로딩 상태 관리
4. **폼 검증**: React Hook Form과 Zod를 활용한 폼 검증 강화

