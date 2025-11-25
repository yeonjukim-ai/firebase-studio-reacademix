# 스크립트 사용 가이드

이 폴더에는 GitHub 이슈를 자동으로 생성하는 스크립트가 포함되어 있습니다.

## 📋 스크립트 설명

`create-issues-from-tasks` 스크립트는 `tasks/github-issues/` 폴더의 마크다운 파일들을 읽어서 GitHub 이슈로 자동 생성합니다.

### 주요 기능

- ✅ 마크다운 파일에서 제목, 본문, 라벨 자동 추출
- ✅ 중복 이슈 체크 (이미 존재하는 이슈는 건너뜀)
- ✅ 'Issue Automation' 라벨 자동 추가
- ✅ 진행 상황 및 결과 요약 출력

## 🚀 사용 방법

### 사전 요구사항

1. **GitHub CLI 설치**
   ```bash
   # Windows (winget)
   winget install --id GitHub.cli
   
   # macOS
   brew install gh
   
   # Linux
   sudo apt install gh
   ```

2. **GitHub CLI 인증**
   ```bash
   gh auth login
   ```

### 실행 방법

#### 방법 1: Node.js 스크립트 (권장)

```bash
npm run create-issues
```

또는

```bash
node scripts/create-issues-from-tasks.js
```

#### 방법 2: PowerShell 스크립트 (Windows)

```powershell
.\scripts\create-issues-from-tasks.ps1
```

#### 방법 3: Bash 스크립트 (Linux/Mac/WSL)

```bash
./scripts/create-issues-from-tasks.sh
```

## 📝 작업 파일 형식

스크립트는 다음 형식의 마크다운 파일을 처리합니다:

```markdown
# [Task] 작업 제목

**라벨**: `task`, `high-priority`, `testing`  
**예상 시간**: 2-3주

---

## 📋 작업 개요
...

## 📝 작업 내용
- [ ] 작업 항목 1
- [ ] 작업 항목 2
...
```

### 추출되는 정보

- **제목**: 첫 번째 `# 제목` 또는 파일명에서 추출
- **본문**: 전체 마크다운 파일 내용
- **라벨**: `**라벨**:` 줄에서 추출 (쉼표로 구분)

## 🔍 중복 체크

스크립트는 다음 방법으로 중복을 체크합니다:

1. 기존 이슈 목록을 가져옴 (`gh issue list`)
2. 제목을 소문자로 변환하여 비교
3. 일치하는 이슈가 있으면 건너뜀

## 🏷️ 라벨

각 이슈에는 다음 라벨이 자동으로 추가됩니다:

- 파일에서 추출한 라벨들
- `Issue Automation` (자동 추가)

## 📊 출력 예시

```
🚀 GitHub 이슈 자동 생성 시작

📁 15개의 작업 파일을 찾았습니다.

📋 기존 이슈 목록 확인 중...
   5개의 기존 이슈를 찾았습니다.

📄 처리 중: 01-테스트-코드-추가.md
   제목: 테스트 코드 추가
   📝 이슈 생성 중...
   ✅ 이슈 생성 완료: https://github.com/...

📊 결과 요약
   ✅ 생성됨: 10개
   ⏭️  건너뜀: 5개
   ❌ 실패: 0개
```

## ⚠️ 주의사항

1. **인증 필요**: GitHub CLI 인증이 되어 있어야 합니다.
2. **권한 필요**: 저장소에 이슈를 생성할 권한이 있어야 합니다.
3. **중복 방지**: 같은 제목의 이슈가 이미 있으면 건너뜁니다.
4. **임시 파일**: 스크립트는 임시 파일을 사용하며, 자동으로 정리됩니다.

## 🐛 문제 해결

### "GitHub CLI (gh)가 설치되어 있지 않습니다"

GitHub CLI를 설치하세요: https://cli.github.com/

### "GitHub CLI 인증이 필요합니다"

```bash
gh auth login
```

### "폴더를 찾을 수 없습니다"

프로젝트 루트에서 스크립트를 실행하세요.

### 이슈 생성 실패

- GitHub API 제한 확인
- 네트워크 연결 확인
- 저장소 권한 확인

## 📚 참고 자료

- [GitHub CLI 문서](https://cli.github.com/manual/)
- [GitHub Issues API](https://docs.github.com/en/rest/issues/issues)

