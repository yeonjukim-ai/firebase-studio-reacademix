/**
 * @fileoverview ValidationResultTable 컴포넌트
 * 
 * 역할:
 * - 검증 결과를 편집 가능한 테이블로 표시
 * - 에러가 있는 셀을 하이라이트
 * - 사용자가 셀 값을 직접 수정할 수 있도록 지원
 * - 수정 내용 저장 버튼 제공
 * 
 * Props:
 * - editableData: 편집 가능한 CSV 데이터 (2차원 배열)
 * - getCellError: 특정 셀의 에러 정보를 조회하는 함수
 * - onCellChange: 셀 값 변경 시 호출되는 콜백
 * - onSaveChanges: 저장 버튼 클릭 시 호출되는 콜백
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ValidationError {
    row: number;
    column: string;
    errorMessage: string;
}

interface ValidationResultTableProps {
    editableData: string[][];
    getCellError: (row: number, header: string) => ValidationError | undefined;
    onCellChange: (row: number, col: number, value: string) => void;
    onSaveChanges: () => void;
}

export function ValidationResultTable({
    editableData,
    getCellError,
    onCellChange,
    onSaveChanges,
}: ValidationResultTableProps) {
    if (editableData.length === 0) return null;

    return (
        <>
            <div className="overflow-auto rounded-lg border max-h-[500px]">
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50">
                        <TableRow>
                            {editableData[0]?.map((header, index) => (
                                <TableHead key={`header-${index}`}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {editableData.slice(1).map((row, rowIndex) => {
                            const actualRowIndex = rowIndex + 1;
                            return (
                                <TableRow key={`row-${actualRowIndex}`}>
                                    {row.map((cell, cellIndex) => {
                                        const headerName = editableData[0][cellIndex];
                                        const error = getCellError(actualRowIndex, headerName);
                                        return (
                                            <TableCell
                                                key={`cell-${actualRowIndex}-${cellIndex}`}
                                                className={error ? 'bg-destructive/10' : ''}
                                            >
                                                <Input
                                                    value={cell}
                                                    onChange={(e) => onCellChange(actualRowIndex, cellIndex, e.target.value)}
                                                    className={error ? 'border-destructive ring-destructive' : ''}
                                                />
                                                {error && (
                                                    <p className="text-xs text-destructive mt-1">{error.errorMessage}</p>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4 flex justify-end">
                <Button onClick={onSaveChanges}>수정 내용 저장</Button>
            </div>
        </>
    );
}
