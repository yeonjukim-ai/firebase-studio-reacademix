# [Task] Firebase Firestore 연동

**라벨**: `task`, `medium-priority`, `database`, `firebase`  
**예상 시간**: 2-3주

---

## 📋 작업 개요

더미 데이터를 실제 Firestore 데이터베이스로 교체하고, 실시간 업데이트 기능을 구현합니다.

## 🎯 목표

- Firestore 데이터베이스 설계 및 구축
- 더미 데이터를 실제 데이터베이스로 마이그레이션
- 실시간 데이터 동기화 구현

## 📝 작업 내용

### 1. Firestore 데이터베이스 설계
- [ ] 데이터베이스 스키마 설계
  - [ ] 컬렉션 구조 정의
    - [ ] `students` 컬렉션
    - [ ] `reports` 컬렉션
    - [ ] `settings` 컬렉션
  - [ ] 문서 구조 정의
  - [ ] 인덱스 설계
- [ ] Firestore 보안 규칙 작성
  - [ ] 읽기/쓰기 권한 설정
  - [ ] 사용자 인증 기반 접근 제어

### 2. Firestore 서비스 레이어 구축
- [ ] Firestore 서비스 함수 생성
  - [ ] `src/lib/services/firestore/` 폴더 생성
  - [ ] 학생 데이터 CRUD 함수
    - [ ] `getStudents()`
    - [ ] `getStudentById(id)`
    - [ ] `createStudent(data)`
    - [ ] `updateStudent(id, data)`
    - [ ] `deleteStudent(id)`
  - [ ] 리포트 데이터 CRUD 함수
    - [ ] `getReports()`
    - [ ] `createReport(data)`
    - [ ] `updateReportStatus(id, status)`
  - [ ] 설정 데이터 CRUD 함수
    - [ ] `getSettings()`
    - [ ] `updateSettings(data)`

### 3. 실시간 업데이트 구현
- [ ] Firestore 리스너 설정
  - [ ] 학생 목록 실시간 동기화
  - [ ] 리포트 상태 실시간 업데이트
  - [ ] 대시보드 데이터 실시간 갱신
- [ ] 리스너 cleanup 처리
  - [ ] 컴포넌트 언마운트 시 리스너 해제

### 4. 더미 데이터 마이그레이션
- [ ] Firestore에 초기 데이터 입력
  - [ ] 더미 학생 데이터 Firestore로 이전
  - [ ] 더미 리포트 데이터 Firestore로 이전
- [ ] 기존 더미 데이터 사용 부분 교체
  - [ ] `lib/dummy-data.ts` import 제거
  - [ ] Firestore 서비스 함수 사용으로 변경

### 5. 데이터 페칭 레이어 구축
- [ ] React Query와 통합
  - [ ] Firestore 서비스 함수를 React Query Hook에서 사용
  - [ ] 실시간 업데이트는 React Query의 `useQuery`와 리스너 조합
- [ ] 에러 처리 통합
  - [ ] Firestore 에러를 통일된 형식으로 변환

### 6. 테스트 및 검증
- [ ] 데이터 CRUD 기능 테스트
- [ ] 실시간 동기화 테스트
- [ ] 보안 규칙 테스트
- [ ] 성능 테스트 (대량 데이터)

## 📌 참고 사항

- Firestore 문서: https://firebase.google.com/docs/firestore
- 보안 규칙 시뮬레이터 활용
- 인덱스 생성 필요 시 Firebase Console에서 생성
- 데이터 마이그레이션 스크립트 작성 고려

---

**원본 문서**: `tasks/medium-priority/07-Firebase-Firestore-연동.md`

