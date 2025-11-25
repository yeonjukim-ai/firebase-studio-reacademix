# ReAcademix State 및 데이터 흐름

이 문서는 사용자 액션 기준으로 State와 데이터가 어떻게 흐르는지 정리한 문서입니다.

**최종 업데이트**: 2024년

---

## 📋 목차

- [State 관리 개요](#state-관리-개요)
- [사용자 액션별 State 및 데이터 흐름](#사용자-액션별-state-및-데이터-흐름)
  - [1. 로그인](#1-로그인)
  - [2. 대시보드 조회](#2-대시보드-조회)
  - [3. 학생 검색](#3-학생-검색)
  - [4. 학생 필터링](#4-학생-필터링)
  - [5. 학생 상세 정보 조회](#5-학생-상세-정보-조회)
  - [6. 리포트 생성 시작](#6-리포트-생성-시작)
  - [7. 리포트 생성 진행](#7-리포트-생성-진행)
  - [8. 파일 업로드](#8-파일-업로드)
  - [9. AI 데이터 검증](#9-ai-데이터-검증)
  - [10. 데이터 수정](#10-데이터-수정)
  - [11. 데이터 저장](#11-데이터-저장)

---

## State 관리 개요

### State 관리 전략

ReAcademix는 다음과 같은 State 관리 전략을 사용합니다:

1. **로컬 State (useState)**: 컴포넌트 내부 상태
2. **Custom Hooks**: 복잡한 로직을 Hook으로 분리
3. **Props 전달**: 부모에서 자식으로 데이터 전달
4. **더미 데이터**: 현재는 정적 더미 데이터 사용 (향후 Firebase 연동 예정)

### 주요 State 관리 Hook

| Hook | 위치 | 관리하는 State |
|------|------|---------------|
| `useStudentFilter` | `src/hooks/useStudentFilter.ts` | 검색어, 상태 필터, 지점 필터, 필터링된 학생 목록 |
| `useReportGeneration` | `src/hooks/useReportGeneration.ts` | 날짜 범위, 생성 상태, 진행률 |
| `useDataValidation` | `src/hooks/useDataValidation.ts` | 파일, 검증 상태, 검증 결과, 수정 가능한 데이터 |

---

## 사용자 액션별 State 및 데이터 흐름

### 1. 로그인

**사용자 액션**: 로그인 페이지에서 이메일/비밀번호 입력 후 "로그인" 버튼 클릭

**State 변경**:
```
[사용자 입력]
  ↓
Input 컴포넌트 (비제어 컴포넌트)
  - 이메일: value (로컬 DOM state)
  - 비밀번호: value (로컬 DOM state)
  ↓
Button 클릭
  ↓
Link 컴포넌트 → /dashboard로 리다이렉트
```

**데이터 흐름**:
```
LoginPage
  ├── Input (이메일) → DOM state
  ├── Input (비밀번호) → DOM state
  └── Button → Link → Next.js Router
      ↓
      /dashboard로 네비게이션
      ↓
      DashboardLayout 렌더링
```

**컴포넌트 업데이트**:
- `LoginPage` → `DashboardLayout`로 전환
- Next.js App Router가 페이지 전환 처리

**부수 효과**:
- URL 변경: `/login` → `/dashboard`
- 브라우저 히스토리 업데이트

**참고**: 현재는 실제 인증 로직 없이 단순 리다이렉트만 구현됨

---

### 2. 대시보드 조회

**사용자 액션**: 대시보드 페이지 접근 또는 새로고침

**State 변경**:
```
[페이지 로드]
  ↓
DashboardPage 렌더링
  ↓
더미 데이터 import
  ├── kpis (Kpi[])
  ├── performanceChartData (PerformanceData[])
  └── reportHistory (Report[])
  ↓
컴포넌트 렌더링
  ├── KpiCard[] (4개) - kpis 데이터 사용
  ├── PerformanceChart - performanceChartData 사용
  └── RecentActivityTable - reportHistory.slice(0, 5) 사용
```

**데이터 흐름**:
```
dummy-data.ts
  ├── kpis
  │   └── DashboardPage
  │       └── KpiCard[] (4개 인스턴스)
  │           └── 각 KPI 데이터 표시
  │
  ├── performanceChartData
  │   └── DashboardPage
  │       └── PerformanceChart
  │           └── SectionCard
  │               └── BarChart
  │                   └── 데이터 시각화
  │
  └── reportHistory
      └── DashboardPage
          └── RecentActivityTable
              └── TableCard
                  └── Table (최근 5개만 표시)
```

**컴포넌트 업데이트**:
- `DashboardPage` 초기 렌더링
- `KpiCard`, `PerformanceChart`, `RecentActivityTable` 동시 렌더링
- 모든 데이터는 정적이므로 리렌더링 없음

**메모이제이션**:
```typescript
// DashboardPage에서
const kpiCards = useMemo(
  () => kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />),
  []
);
```

**부수 효과**:
- 없음 (정적 데이터만 표시)

---

### 3. 학생 검색

**사용자 액션**: 학생 관리 페이지에서 검색 입력 필드에 텍스트 입력

**State 변경**:
```
[사용자 입력]
  ↓
Input onChange 이벤트
  ↓
handleSearchChange(value) 호출
  ↓
useStudentFilter Hook
  ├── setSearchTerm(value) 실행
  │   └── searchTerm state 업데이트
  │
  └── filteredStudents 재계산 (useMemo)
      ├── students 배열 필터링
      ├── searchTerm으로 검색 (이름, 반, ID)
      ├── statusFilter 적용
      └── branchFilter 적용
      ↓
      filteredStudents 반환
```

**데이터 흐름**:
```
Input (검색어)
  ↓
handleSearchChange(value)
  ↓
useStudentFilter Hook
  ├── searchTerm state: "" → "김민준"
  │
  └── filteredStudents (useMemo)
      ├── 의존성: [students, searchTerm, statusFilter, branchFilter]
      ├── students.filter() 실행
      │   ├── student.name.includes("김민준")
      │   ├── student.class.includes("김민준")
      │   └── student.id.includes("김민준")
      └── 필터링된 배열 반환
          ↓
          StudentsTable 컴포넌트
              └── Table
                  └── TableRow[] (필터링된 학생만 표시)
```

**컴포넌트 업데이트**:
```
StudentsTable 리렌더링
  ├── searchTerm 변경 감지
  ├── filteredStudents 재계산 (useMemo)
  └── TableBody의 TableRow[] 업데이트
      └── 필터링된 학생만 렌더링
```

**메모이제이션**:
```typescript
// useStudentFilter.ts
const filteredStudents = useMemo(() => {
  return students.filter((student) => {
    const searchMatch = /* 검색 로직 */;
    const statusMatch = /* 상태 필터 로직 */;
    const branchMatch = /* 지점 필터 로직 */;
    return searchMatch && statusMatch && branchMatch;
  });
}, [students, searchTerm, statusFilter, branchFilter]);
```

**부수 효과**:
- 테이블 행 수 변경 (실시간 필터링)
- 검색어 입력 즉시 반영 (debounce 없음)

---

### 4. 학생 필터링

**사용자 액션**: 필터 드롭다운에서 상태 또는 지점 체크박스 클릭

**State 변경**:
```
[체크박스 클릭]
  ↓
handleStatusChange(status) 또는 handleBranchChange(branch) 호출
  ↓
useStudentFilter Hook
  ├── setStatusFilter 또는 setBranchFilter 실행
  │   ├── 이전 배열에 status/branch 포함 여부 확인
  │   ├── 포함되어 있으면: 배열에서 제거
  │   └── 포함되지 않으면: 배열에 추가
  │       └── statusFilter/branchFilter state 업데이트
  │
  └── filteredStudents 재계산 (useMemo)
      ├── statusFilter.length === 0 → 모든 상태 허용
      ├── statusFilter.includes(student.status) → 필터링
      └── branchFilter도 동일 로직 적용
```

**데이터 흐름**:
```
DropdownMenuCheckboxItem 클릭
  ↓
handleStatusChange("active") 호출
  ↓
useStudentFilter Hook
  ├── statusFilter: [] → ["active"]
  │
  └── filteredStudents (useMemo)
      ├── 의존성 변경 감지: statusFilter
      ├── students.filter() 재실행
      │   ├── searchMatch 확인
      │   ├── statusMatch: statusFilter.includes("active") → true
      │   └── branchMatch 확인
      └── 필터링된 배열 반환
          ↓
          StudentsTable 컴포넌트
              └── Table 업데이트
```

**컴포넌트 업데이트**:
```
StudentsTable 리렌더링
  ├── statusFilter 또는 branchFilter 변경 감지
  ├── filteredStudents 재계산
  └── TableBody의 TableRow[] 업데이트
```

**메모이제이션**:
```typescript
// useStudentFilter.ts
const handleStatusChange = useCallback((status: string) => {
  setStatusFilter(prev => 
    prev.includes(status) 
      ? prev.filter(s => s !== status)  // 토글: 제거
      : [...prev, status]                 // 토글: 추가
  );
}, []);

const handleBranchChange = useCallback((branch: string) => {
  setBranchFilter(prev =>
    prev.includes(branch)
      ? prev.filter(b => b !== branch)
      : [...prev, branch]
  );
}, []);
```

**부수 효과**:
- 테이블 행 수 변경
- 다중 필터 조합 가능 (상태 + 지점)

---

### 5. 학생 상세 정보 조회

**사용자 액션**: 학생 목록에서 "상세 보기" 버튼 클릭

**State 변경**:
```
[버튼 클릭]
  ↓
handleSelectStudent(student) 호출
  ↓
StudentsTable 컴포넌트
  ├── setSelectedStudent(student) 실행
  │   └── selectedStudent state: null → Student 객체
  │
  └── Dialog 컴포넌트
      ├── open prop: selectedStudent !== null
      └── DialogContent 렌더링
```

**데이터 흐름**:
```
TableRow의 Button 클릭
  ↓
handleSelectStudent(student)
  ↓
StudentsTable 컴포넌트
  ├── selectedStudent state: null → Student 객체
  │   └── {
  │       id: "S001",
  │       name: "김민준",
  │       class: "A반",
  │       status: "active",
  │       avgScore: 88,
  │       attendance: 95,
  │       branch: "강남점"
  │     }
  │
  └── Dialog
      ├── open={selectedStudent !== null} → true
      └── DialogContent
          ├── DialogTitle: student.name
          └── 학생 정보 표시
```

**컴포넌트 업데이트**:
```
StudentsTable 리렌더링
  ├── selectedStudent state 변경
  └── Dialog 컴포넌트
      ├── open prop 변경 → Dialog 열림
      └── DialogContent 렌더링
          └── 학생 상세 정보 표시
```

**Dialog 닫기**:
```
[ESC 키 또는 배경 클릭]
  ↓
handleCloseDialog() 호출
  ↓
setSelectedStudent(null)
  ↓
selectedStudent state: Student → null
  ↓
Dialog open prop: true → false
  ↓
Dialog 닫힘
```

**부수 효과**:
- 모달 오버레이 표시
- 포커스 트랩 (Dialog 내부에 포커스 고정)
- ESC 키로 닫기 가능

---

### 6. 리포트 생성 시작

**사용자 액션**: 리포트 관리 페이지에서 템플릿, 대상, 기간 선택 후 "리포트 생성 시작" 버튼 클릭

**State 변경**:
```
[버튼 클릭]
  ↓
handleGenerate() 호출
  ↓
useReportGeneration Hook
  ├── setGenerationState("generating")
  │   └── generationState: "idle" → "generating"
  │
  ├── setProgress(0)
  │   └── progress: 0
  │
  ├── setInterval 시작 (500ms마다 실행)
  │   └── setProgress((prev) => prev + Math.random() * 10)
  │       └── progress: 0 → 90까지 증가
  │
  └── setTimeout 시작 (5초 후 실행)
      └── setGenerationState("completed" 또는 "failed")
```

**데이터 흐름**:
```
ReportGeneration 컴포넌트
  ├── Select (템플릿) → DOM state
  ├── Select (대상) → DOM state
  └── Calendar (날짜 범위)
      └── setDate(dateRange)
          ↓
          useReportGeneration Hook
              └── date state: undefined → DateRange
                  ↓
                  formattedDateRange (useMemo)
                      └── "Jan 01, 2024 - Jan 31, 2024"
                          ↓
                          Button 표시
                              ↓
                              handleGenerate() 호출
                                  ↓
                                  generationState: "idle" → "generating"
                                  progress: 0
                                  interval 시작
                                  timeout 시작
```

**컴포넌트 업데이트**:
```
ReportGeneration 리렌더링
  ├── generationState 변경: "idle" → "generating"
  ├── progress 변경: 0 → 증가
  └── 조건부 렌더링
      ├── Progress Bar 표시
      ├── Loader2 Icon 표시
      └── "생성 중..." 메시지 표시
```

**메모이제이션**:
```typescript
// ReportGeneration.tsx
const formattedDateRange = useMemo(() => {
  if (!date?.from) return null;
  if (date.to) {
    return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`;
  }
  return format(date.from, "LLL dd, y");
}, [date]);
```

**부수 효과**:
- interval 실행 (500ms마다 progress 업데이트)
- timeout 실행 (5초 후 완료 처리)
- Cleanup: 컴포넌트 언마운트 시 interval/timeout 정리

---

### 7. 리포트 생성 진행

**사용자 액션**: 리포트 생성 중 (자동 진행)

**State 변경**:
```
[Interval 실행 중]
  ↓
setInterval (500ms마다)
  ├── setProgress((prev) => {
  │     if (prev >= 90) return prev;
  │     return prev + Math.random() * 10;
  │   })
  │   └── progress: 0 → 10 → 20 → ... → 90
  │
  └── ReportGeneration 리렌더링
      └── Progress Bar 업데이트
          └── value={progress}
```

**5초 후 완료**:
```
[Timeout 실행]
  ↓
setTimeout (5초 후)
  ├── clearInterval(intervalRef.current)
  │   └── interval 정리
  │
  ├── setProgress(100)
  │   └── progress: 90 → 100
  │
  └── setGenerationState(Math.random() > 0.2 ? "completed" : "failed")
      └── generationState: "generating" → "completed" 또는 "failed"
          ↓
          ReportGeneration 리렌더링
              ├── Alert 표시 (성공/실패)
              └── Button 변경
                  ├── "다운로드" (completed)
                  └── "다시 시도" (failed)
```

**데이터 흐름**:
```
useReportGeneration Hook
  ├── intervalRef.current (ref)
  │   └── setInterval ID 저장
  │
  ├── timeoutRef.current (ref)
  │   └── setTimeout ID 저장
  │
  ├── progress state
  │   └── 0 → 10 → 20 → ... → 90 → 100
  │
  └── generationState state
      └── "idle" → "generating" → "completed" / "failed"
          ↓
          ReportGeneration 컴포넌트
              ├── Progress 컴포넌트
              │   └── value={progress}
              │
              └── 조건부 렌더링
                  ├── generationState === "generating"
                  │   └── 로딩 UI
                  │
                  ├── generationState === "completed"
                  │   └── 성공 Alert + 다운로드 버튼
                  │
                  └── generationState === "failed"
                      └── 실패 Alert + 다시 시도 버튼
```

**컴포넌트 업데이트**:
```
ReportGeneration 리렌더링 (500ms마다)
  ├── progress state 변경
  └── Progress Bar 애니메이션
      └── value prop 업데이트
```

**Cleanup 처리**:
```typescript
// useReportGeneration.ts
useEffect(() => {
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);
```

**부수 효과**:
- 진행률 바 애니메이션
- 5초 후 자동 완료 처리
- 메모리 누수 방지 (ref를 통한 cleanup)

---

### 8. 파일 업로드

**사용자 액션**: 데이터 관리 페이지에서 파일 드래그 앤 드롭 또는 파일 선택

**State 변경**:
```
[파일 드롭 또는 선택]
  ↓
handleDrop(event) 또는 handleFileChange(file) 호출
  ↓
useDataValidation Hook
  ├── 파일 형식 검증
  │   ├── CSV 파일인지 확인
  │   └── 유효하지 않으면: toast 알림
  │
  ├── setFile(selectedFile)
  │   └── file state: null → File 객체
  │
  └── setState('file_selected')
      └── state: 'idle' → 'file_selected'
```

**데이터 흐름**:
```
DataManagementClient 컴포넌트
  ├── 드래그 앤 드롭 영역
  │   ├── onDrop={handleDrop}
  │   └── onDragOver={handleDragOver}
  │
  └── Input (type="file", hidden)
      └── onChange → handleFileChange
          ↓
          useDataValidation Hook
              ├── handleFileChange(file)
              │   ├── 파일 형식 검증
              │   │   └── file.type === 'text/csv' || file.name.endsWith('.csv')
              │   │
              │   ├── setFile(file)
              │   │   └── file state: null → File 객체
              │   │       └── {
              │   │           name: "students.csv",
              │   │           size: 1024,
              │   │           type: "text/csv"
              │   │         }
              │   │
              │   └── setState('file_selected')
              │       └── state: 'idle' → 'file_selected'
              │
              └── DataManagementClient 리렌더링
                  └── 파일 정보 카드 표시
                      ├── 파일 이름
                      ├── 파일 크기 (fileSize useMemo)
                      └── "업로드 및 데이터 검증" 버튼
```

**컴포넌트 업데이트**:
```
DataManagementClient 리렌더링
  ├── state 변경: 'idle' → 'file_selected'
  ├── file state 변경: null → File 객체
  └── 조건부 렌더링
      ├── state === 'idle' → 파일 업로드 영역
      └── state === 'file_selected' → 파일 정보 카드
```

**메모이제이션**:
```typescript
// DataManagementClient.tsx
const fileSize = useMemo(() => {
  if (!file) return '';
  return `${(file.size / 1024).toFixed(2)} KB`;
}, [file]);
```

**부수 효과**:
- 파일 정보 카드 표시
- 파일 크기 포맷팅 (KB 단위)

---

### 9. AI 데이터 검증

**사용자 액션**: "업로드 및 데이터 검증" 버튼 클릭

**State 변경**:
```
[버튼 클릭]
  ↓
handleValidate() 호출
  ↓
useDataValidation Hook
  ├── setState('validating')
  │   └── state: 'file_selected' → 'validating'
  │
  ├── setTimeout 시작 (2초 후 실행)
  │   └── 비동기 검증 프로세스
  │       ├── fileToDataUri(file) 실행
  │       │   └── File → Data URI 변환
  │       │
  │       ├── validateUploadedData() 호출
  │       │   └── Genkit AI Flow 실행
  │       │       ├── validateDataPrompt 실행
  │       │       └── Google GenAI API 호출
  │       │           └── 검증 결과 반환
  │       │
  │       ├── setValidationResult(result)
  │       │   └── validationResult state: null → ValidateUploadedDataOutput
  │       │
  │       ├── 검증 실패 시
  │       │   ├── dataUriToCsv(dataUri) 실행
  │       │   │   └── Data URI → CSV 2차원 배열 변환
  │       │   │
  │       │   └── setEditableData(csvData)
  │       │       └── editableData state: [] → string[][]
  │       │
  │       └── setState('validation_complete')
  │           └── state: 'validating' → 'validation_complete'
```

**데이터 흐름**:
```
DataManagementClient
  └── Button ("업로드 및 데이터 검증")
      ↓
      handleValidate()
          ↓
          useDataValidation Hook
              ├── state: 'file_selected' → 'validating'
              │
              └── setTimeout (2초)
                  ↓
                  fileToDataUri(file)
                      └── FileReader.readAsDataURL()
                          └── dataUri: "data:text/csv;base64,..."
                              ↓
                              validateUploadedData({
                                fileDataUri: dataUri,
                                fileType: 'CSV'
                              })
                                  ↓
                                  Genkit AI Flow
                                      ├── validateDataPrompt
                                      │   └── AI 프롬프트 생성
                                      │
                                      └── Google GenAI API
                                          └── {
                                              isValid: false,
                                              validationErrors: [
                                                {
                                                  row: 3,
                                                  column: "avgScore",
                                                  errorType: "Missing Value",
                                                  errorMessage: "..."
                                                }
                                              ]
                                            }
                                              ↓
                                              setValidationResult(result)
                                                  ↓
                                                  검증 실패 시
                                                      ↓
                                                      dataUriToCsv(dataUri)
                                                          └── [
                                                              ["이름", "점수", "출석률"],
                                                              ["김민준", "88", "95"],
                                                              ["이서연", "", "98"]  // 에러 셀
                                                            ]
                                                              ↓
                                                              setEditableData(csvData)
                                                                  ↓
                                                                  setState('validation_complete')
                                                                      ↓
                                                                      DataManagementClient 리렌더링
                                                                          ├── Alert (검증 결과)
                                                                          └── Table (수정 가능한 데이터)
```

**컴포넌트 업데이트**:
```
DataManagementClient 리렌더링
  ├── state 변경: 'file_selected' → 'validating' → 'validation_complete'
  ├── validationResult state 변경: null → ValidateUploadedDataOutput
  └── 조건부 렌더링
      ├── state === 'validating'
      │   └── 로딩 UI (Loader2 Icon)
      │
      └── state === 'validation_complete'
          ├── Alert (검증 결과)
          │   ├── isValid === true → 성공 Alert
          │   └── isValid === false → 에러 Alert
          │
          └── isValid === false
              └── Table (수정 가능한 데이터)
                  ├── editableData 사용
                  └── 에러 셀 빨간색 배경
```

**AI 통합**:
```typescript
// validate-uploaded-data.ts
export async function validateUploadedData(input: ValidateUploadedDataInput) {
  return validateUploadedDataFlow(input);
}

const validateUploadedDataFlow = ai.defineFlow({
  name: 'validateUploadedDataFlow',
  inputSchema: ValidateUploadedDataInputSchema,
  outputSchema: ValidateUploadedDataOutputSchema,
}, async input => {
  const {output} = await validateDataPrompt(input);
  return output!;
});
```

**부수 효과**:
- 2초 대기 (AI 검증 시뮬레이션)
- 검증 결과에 따른 UI 변경
- 에러 셀 하이라이트

---

### 10. 데이터 수정

**사용자 액션**: 검증 실패 후 테이블의 에러 셀에서 값 수정

**State 변경**:
```
[Input 값 변경]
  ↓
Input onChange 이벤트
  ↓
handleCellChange(rowIndex, cellIndex, value) 호출
  ↓
useDataValidation Hook
  └── setEditableData((prev) => {
        const newData = prev.map(row => [...row]);
        newData[rowIndex][cellIndex] = value;
        return newData;
      })
      └── editableData state 업데이트
          └── 특정 셀의 값만 변경
```

**데이터 흐름**:
```
Table의 Input (에러 셀)
  ├── rowIndex: 2 (3번째 행)
  ├── cellIndex: 1 (2번째 열)
  └── value: "" → "88"
      ↓
      handleCellChange(2, 1, "88")
          ↓
          useDataValidation Hook
              └── setEditableData((prev) => {
                    const newData = prev.map(row => [...row]);  // 불변성 유지
                    newData[2][1] = "88";  // 특정 셀만 업데이트
                    return newData;
                  })
                  ↓
                  editableData state 업데이트
                      └── [
                          ["이름", "점수", "출석률"],
                          ["김민준", "88", "95"],
                          ["이서연", "88", "98"]  // 수정됨
                        ]
                          ↓
                          DataManagementClient 리렌더링
                              └── Table의 Input value 업데이트
```

**컴포넌트 업데이트**:
```
DataManagementClient 리렌더링
  ├── editableData state 변경
  └── Table의 Input
      └── value prop 업데이트
          └── 수정된 값 표시
```

**에러 상태 확인**:
```typescript
// DataManagementClient.tsx
const cellError = getCellError(rowIndex, columnName);
// validationResult.validationErrors에서 해당 셀의 에러 찾기

// 에러가 있으면 빨간색 배경
className={cn(
  cellError && "bg-red-50 border-red-300"
)}
```

**부수 효과**:
- 실시간 입력 반영
- 에러 셀 하이라이트 유지 (수정 후에도)

---

### 11. 데이터 저장

**사용자 액션**: "수정 내용 저장" 버튼 클릭

**State 변경**:
```
[버튼 클릭]
  ↓
handleSaveChanges() 호출
  ↓
useDataValidation Hook
  ├── toast 알림 표시
  │   └── "저장 완료" 메시지
  │
  └── reset() 호출
      ├── setFile(null)
      │   └── file state: File → null
      │
      ├── setState('idle')
      │   └── state: 'validation_complete' → 'idle'
      │
      ├── setValidationResult(null)
      │   └── validationResult state: ValidateUploadedDataOutput → null
      │
      └── setEditableData([])
          └── editableData state: string[][] → []
```

**데이터 흐름**:
```
DataManagementClient
  └── Button ("수정 내용 저장")
      ↓
      handleSaveChanges()
          ↓
          useDataValidation Hook
              ├── toast({
              │     title: "저장 완료",
              │     description: "수정된 데이터가 성공적으로 저장되었습니다."
              │   })
              │   └── Toaster 컴포넌트에 Toast 추가
              │
              └── reset()
                  ├── timeoutRef.current 정리 (있으면)
                  │
                  ├── setFile(null)
                  ├── setState('idle')
                  ├── setValidationResult(null)
                  └── setEditableData([])
                      ↓
                      DataManagementClient 리렌더링
                          └── state === 'idle'
                              └── 파일 업로드 영역으로 복귀
```

**컴포넌트 업데이트**:
```
DataManagementClient 리렌더링
  ├── state 변경: 'validation_complete' → 'idle'
  ├── 모든 state 초기화
  └── 조건부 렌더링
      └── state === 'idle' → 파일 업로드 영역 표시
```

**Toast 알림**:
```
Toaster 컴포넌트 (RootLayout)
  └── Toast 추가
      ├── title: "저장 완료"
      ├── description: "수정된 데이터가 성공적으로 저장되었습니다."
      └── 자동 사라짐 (기본 5초 후)
```

**부수 효과**:
- Toast 알림 표시
- 모든 state 초기화
- UI가 초기 상태로 복귀

---

## State 관리 패턴 요약

### 1. 로컬 State (useState)
- 컴포넌트 내부 상태 관리
- 예: `selectedStudent`, `date`, `file`

### 2. Custom Hooks
- 복잡한 로직을 Hook으로 분리
- 예: `useStudentFilter`, `useReportGeneration`, `useDataValidation`

### 3. 메모이제이션 (useMemo, useCallback)
- 불필요한 재계산 방지
- 예: `filteredStudents`, `formattedDateRange`, `fileSize`

### 4. Ref를 통한 Side Effect 관리
- interval, timeout을 ref로 관리하여 cleanup 가능
- 예: `intervalRef`, `timeoutRef`

### 5. Cleanup 처리
- useEffect cleanup으로 메모리 누수 방지
- 예: interval/timeout 정리

---

## 데이터 흐름 패턴

### 1. 단방향 데이터 흐름
```
Props → Component → State → UI
```

### 2. Hook 기반 로직 분리
```
Component → Hook → State → Component
```

### 3. 조건부 렌더링
```
State → 조건 확인 → 다른 UI 렌더링
```

### 4. 비동기 처리
```
User Action → Async Function → State Update → UI Update
```

---

## 향후 개선 방향

### 1. 전역 State 관리
- Zustand 또는 Jotai 도입 고려
- 사용자 정보, 테마 설정 등

### 2. 서버 State 관리
- React Query 또는 SWR 도입
- Firebase Firestore 데이터 페칭 및 캐싱

### 3. 실시간 업데이트
- Firestore 리스너를 통한 실시간 동기화

### 4. Optimistic Updates
- 사용자 액션 즉시 UI 업데이트
- 서버 응답 후 실제 데이터 반영

---

**문서 작성일**: 2024년  
**다음 업데이트**: Firebase 연동 및 전역 State 관리 도입 시

