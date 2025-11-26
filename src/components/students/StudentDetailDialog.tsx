/**
 * @fileoverview StudentDetailDialog 컴포넌트
 * 
 * 역할:
 * - 선택된 학생의 상세 정보를 다이얼로그로 표시
 * - 학생 ID, 지점, 반, 평균 점수, 출석률 등을 표시
 * 
 * Props:
 * - student: 표시할 학생 정보 (null이면 다이얼로그가 닫힘)
 * - open: 다이얼로그 열림 상태
 * - onOpenChange: 다이얼로그 상태 변경 시 호출되는 콜백
 */

"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Student } from "@/lib/types";

interface StudentDetailDialogProps {
    student: Student | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function StudentDetailDialog({ student, open, onOpenChange }: StudentDetailDialogProps) {
    if (!student) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{student.name} 학생 정보</DialogTitle>
                    <DialogDescription>
                        학생의 상세 정보 및 주요 지표입니다.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm font-medium text-muted-foreground">ID</p>
                        <p>{student.id}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm font-medium text-muted-foreground">지점</p>
                        <p>{student.branch}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm font-medium text-muted-foreground">반</p>
                        <p>{student.class}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm font-medium text-muted-foreground">평균 점수</p>
                        <p>{student.avgScore}점</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm font-medium text-muted-foreground">출석률</p>
                        <p>{student.attendance}%</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
