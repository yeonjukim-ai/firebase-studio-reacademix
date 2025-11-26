/**
 * @fileoverview StudentTable 컴포넌트
 * 
 * 역할:
 * - 학생 목록을 테이블 형태로 렌더링하는 프레젠테이셔널 컴포넌트
 * - 학생 데이터를 표시하고 상세보기 버튼 제공
 * 
 * Props:
 * - students: 표시할 학생 목록 (필터링된 목록)
 * - onSelectStudent: 학생 상세보기 버튼 클릭 시 호출되는 콜백
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Student } from "@/lib/types";

interface StudentTableProps {
    students: Student[];
    onSelectStudent: (student: Student) => void;
}

export function StudentTable({ students, onSelectStudent }: StudentTableProps) {
    return (
        <div className="rounded-lg border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <Table aria-label="학생 목록 테이블">
                    <TableHeader>
                        <TableRow>
                            <TableHead scope="col">이름</TableHead>
                            <TableHead scope="col">지점</TableHead>
                            <TableHead scope="col">반</TableHead>
                            <TableHead scope="col">상태</TableHead>
                            <TableHead scope="col">등록일</TableHead>
                            <TableHead scope="col">최종 리포트일</TableHead>
                            <TableHead scope="col">
                                <span className="sr-only">작업</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
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
                                        aria-label={`상태: ${student.status}`}
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
                                        onClick={() => onSelectStudent(student)}
                                        className="transition-all duration-200 hover:scale-105 active:scale-95"
                                        aria-label={`${student.name} 학생 상세 보기`}
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
    );
}
