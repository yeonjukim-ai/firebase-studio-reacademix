/**
 * @fileoverview StudentFilterMenu 컴포넌트
 * 
 * 역할:
 * - 학생 목록 필터링을 위한 드롭다운 메뉴 제공
 * - 상태 필터 (active, inactive, on_leave)
 * - 지점 필터
 * 
 * Props:
 * - statusFilter: 현재 선택된 상태 필터 배열
 * - branchFilter: 현재 선택된 지점 필터 배열
 * - uniqueStatuses: 사용 가능한 고유 상태 목록
 * - uniqueBranches: 사용 가능한 고유 지점 목록
 * - onStatusChange: 상태 필터 변경 시 호출되는 콜백
 * - onBranchChange: 지점 필터 변경 시 호출되는 콜백
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface StudentFilterMenuProps {
    statusFilter: string[];
    branchFilter: string[];
    uniqueStatuses: string[];
    uniqueBranches: string[];
    onStatusChange: (status: string) => void;
    onBranchChange: (branch: string) => void;
}

export function StudentFilterMenu({
    statusFilter,
    branchFilter,
    uniqueStatuses,
    uniqueBranches,
    onStatusChange,
    onBranchChange,
}: StudentFilterMenuProps) {
    const activeFiltersCount = statusFilter.length + branchFilter.length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label={`필터 설정 ${activeFiltersCount > 0 ? `(${activeFiltersCount}개 활성)` : ''}`}
                >
                    <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
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
                        onCheckedChange={() => onStatusChange(status)}
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
                        onCheckedChange={() => onBranchChange(branch)}
                    >
                        {branch}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
