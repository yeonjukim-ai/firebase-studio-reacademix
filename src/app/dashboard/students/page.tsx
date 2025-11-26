/**
 * @fileoverview StudentsPage - 학생 관리 페이지
 * 
 * 역할:
 * - 학생 목록을 관리하는 페이지
 * - PageHeader와 StudentsTable 컴포넌트를 조합하여 구성
 * 
 * Props 구조:
 * - Props 없음 (서버 컴포넌트)
 * 
 * 데이터 흐름:
 * - PageHeader: 정적 제목과 설명 표시
 * - StudentsTable: students 데이터를 내부에서 import하여 표시
 * 
 * 이벤트 흐름:
 * - "학생 추가" 버튼 클릭 → 현재는 이벤트 핸들러 없음 (향후 구현 예정)
 * - StudentsTable 내부의 이벤트는 해당 컴포넌트에서 처리
 * 
 * 사용 예시:
 * - /dashboard/students 경로로 접근 시 자동으로 렌더링됨
 */

import { PageHeader } from "@/components/shared/PageHeader";
import { StudentsTable } from "@/components/students/StudentsTable";
import { AddStudentButton } from "@/components/students/AddStudentButton";

export default function StudentsPage() {
  return (
    <>
      <PageHeader title="학생 관리" description="학원에 등록된 모든 학생의 정보를 관리합니다.">
        <AddStudentButton />
      </PageHeader>
      <StudentsTable />
    </>
  );
}

