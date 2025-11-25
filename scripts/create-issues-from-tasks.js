#!/usr/bin/env node

/**
 * GitHub 이슈 자동 생성 스크립트
 * tasks/github-issues/ 폴더의 마크다운 파일들을 GitHub 이슈로 생성합니다.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 설정
const TASKS_DIR = path.join(__dirname, '..', 'tasks', 'github-issues');
const AUTOMATION_LABEL = 'Issue Automation';

// 색상 출력 (터미널 지원 시)
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
 * 마크다운 파일에서 제목 추출
 */
function extractTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    // [Task] 접두사 제거 (이미 제목에 포함되어 있을 수 있음)
    return titleMatch[1].replace(/^\[Task\]\s*/, '').trim();
  }
  // 파일명에서 제목 생성
  const fileName = path.basename(filePath, '.md');
  return fileName.replace(/^\d+-/, '').replace(/-/g, ' ');
}

/**
 * 마크다운 파일에서 라벨 정보 추출
 */
function extractLabels(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const labelMatch = content.match(/\*\*라벨\*\*:\s*(.+)/);
  if (labelMatch) {
    const labels = labelMatch[1]
      .split(',')
      .map(l => l.trim().replace(/`/g, ''))
      .filter(l => l && l !== AUTOMATION_LABEL); // Issue Automation은 나중에 추가
    return labels;
  }
  return [];
}

/**
 * 기존 이슈 목록 가져오기
 */
function getExistingIssues() {
  try {
    const output = execSync('gh issue list --json number,title --limit 1000', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const issues = JSON.parse(output);
    return new Map(issues.map(issue => [issue.title.toLowerCase(), issue.number]));
  } catch (error) {
    log('⚠️  기존 이슈 목록을 가져오는 중 오류 발생. 계속 진행합니다...', 'yellow');
    return new Map();
  }
}

/**
 * 라벨이 존재하는지 확인
 */
function labelExists(labelName) {
  try {
    const output = execSync(`gh label list --json name --limit 1000`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const labels = JSON.parse(output);
    return labels.some(label => label.name.toLowerCase() === labelName.toLowerCase());
  } catch (error) {
    return false;
  }
}

/**
 * 라벨 생성
 */
function createLabel(labelName, color = '0E8A16') {
  try {
    execSync(`gh label create "${labelName}" --color "${color}" --force`, {
      encoding: 'utf-8',
      stdio: 'ignore',
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 이슈 생성
 */
function createIssue(title, body, labels) {
  try {
    // 임시 파일에 본문 저장
    const tempFile = path.join(__dirname, 'temp-issue-body.md');
    fs.writeFileSync(tempFile, body, 'utf-8');

    // 라벨 목록 준비 및 존재 확인
    const allLabels = [...labels, AUTOMATION_LABEL];
    const existingLabels = [];
    
    for (const label of allLabels) {
      if (!labelExists(label)) {
        log(`  🏷️  라벨 생성 중: ${label}`, 'yellow');
        createLabel(label);
      }
      existingLabels.push(label);
    }

    // 라벨이 있으면 추가, 없으면 라벨 없이 생성
    let command;
    if (existingLabels.length > 0) {
      command = `gh issue create --title "${title}" --body-file "${tempFile}" --label "${existingLabels.join(',')}"`;
    } else {
      command = `gh issue create --title "${title}" --body-file "${tempFile}"`;
    }
    
    log(`  📝 이슈 생성 중: ${title}`, 'cyan');
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    // 임시 파일 삭제
    fs.unlinkSync(tempFile);

    // 이슈 URL 추출
    const urlMatch = output.match(/https:\/\/github\.com\/[^\s]+/);
    if (urlMatch) {
      return urlMatch[0];
    }
    return output.trim();
  } catch (error) {
    log(`  ❌ 이슈 생성 실패: ${error.message}`, 'red');
    // 임시 파일 정리
    const tempFile = path.join(__dirname, 'temp-issue-body.md');
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    throw error;
  }
}

/**
 * 메인 함수
 */
function main() {
  log('\n🚀 GitHub 이슈 자동 생성 시작\n', 'blue');

  // gh CLI 설치 확인
  try {
    execSync('gh --version', { stdio: 'ignore' });
  } catch (error) {
    log('❌ GitHub CLI (gh)가 설치되어 있지 않습니다.', 'red');
    log('   설치 방법: https://cli.github.com/', 'yellow');
    process.exit(1);
  }

  // 인증 확인
  try {
    execSync('gh auth status', { stdio: 'ignore' });
  } catch (error) {
    log('❌ GitHub CLI 인증이 필요합니다.', 'red');
    log('   실행: gh auth login', 'yellow');
    process.exit(1);
  }

  // tasks/github-issues/ 폴더 확인
  if (!fs.existsSync(TASKS_DIR)) {
    log(`❌ 폴더를 찾을 수 없습니다: ${TASKS_DIR}`, 'red');
    process.exit(1);
  }

  // 마크다운 파일 목록 가져오기
  const files = fs.readdirSync(TASKS_DIR)
    .filter(file => file.endsWith('.md') && file !== 'README.md')
    .sort()
    .map(file => path.join(TASKS_DIR, file));

  if (files.length === 0) {
    log('⚠️  처리할 마크다운 파일이 없습니다.', 'yellow');
    process.exit(0);
  }

  log(`📁 ${files.length}개의 작업 파일을 찾았습니다.\n`, 'green');

  // 기존 이슈 목록 가져오기
  log('📋 기존 이슈 목록 확인 중...', 'cyan');
  const existingIssues = getExistingIssues();
  log(`   ${existingIssues.size}개의 기존 이슈를 찾았습니다.\n`, 'cyan');

  // 각 파일 처리
  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    log(`\n📄 처리 중: ${fileName}`, 'blue');

    try {
      // 제목 추출
      const title = extractTitle(filePath);
      log(`   제목: ${title}`, 'cyan');

      // 중복 체크
      if (existingIssues.has(title.toLowerCase())) {
        const issueNumber = existingIssues.get(title.toLowerCase());
        log(`   ⏭️  이미 존재하는 이슈입니다 (#${issueNumber}). 건너뜁니다.`, 'yellow');
        skipped++;
        continue;
      }

      // 본문 읽기
      const body = fs.readFileSync(filePath, 'utf-8');

      // 라벨 추출
      const labels = extractLabels(filePath);

      // 이슈 생성
      const issueUrl = createIssue(title, body, labels);
      log(`   ✅ 이슈 생성 완료: ${issueUrl}`, 'green');
      created++;

      // 기존 이슈 목록에 추가 (중복 방지)
      existingIssues.set(title.toLowerCase(), issueUrl);
    } catch (error) {
      log(`   ❌ 오류 발생: ${error.message}`, 'red');
      failed++;
    }
  }

  // 결과 요약
  log('\n' + '='.repeat(50), 'blue');
  log('\n📊 결과 요약', 'blue');
  log(`   ✅ 생성됨: ${created}개`, 'green');
  log(`   ⏭️  건너뜀: ${skipped}개`, 'yellow');
  log(`   ❌ 실패: ${failed}개`, failed > 0 ? 'red' : 'reset');
  log('\n' + '='.repeat(50) + '\n', 'blue');
}

// 실행
main();

