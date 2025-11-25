# GitHub 이슈 자동 생성 스크립트 (PowerShell)
# tasks/github-issues/ 폴더의 마크다운 파일들을 GitHub 이슈로 생성합니다.

$ErrorActionPreference = "Stop"

# 설정
$TASKS_DIR = Join-Path $PSScriptRoot ".." "tasks" "github-issues"
$AUTOMATION_LABEL = "Issue Automation"

Write-Host "`n🚀 GitHub 이슈 자동 생성 시작`n" -ForegroundColor Blue

# gh CLI 설치 확인
try {
    gh --version | Out-Null
} catch {
    Write-Host "❌ GitHub CLI (gh)가 설치되어 있지 않습니다." -ForegroundColor Red
    Write-Host "   설치 방법: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# 인증 확인
try {
    gh auth status | Out-Null
} catch {
    Write-Host "❌ GitHub CLI 인증이 필요합니다." -ForegroundColor Red
    Write-Host "   실행: gh auth login" -ForegroundColor Yellow
    exit 1
}

# tasks/github-issues/ 폴더 확인
if (-not (Test-Path $TASKS_DIR)) {
    Write-Host "❌ 폴더를 찾을 수 없습니다: $TASKS_DIR" -ForegroundColor Red
    exit 1
}

# 마크다운 파일 목록 가져오기
$files = Get-ChildItem -Path $TASKS_DIR -Filter "*.md" | 
    Where-Object { $_.Name -ne "README.md" } | 
    Sort-Object Name

if ($files.Count -eq 0) {
    Write-Host "⚠️  처리할 마크다운 파일이 없습니다." -ForegroundColor Yellow
    exit 0
}

Write-Host "📁 $($files.Count)개의 작업 파일을 찾았습니다.`n" -ForegroundColor Green

# 기존 이슈 목록 가져오기
Write-Host "📋 기존 이슈 목록 확인 중..." -ForegroundColor Cyan
$existingIssuesJson = gh issue list --json number,title --limit 1000 2>$null
$existingIssues = @{}
if ($existingIssuesJson) {
    $issues = $existingIssuesJson | ConvertFrom-Json
    foreach ($issue in $issues) {
        $existingIssues[$issue.title.ToLower()] = $issue.number
    }
}
Write-Host "   $($existingIssues.Count)개의 기존 이슈를 찾았습니다.`n" -ForegroundColor Cyan

# 각 파일 처리
$created = 0
$skipped = 0
$failed = 0

foreach ($file in $files) {
    Write-Host "`n📄 처리 중: $($file.Name)" -ForegroundColor Blue

    try {
        # 파일 내용 읽기
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

        # 제목 추출
        if ($content -match "^#\s+(.+)$") {
            $title = $matches[1].Trim() -replace "^\[Task\]\s*", ""
        } else {
            # 파일명에서 제목 생성
            $title = $file.BaseName -replace "^\d+-", "" -replace "-", " "
        }
        Write-Host "   제목: $title" -ForegroundColor Cyan

        # 중복 체크
        if ($existingIssues.ContainsKey($title.ToLower())) {
            $issueNumber = $existingIssues[$title.ToLower()]
            Write-Host "   ⏭️  이미 존재하는 이슈입니다 (#$issueNumber). 건너뜁니다." -ForegroundColor Yellow
            $skipped++
            continue
        }

        # 라벨 추출
        $labels = @()
        if ($content -match "\*\*라벨\*\*:\s*(.+)") {
            $labelString = $matches[1]
            $labels = $labelString -split "," | 
                ForEach-Object { $_.Trim() -replace "`", "" } | 
                Where-Object { $_ -and $_ -ne $AUTOMATION_LABEL }
        }

        # 임시 파일에 본문 저장
        $tempFile = Join-Path $env:TEMP "temp-issue-body-$(Get-Random).md"
        $content | Out-File -FilePath $tempFile -Encoding UTF8 -NoNewline

        # 라벨 목록 준비
        $allLabels = ($labels + $AUTOMATION_LABEL) -join ","

        # 이슈 생성
        Write-Host "   📝 이슈 생성 중..." -ForegroundColor Cyan
        $output = gh issue create --title "$title" --body-file "$tempFile" --label "$allLabels" 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ 이슈 생성 완료: $output" -ForegroundColor Green
            $created++
            
            # 기존 이슈 목록에 추가 (중복 방지)
            if ($output -match "#(\d+)") {
                $existingIssues[$title.ToLower()] = $matches[1]
            }
        } else {
            Write-Host "   ❌ 이슈 생성 실패: $output" -ForegroundColor Red
            $failed++
        }

        # 임시 파일 삭제
        if (Test-Path $tempFile) {
            Remove-Item $tempFile -Force
        }
    } catch {
        Write-Host "   ❌ 오류 발생: $_" -ForegroundColor Red
        $failed++
    }
}

# 결과 요약
Write-Host "`n" + ("=" * 50) -ForegroundColor Blue
Write-Host "`n📊 결과 요약" -ForegroundColor Blue
Write-Host "   ✅ 생성됨: $created 개" -ForegroundColor Green
Write-Host "   ⏭️  건너뜀: $skipped 개" -ForegroundColor Yellow
Write-Host "   ❌ 실패: $failed 개" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "White" })
Write-Host "`n" + ("=" * 50) + "`n" -ForegroundColor Blue

