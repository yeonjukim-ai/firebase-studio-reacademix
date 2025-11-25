#!/bin/bash

# GitHub 이슈 자동 생성 스크립트 (Bash)
# tasks/github-issues/ 폴더의 마크다운 파일들을 GitHub 이슈로 생성합니다.

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 설정
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TASKS_DIR="$SCRIPT_DIR/../tasks/github-issues"
AUTOMATION_LABEL="Issue Automation"

echo -e "\n${BLUE}🚀 GitHub 이슈 자동 생성 시작${NC}\n"

# gh CLI 설치 확인
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh)가 설치되어 있지 않습니다.${NC}"
    echo -e "${YELLOW}   설치 방법: https://cli.github.com/${NC}"
    exit 1
fi

# 인증 확인
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI 인증이 필요합니다.${NC}"
    echo -e "${YELLOW}   실행: gh auth login${NC}"
    exit 1
fi

# tasks/github-issues/ 폴더 확인
if [ ! -d "$TASKS_DIR" ]; then
    echo -e "${RED}❌ 폴더를 찾을 수 없습니다: $TASKS_DIR${NC}"
    exit 1
fi

# 마크다운 파일 목록 가져오기
files=$(find "$TASKS_DIR" -name "*.md" ! -name "README.md" | sort)

if [ -z "$files" ]; then
    echo -e "${YELLOW}⚠️  처리할 마크다운 파일이 없습니다.${NC}"
    exit 0
fi

file_count=$(echo "$files" | wc -l)
echo -e "${GREEN}📁 ${file_count}개의 작업 파일을 찾았습니다.${NC}\n"

# 기존 이슈 목록 가져오기
echo -e "${CYAN}📋 기존 이슈 목록 확인 중...${NC}"
existing_issues=$(gh issue list --json number,title --limit 1000 2>/dev/null || echo "[]")
existing_count=$(echo "$existing_issues" | jq -r 'length')
echo -e "   ${existing_count}개의 기존 이슈를 찾았습니다.\n"

# 각 파일 처리
created=0
skipped=0
failed=0

while IFS= read -r file_path; do
    if [ -z "$file_path" ]; then
        continue
    fi

    filename=$(basename "$file_path")
    echo -e "\n${BLUE}📄 처리 중: $filename${NC}"

    # 제목 추출
    title=$(grep -m 1 "^# " "$file_path" | sed 's/^# //' | sed 's/^\[Task\] *//' | xargs)
    
    # 파일명에서 제목 생성 (제목을 찾지 못한 경우)
    if [ -z "$title" ]; then
        title=$(basename "$file_path" .md | sed 's/^[0-9]*-//' | sed 's/-/ /g')
    fi

    echo -e "   ${CYAN}제목: $title${NC}"

    # 중복 체크
    title_lower=$(echo "$title" | tr '[:upper:]' '[:lower:]')
    existing_issue=$(echo "$existing_issues" | jq -r ".[] | select(.title | ascii_downcase == \"$title_lower\") | .number" | head -n 1)
    
    if [ -n "$existing_issue" ]; then
        echo -e "   ${YELLOW}⏭️  이미 존재하는 이슈입니다 (#$existing_issue). 건너뜁니다.${NC}"
        ((skipped++))
        continue
    fi

    # 라벨 추출
    labels=""
    label_line=$(grep -m 1 "^\*\*라벨\*\*:" "$file_path" || true)
    if [ -n "$label_line" ]; then
        labels=$(echo "$label_line" | sed 's/^\*\*라벨\*\*: *//' | sed 's/`//g' | tr ',' '\n' | sed 's/^ *//;s/ *$//' | grep -v "^$" | grep -v "^$AUTOMATION_LABEL$" | tr '\n' ',' | sed 's/,$//')
    fi

    # 라벨 목록 준비
    if [ -n "$labels" ]; then
        all_labels="$labels,$AUTOMATION_LABEL"
    else
        all_labels="$AUTOMATION_LABEL"
    fi

    # 임시 파일에 본문 저장
    temp_file=$(mktemp)
    cp "$file_path" "$temp_file"

    # 이슈 생성
    echo -e "   ${CYAN}📝 이슈 생성 중...${NC}"
    if output=$(gh issue create --title "$title" --body-file "$temp_file" --label "$all_labels" 2>&1); then
        echo -e "   ${GREEN}✅ 이슈 생성 완료: $output${NC}"
        ((created++))
        
        # 기존 이슈 목록 업데이트 (다음 중복 체크를 위해)
        issue_number=$(echo "$output" | grep -oP '#\K\d+' || echo "")
        if [ -n "$issue_number" ]; then
            existing_issues=$(echo "$existing_issues" | jq ". + [{\"number\": $issue_number, \"title\": \"$title\"}]")
        fi
    else
        echo -e "   ${RED}❌ 이슈 생성 실패: $output${NC}"
        ((failed++))
    fi

    # 임시 파일 삭제
    rm -f "$temp_file"

done <<< "$files"

# 결과 요약
echo -e "\n${BLUE}$(printf '=%.0s' {1..50})${NC}"
echo -e "\n${BLUE}📊 결과 요약${NC}"
echo -e "   ${GREEN}✅ 생성됨: $created 개${NC}"
echo -e "   ${YELLOW}⏭️  건너뜀: $skipped 개${NC}"
if [ $failed -gt 0 ]; then
    echo -e "   ${RED}❌ 실패: $failed 개${NC}"
else
    echo -e "   ❌ 실패: $failed 개"
fi
echo -e "\n${BLUE}$(printf '=%.0s' {1..50})${NC}\n"

