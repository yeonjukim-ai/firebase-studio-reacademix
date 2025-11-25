# API 호출 최적화

## 우선순위: 🟡 중간
## 예상 시간: 2주

## 작업 내용

### 1. React Query 또는 SWR 도입
- [ ] React Query 선택 및 설치
  - [ ] 권장: React Query (TanStack Query)
  - [ ] `@tanstack/react-query` 설치
- [ ] React Query Provider 설정
  - [ ] 루트 레이아웃에 QueryClientProvider 추가
  - [ ] QueryClient 인스턴스 생성 및 설정
  - [ ] 위치: `src/lib/providers/query-provider.tsx`

### 2. API 레이어 구축
- [ ] API 함수들을 별도 파일로 분리
  - [ ] `src/lib/api/` 폴더 생성
  - [ ] Firebase 관련 API 함수들 정리
  - [ ] AI 검증 API 함수 정리
- [ ] API 함수 타입 정의
  - [ ] 요청/응답 타입 명확히 정의

### 3. React Query Hooks 생성
- [ ] 학생 데이터 조회 Hook
  - [ ] `useStudents` Hook 생성
  - [ ] 캐싱 및 자동 재시도 설정
  - [ ] 위치: `src/hooks/api/useStudents.ts`
- [ ] 리포트 생성 Hook
  - [ ] `useCreateReport` Mutation Hook 생성
  - [ ] 위치: `src/hooks/api/useCreateReport.ts`
- [ ] 리포트 이력 조회 Hook
  - [ ] `useReportHistory` Hook 생성
  - [ ] 위치: `src/hooks/api/useReportHistory.ts`
- [ ] 데이터 검증 Hook
  - [ ] `useValidateData` Mutation Hook 생성
  - [ ] 위치: `src/hooks/api/useValidateData.ts`

### 4. 기능 구현
- [ ] 자동 재시도 설정
  - [ ] 네트워크 에러 시 자동 재시도
  - [ ] 재시도 횟수 및 간격 설정
- [ ] 백그라운드 업데이트
  - [ ] 포커스 시 데이터 자동 갱신
  - [ ] 일정 시간마다 자동 갱신 (선택사항)
- [ ] 캐시 무효화
  - [ ] 데이터 변경 시 관련 캐시 무효화
  - [ ] Mutation 성공 시 쿼리 무효화

### 5. 기존 컴포넌트 마이그레이션
- [ ] 더미 데이터 사용 부분을 React Query Hook으로 교체
- [ ] 로딩 상태는 React Query의 `isLoading` 사용
- [ ] 에러 상태는 React Query의 `isError` 사용
- [ ] 수동 상태 관리 코드 제거

## 참고 사항
- React Query 문서: https://tanstack.com/query/latest
- 캐시 키 네이밍 규칙 정하기
- Stale time, Cache time 적절히 설정
- Optimistic updates 고려 (향후)

