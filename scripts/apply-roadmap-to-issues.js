#!/usr/bin/env node

/**
 * 로드맵을 GitHub 이슈에 반영하는 스크립트
 * 마일스톤 생성 및 이슈에 할당
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 색상 출력
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 날짜 계산 유틸리티
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 이슈별 예상 시간 (일 단위)
const issueDurations = {
  4: 7,   // 1주
  5: 14,  // 1-2주 (2주로 계산)
  6: 14,  // 2주
  7: 7,   // 1주
  8: 14,  // 2주
  9: 21,  // 2-3주 (3주로 계산)
  10: 21, // 2-3주 (3주로 계산)
  11: 7,  // 1주
  12: 7,  // 1주
  13: 7,  // 1주
  14: 7,  // 1주
  15: 7,  // 1주
  16: 28, // 3-4주 (4주로 계산)
  17: 21  // 2-3주 (3주로 계산)
};

// 시작일: 2025-11-26 (이슈 #4)
const startDate = new Date('2025-11-26');

// 각 이슈의 시작일과 종료일 계산
function calculateIssueDates() {
  const dates = {};
  let currentDate = new Date(startDate);
  
  // 이슈 순서대로 날짜 계산
  const issueOrder = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  
  for (const issueNumber of issueOrder) {
    const duration = issueDurations[issueNumber];
    const endDate = addDays(currentDate, duration - 1);
    
    dates[issueNumber] = {
      startDate: formatDate(currentDate),
      endDate: formatDate(endDate)
    };
    
    // 다음 이슈는 이전 이슈 종료일 다음날 시작
    currentDate = addDays(endDate, 1);
  }
  
  return dates;
}

const issueDates = calculateIssueDates();

// 로드맵 데이터
const roadmap = {
  milestones: [
    {
      title: 'Phase 1: 핵심 안정성',
      description: '에러 처리 시스템 구축 및 접근성 기준 충족',
      dueDate: issueDates[5].endDate, // 이슈 #5 종료일
      issues: [4, 5]
    },
    {
      title: 'Phase 2: 코드 품질 향상',
      description: '컴포넌트 구조 개선, 전역 상태 관리 도입, API 호출 최적화',
      dueDate: issueDates[8].endDate, // 이슈 #8 종료일
      issues: [6, 7, 8]
    },
    {
      title: 'Phase 3: 데이터베이스 연동',
      description: 'Firestore 연동 완료, 실시간 업데이트 구현, 더미 데이터 마이그레이션',
      dueDate: issueDates[9].endDate, // 이슈 #9 종료일
      issues: [9]
    },
    {
      title: 'Phase 4: 성능 및 UX 개선',
      description: '성능 최적화 완료, 검색/필터 기능 강화',
      dueDate: issueDates[12].endDate, // 이슈 #12 종료일
      issues: [10, 11, 12]
    },
    {
      title: 'Phase 5: 고급 기능',
      description: '취소 기능, 단축키, 타입 안정성, 리포트 기능 확장, 대시보드 개선',
      dueDate: issueDates[17].endDate, // 이슈 #17 종료일
      issues: [13, 14, 15, 16, 17]
    }
  ],
  schedule: {
    4: { week: 1, phase: 'Phase 1', ...issueDates[4] },
    5: { week: 2, phase: 'Phase 1', ...issueDates[5] },
    6: { week: 3, phase: 'Phase 2', ...issueDates[6] },
    7: { week: 5, phase: 'Phase 2', ...issueDates[7] },
    8: { week: 6, phase: 'Phase 2', ...issueDates[8] },
    9: { week: 8, phase: 'Phase 3', ...issueDates[9] },
    10: { week: 11, phase: 'Phase 4', ...issueDates[10] },
    11: { week: 14, phase: 'Phase 4', ...issueDates[11] },
    12: { week: 15, phase: 'Phase 4', ...issueDates[12] },
    13: { week: 16, phase: 'Phase 5', ...issueDates[13] },
    14: { week: 17, phase: 'Phase 5', ...issueDates[14] },
    15: { week: 18, phase: 'Phase 5', ...issueDates[15] },
    16: { week: 19, phase: 'Phase 5', ...issueDates[16] },
    17: { week: 23, phase: 'Phase 5', ...issueDates[17] }
  }
};

/**
 * 마일스톤 생성
 */
function createMilestone(milestone) {
  try {
    log(`  📌 마일스톤 생성 중: ${milestone.title}`, 'cyan');
    
    // 마일스톤이 이미 존재하는지 확인
    let existing = null;
    try {
      const allMilestones = execSync(
        `gh api repos/yeonjukim-ai/firebase-studio-reacademix/milestones`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
      );
      const milestones = JSON.parse(allMilestones);
      existing = milestones.find(m => m.title === milestone.title);
    } catch (error) {
      // 마일스톤 목록 가져오기 실패 시 무시하고 계속 진행
    }

    if (existing) {
      log(`  ⏭️  마일스톤이 이미 존재합니다: ${milestone.title} (#${existing.number})`, 'yellow');
      return existing.number;
    }

    // 마일스톤 생성
    const command = `gh api repos/yeonjukim-ai/firebase-studio-reacademix/milestones -X POST -f title="${milestone.title}" -f description="${milestone.description}" -f due_on="${milestone.dueDate}T23:59:59Z"`;
    
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const milestoneData = JSON.parse(output);
    log(`  ✅ 마일스톤 생성 완료: #${milestoneData.number}`, 'green');
    return milestoneData.number;
  } catch (error) {
    log(`  ❌ 마일스톤 생성 실패: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * 이슈에 마일스톤 할당
 */
function assignMilestoneToIssue(issueNumber, milestoneNumber) {
  try {
    // GitHub API를 사용하여 마일스톤 할당
    execSync(
      `gh api repos/yeonjukim-ai/firebase-studio-reacademix/issues/${issueNumber} -X PATCH -f milestone=${milestoneNumber}`,
      { encoding: 'utf-8', stdio: 'ignore' }
    );
    log(`    ✅ 이슈 #${issueNumber}에 마일스톤 할당 완료`, 'green');
  } catch (error) {
    log(`    ❌ 이슈 #${issueNumber} 마일스톤 할당 실패: ${error.message}`, 'red');
  }
}

/**
 * 이슈 본문에 일정 정보 추가/업데이트
 */
function addScheduleToIssue(issueNumber, schedule) {
  try {
    // 현재 이슈 본문 가져오기
    const issueData = JSON.parse(
      execSync(`gh issue view ${issueNumber} --json body`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      })
    );

    let newBody = issueData.body || '';
    
    // 기존 일정 정보 섹션이 있으면 제거
    if (newBody.includes('## 📅 일정')) {
      const beforeSchedule = newBody.split('## 📅 일정')[0].trim();
      newBody = beforeSchedule;
    }

    // 일정 정보 추가/업데이트
    const scheduleInfo = `\n\n---\n\n## 📅 일정\n\n- **시작일**: ${schedule.startDate}\n- **종료 예정일**: ${schedule.endDate}\n- **시작 주차**: Week ${schedule.week}\n- **Phase**: ${schedule.phase}\n- **상세 일정**: [로드맵 문서 참고](../../docs/PROJECT_ROADMAP.md)`;

    newBody = newBody + scheduleInfo;

    // 이슈 본문 업데이트
    const tempFile = path.join(__dirname, `temp-issue-${issueNumber}.md`);
    fs.writeFileSync(tempFile, newBody, 'utf-8');

    execSync(
      `gh issue edit ${issueNumber} --body-file "${tempFile}"`,
      { encoding: 'utf-8', stdio: 'ignore' }
    );

    fs.unlinkSync(tempFile);
    log(`    ✅ 이슈 #${issueNumber}에 일정 정보 업데이트 완료 (${schedule.startDate} ~ ${schedule.endDate})`, 'green');
  } catch (error) {
    log(`    ❌ 이슈 #${issueNumber} 일정 정보 추가 실패: ${error.message}`, 'red');
  }
}

/**
 * 메인 함수
 */
function main() {
  log('\n🚀 로드맵을 GitHub 이슈에 반영 시작\n', 'blue');

  // gh CLI 확인
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch (error) {
    log('❌ GitHub CLI (gh)가 설치되어 있지 않습니다.', 'red');
    process.exit(1);
  }

  // 인증 확인
  try {
    execSync('gh auth status', { stdio: 'ignore' });
  } catch (error) {
    log('❌ GitHub CLI 인증이 필요합니다.', 'red');
    process.exit(1);
  }

  // 마일스톤 생성 및 이슈 할당
  const milestoneMap = new Map();

  for (const milestone of roadmap.milestones) {
    log(`\n📌 ${milestone.title}`, 'blue');
    
    try {
      const milestoneNumber = createMilestone(milestone);
      milestoneMap.set(milestone.title, milestoneNumber);

      // 이슈에 마일스톤 할당
      for (const issueNumber of milestone.issues) {
        assignMilestoneToIssue(issueNumber, milestoneNumber);
      }
    } catch (error) {
      log(`  ❌ 마일스톤 처리 실패: ${error.message}`, 'red');
    }
  }

  // 각 이슈에 일정 정보 추가
  log('\n📅 이슈에 일정 정보 추가 중...\n', 'blue');
  
  for (const [issueNumber, schedule] of Object.entries(roadmap.schedule)) {
    log(`  이슈 #${issueNumber} 처리 중...`, 'cyan');
    addScheduleToIssue(parseInt(issueNumber), schedule);
  }

  // 결과 요약
  log('\n' + '='.repeat(50), 'blue');
  log('\n📊 결과 요약', 'blue');
  log(`   ✅ 마일스톤 생성: ${roadmap.milestones.length}개`, 'green');
  log(`   ✅ 일정 정보 추가: ${Object.keys(roadmap.schedule).length}개 이슈`, 'green');
  log('\n' + '='.repeat(50) + '\n', 'blue');
}

// 실행
main();

