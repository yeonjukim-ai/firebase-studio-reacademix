/**
 * @fileoverview FileUploadZone 컴포넌트
 * 
 * 역할:
 * - 파일 업로드 UI 제공 (드래그 앤 드롭 및 클릭 업로드)
 * - 선택된 파일 정보 표시
 * - 파일 제거 기능
 * - 검증 시작 버튼
 * 
 * Props:
 * - file: 현재 선택된 파일 객체
 * - fileSize: 포맷팅된 파일 크기
 * - state: 현재 상태 ('idle' | 'file_selected')
 * - onFileChange: 파일 변경 시 호출되는 콜백
 * - onDrop: 파일 드롭 시 호출되는 콜백
 * - onDragOver: 드래그 오버 시 호출되는 콜백
 * - onValidate: 검증 시작 시 호출되는 콜백
 */

"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, File, X } from 'lucide-react';

interface FileUploadZoneProps {
    file: File | null;
    fileSize: string;
    state: 'idle' | 'file_selected';
    onFileChange: (file: File | null) => void;
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onValidate: () => void;
}

export function FileUploadZone({
    file,
    fileSize,
    state,
    onFileChange,
    onDrop,
    onDragOver,
    onValidate,
}: FileUploadZoneProps) {
    if (state === 'idle') {
        return (
            <div
                className="flex flex-col items-center justify-center w-full p-10 md:p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted hover:border-primary/30 hover:shadow-sm"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <UploadCloud className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                <p className="mt-4 md:mt-6 font-semibold text-base md:text-lg transition-colors duration-200">
                    드래그 앤 드롭 또는 클릭하여 파일 업로드
                </p>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                    지원 파일 형식: Excel, CSV
                </p>
                <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    accept=".csv"
                />
            </div>
        );
    }

    if (state === 'file_selected' && file) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6 p-8">
                <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 border rounded-lg w-full max-w-md bg-card transition-all duration-200 hover:shadow-sm hover:border-primary/20">
                    <File className="w-8 h-8 md:w-10 md:h-10 text-primary transition-transform duration-200" />
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm md:text-base truncate">{file.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">{fileSize}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onFileChange(null)}
                        className="transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-destructive/10 hover:text-destructive"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                <Button
                    onClick={onValidate}
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    업로드 및 데이터 검증
                </Button>
            </div>
        );
    }

    return null;
}
