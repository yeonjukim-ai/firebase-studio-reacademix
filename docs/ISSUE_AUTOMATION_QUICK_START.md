# GitHub 이슈 자동 생성 빠른 시작 가이드

## 🚀 5분 안에 시작하기

### 1. GitHub CLI 설치 및 인증

```bash
# GitHub CLI 설치 (Windows)
winget install --id GitHub.cli

# 인증
gh auth login
```

### 2. 스크립트 실행

```bash
npm run create-issues
```

끝! 🎉

## 📋 전체 프로세스 요약

```
1. 작업 목록 작성
   └─ tasks/ 폴더에 마크다운 파일 작성

2. GitHub 이슈 형식 변환
   └─ tasks/github-issues/ 폴더에 변환된 파일 생성

3. 자동화 스크립트 작성
   └─ scripts/create-issues-from-tasks.js

4. GitHub CLI 설정
   └─ gh auth login

5. 이슈 생성 실행
   └─ npm run create-issues
```

## 📝 작업 파일 작성 형식

```markdown
# [Task] 작업 제목

**라벨**: `task`, `high-priority`, `testing`  
**예상 시간**: 2-3주

---

## 📋 작업 개요
작업에 대한 간단한 설명

## 📝 작업 내용
- [ ] 작업 항목 1
- [ ] 작업 항목 2
```

## 🔍 주요 기능

- ✅ 자동 제목/본문/라벨 추출
- ✅ 중복 이슈 체크
- ✅ 라벨 자동 생성
- ✅ 'Issue Automation' 라벨 자동 추가
- ✅ 진행 상황 실시간 출력

## 📊 실행 결과

```
📊 결과 요약
   ✅ 생성됨: 15개
   ⏭️  건너뜀: 0개
   ❌ 실패: 0개
```

## 🆘 문제 해결

**인증 오류?**
```bash
gh auth login
```

**라벨 오류?**
→ 스크립트가 자동으로 라벨 생성 (최신 버전 사용)

**권한 오류?**
→ 저장소 관리자에게 권한 요청

---

더 자세한 내용은 [GITHUB_ISSUE_AUTOMATION.md](./GITHUB_ISSUE_AUTOMATION.md) 참고

