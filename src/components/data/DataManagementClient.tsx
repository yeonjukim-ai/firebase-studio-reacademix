/**
 * @fileoverview DataManagementClient 컴포넌트
 * 
 * 역할:
 * - 파일 업로드 및 AI 기반 데이터 검증을 처리하는 컴포넌트
 * - CSV 파일 업로드 → AI 검증 → 에러 수정 → 저장 프로세스 관리
 * - useDataValidation hook을 사용하여 복잡한 상태 및 로직 관리
 * - 이제 더 작은 sub-components로 구성됨 (FileUploadZone, ValidationResultTable)
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useDataValidation } from '@/hooks/useDataValidation';
import { FileUploadZone } from './FileUploadZone';
import { ValidationResultTable } from './ValidationResultTable';

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
      <FileUploadZone
        file={file}
        fileSize={fileSize}
        state={state === 'idle' ? 'idle' : state === 'file_selected' ? 'file_selected' : 'idle'}
        onFileChange={handleFileChange}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onValidate={handleValidate}
      />

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
              <ValidationResultTable
                editableData={editableData}
                getCellError={getCellError}
                onCellChange={handleCellChange}
                onSaveChanges={handleSaveChanges}
              />
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}
