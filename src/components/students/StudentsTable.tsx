/**
 * @fileoverview StudentsTable 컴포넌트
 * 
 * 역할:
 * - 학생 목록을 테이블 형태로 표시하고 관리하는 컴포넌트
 * - 검색, 필터링(상태, 지점), 학생 상세 정보 조회 기능 제공
 * - useStudentFilter hook을 사용하여 필터링 로직 관리
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
 * 이벤트 흐름:
 * - 검색 입력 변경 → handleSearchChange → searchTerm 업데이트 → filteredStudents 재계산
 * - 상태 필터 체크박스 클릭 → handleStatusChange → statusFilter 업데이트 → filteredStudents 재계산
 * - 지점 필터 체크박스 클릭 → handleBranchChange → branchFilter 업데이트 → filteredStudents 재계산
 * - "상세 보기" 버튼 클릭 → handleSelectStudent → selectedStudent 설정 → Dialog 열림
 * - Dialog 닫기 → handleCloseDialog → selectedStudent null로 설정 → Dialog 닫힘
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { students } from "@/lib/dummy-data";
import type { Student } from "@/lib/types";
import { Filter, Search } from "lucide-react";
import { useStudentFilter } from "@/hooks/useStudentFilter";
import { useCallback } from "react";

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
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-200" />
          <Input
            placeholder="학생 이름, 반, ID로 검색..."
            className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Filter className="mr-2 h-4 w-4" />
              필터
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>학생 상태</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {uniqueStatuses.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={() => handleStatusChange(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
             <DropdownMenuLabel>지점</DropdownMenuLabel>
            <DropdownMenuSeparator />
             {uniqueBranches.map(branch => (
              <DropdownMenuCheckboxItem
                key={branch}
                checked={branchFilter.includes(branch)}
                onCheckedChange={() => handleBranchChange(branch)}
              >
                {branch}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-lg border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>지점</TableHead>
              <TableHead>반</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead>최종 리포트일</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.branch}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.status === "active"
                        ? "default"
                        : student.status === "inactive"
                        ? "destructive"
                        : "secondary"
                    }
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 data-[state=inactive]:bg-red-100 data-[state=inactive]:text-red-800"
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>{student.registrationDate}</TableCell>
                <TableCell>{student.lastReportDate || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectStudent(student)}
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    상세 보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>

       {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedStudent.name} 학생 정보</DialogTitle>
              <DialogDescription>
                학생의 상세 정보 및 주요 지표입니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p>{selectedStudent.id}</p>
              </div>
               <div className="grid grid-cols-2 items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">지점</p>
                <p>{selectedStudent.branch}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">반</p>
                <p>{selectedStudent.class}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">평균 점수</p>
                <p>{selectedStudent.avgScore}점</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">출석률</p>
                <p>{selectedStudent.attendance}%</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
