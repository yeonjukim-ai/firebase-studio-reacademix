# GitHub 이슈 형식 작업 목록

이 폴더에는 각 작업을 GitHub 이슈로 바로 생성할 수 있도록 정리된 문서들이 있습니다.

## 📁 사용 방법

### 방법 1: GitHub 웹 인터페이스에서 직접 생성

1. GitHub 저장소의 Issues 탭으로 이동
2. "New issue" 클릭
3. 각 작업 파일의 내용을 복사하여 이슈 본문에 붙여넣기
4. 제목은 파일명의 번호를 제외한 부분 사용 (예: "테스트 코드 추가")
5. 적절한 라벨 추가:
   - `task` (모든 작업)
   - `high-priority`, `medium-priority`, `low-priority` (우선순위)
   - `testing`, `refactoring`, `performance` 등 (작업 유형)

### 방법 2: GitHub CLI 사용

```bash
# GitHub CLI 설치 필요
gh issue create --title "[Task] 테스트 코드 추가" --body-file tasks/github-issues/01-테스트-코드-추가.md --label "task,high-priority,testing"
```

### 방법 3: 이슈 템플릿 사용

`.github/ISSUE_TEMPLATE/task.md` 템플릿을 사용하여 새 작업을 생성할 수 있습니다.

## 📋 작업 목록

### 🔴 우선순위 높음
- [01-테스트-코드-추가.md](01-테스트-코드-추가.md)
- [02-에러-처리-강화.md](02-에러-처리-강화.md)
- [03-접근성-개선.md](03-접근성-개선.md)

### 🟡 우선순위 중간
- [04-컴포넌트-분리-및-리팩토링.md](04-컴포넌트-분리-및-리팩토링.md)
- [05-상태-관리-개선.md](05-상태-관리-개선.md)
- [06-API-호출-최적화.md](06-API-호출-최적화.md)
- [07-Firebase-Firestore-연동.md](07-Firebase-Firestore-연동.md)

### 🟢 우선순위 낮음
- [08-성능-최적화.md](08-성능-최적화.md)
- [09-검색-기능-강화.md](09-검색-기능-강화.md)
- [10-필터-기능-개선.md](10-필터-기능-개선.md)
- [11-진행-중-작업-취소-기능.md](11-진행-중-작업-취소-기능.md)
- [12-키보드-단축키.md](12-키보드-단축키.md)
- [13-타입-안정성-강화.md](13-타입-안정성-강화.md)
- [14-리포트-기능-확장.md](14-리포트-기능-확장.md)
- [15-대시보드-개선.md](15-대시보드-개선.md)

## 🏷️ 권장 라벨

각 작업 파일 상단에 권장 라벨이 명시되어 있습니다. 이슈 생성 시 다음 라벨을 추가하세요:

- **공통**: `task`
- **우선순위**: `high-priority`, `medium-priority`, `low-priority`
- **작업 유형**: `testing`, `refactoring`, `performance`, `accessibility`, `error-handling`, `state-management`, `api`, `database`, `firebase`, `enhancement`

## 📝 참고 사항

- 각 이슈는 체크리스트 형식으로 작성되어 있어 진행 상황을 쉽게 추적할 수 있습니다.
- 작업 완료 시 체크리스트 항목을 업데이트하고, 모든 항목이 완료되면 이슈를 닫으세요.
- 관련된 다른 이슈가 있다면 "관련 이슈" 섹션에 링크를 추가하세요.

---

**원본 작업 문서**: `tasks/high-priority/`, `tasks/medium-priority/`, `tasks/low-priority/`

