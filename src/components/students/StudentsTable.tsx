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

export function StudentsTable() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [branchFilter, setBranchFilter] = React.useState<string[]>([]);

  const filteredStudents = students.filter((student) => {
    const searchMatch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter.length === 0 || statusFilter.includes(student.status);
    const branchMatch = branchFilter.length === 0 || branchFilter.includes(student.branch);

    return searchMatch && statusMatch && branchMatch;
  });

  const uniqueBranches = Array.from(new Set(students.map(s => s.branch)));
  const uniqueStatuses = Array.from(new Set(students.map(s => s.status)));

  const handleStatusChange = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleBranchChange = (branch: string) => {
    setBranchFilter(prev =>
      prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch]
    );
  };


  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="학생 이름, 반, ID로 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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
      <div className="rounded-lg border">
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
                    onClick={() => setSelectedStudent(student)}
                  >
                    상세 보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

       {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
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
