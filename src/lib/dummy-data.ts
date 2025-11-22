import type { Student, Report, Transmission, Kpi, PerformanceData } from './types';

export const kpis: Kpi[] = [
  { title: '총 등록생 수', value: '1,250', change: '+5.2%', changeType: 'increase' },
  { title: '월간 활성 학생', value: '1,180', change: '+2.1%', changeType: 'increase' },
  { title: '평균 성적 변화', value: '+3.5점', change: '-0.5%', changeType: 'decrease' },
  { title: '리포트 생성률', value: '98%', change: '+1.0%', changeType: 'increase' },
];

export const students: Student[] = [
  { id: 'S001', name: '김민준', class: 'A반', status: 'active', registrationDate: '2023-03-15', lastReportDate: '2024-05-30', avgScore: 88, attendance: 95, branch: '강남점' },
  { id: 'S002', name: '이서연', class: 'B반', status: 'active', registrationDate: '2023-04-01', lastReportDate: '2024-05-30', avgScore: 92, attendance: 98, branch: '서초점' },
  { id: 'S003', name: '박지훈', class: 'A반', status: 'inactive', registrationDate: '2023-03-20', lastReportDate: '2024-04-28', avgScore: 76, attendance: 85, branch: '강남점' },
  { id: 'S004', name: '최수아', class: 'C반', status: 'active', registrationDate: '2023-05-10', lastReportDate: '2024-05-29', avgScore: 85, attendance: 92, branch: '분당점' },
  { id: 'S005', name: '정현우', class: 'B반', status: 'on_leave', registrationDate: '2023-04-05', lastReportDate: '2024-03-30', avgScore: 89, attendance: 90, branch: '서초점' },
  { id: 'S006', name: '윤지민', class: 'A반', status: 'active', registrationDate: '2023-03-18', lastReportDate: '2024-05-30', avgScore: 95, attendance: 99, branch: '강남점' },
  { id: 'S007', name: '임도윤', class: 'C반', status: 'active', registrationDate: '2023-05-12', lastReportDate: '2024-05-29', avgScore: 81, attendance: 88, branch: '분당점' },
  { id: 'S008', name: '한유진', class: 'B반', status: 'active', registrationDate: '2023-04-02', lastReportDate: '2024-05-30', avgScore: 93, attendance: 97, branch: '서초점' },
];

export const reportHistory: Report[] = [
  { id: 'R001', name: '2024년 5월 월간 리포트', target: 'A반 전체', status: 'completed', creator: '김선생', createdAt: '2024-06-01 10:00', downloadUrl: '#' },
  { id: 'R002', name: '김민준 학생 상세 리포트', target: '김민준', status: 'completed', creator: '박선생', createdAt: '2024-05-30 14:20', downloadUrl: '#' },
  { id: 'R003', name: '2024년 4월 월간 리포트', target: '전체 지점', status: 'completed', creator: '관리자', createdAt: '2024-05-02 09:00', downloadUrl: '#' },
  { id: 'R004', name: '2024년 5월 중간고사 리포트', target: 'B반 전체', status: 'failed', creator: '이선생', createdAt: '2024-05-25 11:00' },
  { id: 'R005', name: '2024년 5월 주간 리포트', target: 'C반 전체', status: 'in_progress', creator: '최선생', createdAt: '2024-06-02 11:00' },
];

export const transmissionHistory: Transmission[] = [
  { id: 'T001', reportName: '2024년 5월 월간 리포트', channel: 'Email', status: 'sent', recipient: '학부모 그룹 A', sentAt: '2024-06-01 10:05' },
  { id: 'T002', reportName: '김민준 학생 상세 리포트', channel: 'SMS', status: 'sent', recipient: '김민준 학부모', sentAt: '2024-05-30 14:25' },
  { id: 'T003', reportName: '2024년 4월 월간 리포트', channel: 'Email', status: 'failed', recipient: '전체 학부모', sentAt: '2024-05-02 09:10' },
  { id: 'T004', reportName: '이서연 학생 성적 리포트', channel: 'Email', status: 'sent', recipient: '이서연 학부모', sentAt: '2024-05-30 14:22' },
];

export const performanceChartData: PerformanceData[] = [
  { month: '1월', '지점 A': 82, '지점 B': 80 },
  { month: '2월', '지점 A': 85, '지점 B': 82 },
  { month: '3월', '지점 A': 88, '지점 B': 86 },
  { month: '4월', '지점 A': 87, '지점 B': 89 },
  { month: '5월', '지점 A': 90, '지점 B': 91 },
  { month: '6월', '지점 A': 92, '지점 B': 93 },
];

export const validationErrors = {
  isValid: false,
  validationErrors: [
    { row: 3, column: "avgScore", errorType: "Missing Value", errorMessage: "평균 성적 값이 누락되었습니다." },
    { row: 5, column: "attendance", errorType: "Invalid Format", errorMessage: "출석률 형식이 잘못되었습니다 (0-100 사이 숫자여야 합니다)." },
    { row: 8, column: "status", errorType: "Invalid Value", errorMessage: "'휴학'은 유효한 상태 값이 아닙니다. 'active', 'inactive', 'on_leave' 중 하나여야 합니다." }
  ]
};

export const sampleDataForValidation = `id,name,class,status,registrationDate,lastReportDate,avgScore,attendance,branch
S001,김민준,A반,active,2023-03-15,2024-05-30,88,95,강남점
S002,이서연,B반,active,2023-04-01,2024-05-30,92,98,서초점
S003,박지훈,A반,inactive,2023-03-20,2024-04-28,,85,강남점
S004,최수아,C반,active,2023-05-10,2024-05-29,85,92,분당점
S005,정현우,B반,on_leave,2023-04-05,2024-03-30,89,102,서초점
S006,윤지민,A반,active,2023-03-18,2024-05-30,95,99,강남점
S007,임도윤,C반,active,2023-05-12,2024-05-29,81,88,분당점
S008,한유진,B반,active,2023-04-02,2024-05-30,93,97,서초점
S009,오은영,A반,휴학,2023-03-21,2024-05-28,78,88,강남점`;
