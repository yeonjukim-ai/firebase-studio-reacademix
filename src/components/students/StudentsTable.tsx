/**
 * @fileoverview StudentsTable 컴포넌트
 * 
 * 역할:
 * - 학생 목록을 테이블 형태로 표시하고 관리하는 컴포넌트
 * - 검색, 필터링(상태, 지점), 학생 상세 정보 조회 기능 제공
 * - useStudentFilter hook을 사용하여 필터링 로직 관리
 * - 이제 더 작은 sub-components로 구성됨 (StudentSearchBar, StudentFilterMenu, StudentTable, StudentDetailDialog)
 * 
 * Props 구조:
 * - Props 없음 (내부에서 students 데이터를 직접 import)
 * 
 * 데이터 흐름:
 * - students (dummy-data) → useStudentFilter hook으로 필터링
 * - useStudentFilter 반환값:
 *   - filteredStudents: 검색어, 상태 필터, 지점 필터에 따라 필터링된 학생 목록
 *   - uniqueBranches, uniqueStatuses: 필터 옵션으로 사용할 고유 값들
 *   - handleSearchChange, handleStatusChange, handleBranchChange: 필터 변경 핸들러
 * - selectedStudent: 상세 정보를 보기 위해 선택된 학생 (Dialog 표시용)
 * 
 * 상태 관리:
 * - selectedStudent: 로컬 state로 관리 (Dialog 열림/닫힘 제어)
 * - 필터링 관련 state는 useStudentFilter hook에서 관리
 * 
 * 사용 예시:
 * ```tsx
 * <StudentsTable />
 * ```
 */

"use client";

import * as React from "react";
import { students } from "@/lib/dummy-data";
import type { Student } from "@/lib/types";
import { useStudentFilter } from "@/hooks/useStudentFilter";
import { useCallback } from "react";
import { StudentSearchBar } from "./StudentSearchBar";
import { StudentFilterMenu } from "./StudentFilterMenu";
import { StudentTable } from "./StudentTable";
import { StudentDetailDialog } from "./StudentDetailDialog";

export function StudentsTable() {
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  const {
    searchTerm,
    statusFilter,
    branchFilter,
    uniqueBranches,
    uniqueStatuses,
    filteredStudents,
    handleSearchChange,
    handleStatusChange,
    handleBranchChange,
  } = useStudentFilter(students);

  const handleSelectStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelectedStudent(null);
  }, []);

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <StudentSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <StudentFilterMenu
          statusFilter={statusFilter}
          branchFilter={branchFilter}
          uniqueStatuses={uniqueStatuses}
          uniqueBranches={uniqueBranches}
          onStatusChange={handleStatusChange}
          onBranchChange={handleBranchChange}
        />
      </div>

      <StudentTable
        students={filteredStudents}
        onSelectStudent={handleSelectStudent}
      />

      <StudentDetailDialog
        student={selectedStudent}
        open={!!selectedStudent}
        onOpenChange={handleCloseDialog}
      />
    </>
  );
}
