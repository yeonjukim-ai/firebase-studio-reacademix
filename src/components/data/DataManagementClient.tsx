/**
 * @fileoverview DataManagementClient 컴포넌트
 * 
 * 역할:
 * - 파일 업로드 및 AI 기반 데이터 검증을 처리하는 컴포넌트
 * - CSV 파일 업로드 → AI 검증 → 에러 수정 → 저장 프로세스 관리
 * - useDataValidation hook을 사용하여 복잡한 상태 및 로직 관리
 * 
 * Props 구조:
 * - Props 없음 (내부에서 필요한 상태를 hook으로 관리)
 * 
 * 데이터 흐름:
 * - useDataValidation hook 반환값:
 *   - state: 현재 상태 ('idle' | 'file_selected' | 'validating' | 'validation_complete')
 *   - file: 업로드된 파일 객체
 *   - validationResult: AI 검증 결과 (ValidateUploadedDataOutput)
 *   - editableData: 수정 가능한 CSV 데이터 (2차원 배열)
 *   - handleFileChange, handleDrop, handleDragOver: 파일 업로드 핸들러
 *   - handleValidate: 데이터 검증 시작 함수
 *   - handleCellChange: 테이블 셀 값 변경 핸들러
 *   - handleSaveChanges: 수정된 데이터 저장 함수
 *   - reset: 상태 초기화 함수
 *   - getCellError: 특정 셀의 에러 정보 조회 함수
 * - fileSize: 파일 크기 포맷팅 (useMemo로 메모이제이션)
 * - headerAction: 헤더에 표시될 뒤로가기 버튼 (useMemo로 메모이제이션)
 * 
 * 이벤트 흐름:
 * - 파일 드래그 앤 드롭 또는 클릭 → handleDrop/handleFileChange → file 설정 → state를 'file_selected'로 변경
 * - "업로드 및 데이터 검증" 버튼 클릭 → handleValidate → state를 'validating'으로 변경
 *   → AI 검증 API 호출 (2초 시뮬레이션) → validationResult 설정 → state를 'validation_complete'로 변경
 * - 검증 성공 시 → 성공 Alert 표시
 * - 검증 실패 시 → 에러 Alert 및 수정 가능한 테이블 표시
 * - 테이블 셀 값 변경 → handleCellChange → editableData 업데이트
 * - "수정 내용 저장" 버튼 클릭 → handleSaveChanges → 토스트 알림 → reset 호출
 * - 뒤로가기 버튼 클릭 → reset → 모든 상태 초기화 → 'idle' 상태로 복귀
 * 
 * 상태 관리:
 * - 파일 업로드 및 검증 관련 상태는 useDataValidation hook에서 관리
 * - timeout은 hook 내부에서 ref로 관리하여 cleanup 처리
 * 
 * 사용 예시:
 * ```tsx
 * <DataManagementClient />
 * ```
 */

"use client";

import React, { useMemo } from 'react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, File, X, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useDataValidation } from '@/hooks/useDataValidation';

export function DataManagementClient() {
  const {
    state,
    file,
    validationResult,
    editableData,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleValidate,
    handleCellChange,
    handleSaveChanges,
    reset,
    getCellError,
  } = useDataValidation();

  // 헤더 액션을 메모이제이션
  const headerAction = useMemo(() => {
    if (state === 'idle') return undefined;
    return (
      <Button variant="ghost" size="icon" onClick={reset}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
    );
  }, [state, reset]);

  // 파일 크기 포맷팅을 메모이제이션
  const fileSize = useMemo(() => {
    if (!file) return '';
    return `${(file.size / 1024).toFixed(2)} KB`;
  }, [file]);

  return (
    <SectionCard
      title="데이터 연동 및 검증"
      description="학생 성적 및 정보 파일을 업로드하여 데이터를 시스템에 연동합니다."
      headerAction={headerAction}
    >
        {state === 'idle' && (
          <div
            className="flex flex-col items-center justify-center w-full p-10 md:p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted hover:border-primary/30 hover:shadow-sm"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <UploadCloud className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
            <p className="mt-4 md:mt-6 font-semibold text-base md:text-lg transition-colors duration-200">드래그 앤 드롭 또는 클릭하여 파일 업로드</p>
            <p className="text-sm md:text-base text-muted-foreground mt-1">지원 파일 형식: Excel, CSV</p>
            <Input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} accept=".csv" />
          </div>
        )}

        {state === 'file_selected' && file && (
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
                  onClick={() => handleFileChange(null)}
                  className="transition-all duration-200 hover:scale-110 active:scale-95 hover:bg-destructive/10 hover:text-destructive"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>
            <Button 
              onClick={handleValidate}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
            >
              업로드 및 데이터 검증
            </Button>
          </div>
        )}

        {state === 'validating' && (
           <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center p-8 md:p-12 min-h-[200px]">
            <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-primary" />
            <p className="font-medium text-base md:text-lg">AI가 데이터를 검증하고 있습니다...</p>
            <p className="text-sm md:text-base text-muted-foreground">잠시만 기다려주세요.</p>
          </div>
        )}

        {state === 'validation_complete' && validationResult && (
          <div>
            {validationResult.isValid ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">검증 완료</AlertTitle>
                <AlertDescription className="text-green-700">
                  업로드된 데이터가 유효합니다. 모든 데이터가 성공적으로 시스템에 반영되었습니다.
                </AlertDescription>
              </Alert>
            ) : (
                <div>
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>검증 오류 발견</AlertTitle>
                        <AlertDescription>
                        {validationResult.validationErrors.length}개의 오류가 발견되었습니다. 아래 테이블에서 오류를 확인하고 수정해주세요.
                        </AlertDescription>
                    </Alert>
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
                                                <TableCell key={`cell-${actualRowIndex}-${cellIndex}`} className={error ? 'bg-destructive/10' : ''}>
                                                    <Input
                                                        value={cell}
                                                        onChange={(e) => handleCellChange(actualRowIndex, cellIndex, e.target.value)}
                                                        className={error ? 'border-destructive ring-destructive' : ''}
                                                    />
                                                    {error && <p className="text-xs text-destructive mt-1">{error.errorMessage}</p>}
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
                        <Button onClick={handleSaveChanges}>수정 내용 저장</Button>
                    </div>
                </div>
            )}
          </div>
        )}
    </SectionCard>
  );
}
