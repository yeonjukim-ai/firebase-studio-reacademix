"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UploadCloud, File, X, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { validateUploadedData } from '@/ai/flows/validate-uploaded-data';
import type { ValidateUploadedDataOutput, ValidationError } from '@/ai/flows/validate-uploaded-data';
import { sampleDataForValidation } from '@/lib/dummy-data';
import { useToast } from '@/hooks/use-toast';

type State = 'idle' | 'file_selected' | 'validating' | 'validation_complete';

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function dataUriToCsv(dataUri: string): string[][] {
    const base64 = dataUri.split(',')[1];
    const csvString = atob(base64);
    return csvString.split('\n').map(row => row.split(','));
}

export function DataManagementClient() {
  const [state, setState] = useState<State>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<ValidateUploadedDataOutput | null>(null);
  const [editableData, setEditableData] = useState<string[][]>([]);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setState('file_selected');
      } else {
        toast({
          title: "유효하지 않은 파일 형식",
          description: "CSV 파일만 업로드할 수 있습니다.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleValidate = async () => {
    setState('validating');
    
    // Simulate API call
    setTimeout(async () => {
      try {
        // In a real app, you would use the uploaded file:
        // const dataUri = await fileToDataUri(file!);
        // For this prototype, we use dummy data to trigger validation errors.
        const dummyFile = new File([sampleDataForValidation], "sample.csv", { type: "text/csv" });
        const dataUri = await fileToDataUri(dummyFile);
        
        const result = await validateUploadedData({
          fileDataUri: dataUri,
          fileType: 'CSV',
        });
        
        setValidationResult(result);
        if (!result.isValid) {
          const csvData = dataUriToCsv(dataUri);
          setEditableData(csvData);
        }
        setState('validation_complete');
      } catch (error) {
        console.error("Validation failed:", error);
        toast({
          title: "검증 실패",
          description: "AI 데이터 검증 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        setState('file_selected');
      }
    }, 2000);
  };
  
  const handleCellChange = (rowIndex: number, cellIndex: number, value: string) => {
    const newData = [...editableData];
    newData[rowIndex][cellIndex] = value;
    setEditableData(newData);
  };
  
  const handleSaveChanges = () => {
    toast({
        title: "저장 완료",
        description: "수정된 데이터가 성공적으로 저장되었습니다.",
    });
    reset();
  }

  const reset = () => {
    setFile(null);
    setState('idle');
    setValidationResult(null);
    setEditableData([]);
  };
  
  const getCellError = (rowIndex: number, colName: string): ValidationError | undefined => {
    return validationResult?.validationErrors?.find(e => e.row === rowIndex + 1 && e.column.toLowerCase() === colName.toLowerCase());
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
        {state !== 'idle' && (
            <Button variant="ghost" size="icon" onClick={reset}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
        )}
        <div>
        <CardTitle>데이터 연동 및 검증</CardTitle>
        <CardDescription>학생 성적 및 정보 파일을 업로드하여 데이터를 시스템에 연동합니다.</CardDescription>
        </div>
        </div>
      </CardHeader>
      <CardContent>
        {state === 'idle' && (
          <div
            className="flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 font-semibold">드래그 앤 드롭 또는 클릭하여 파일 업로드</p>
            <p className="text-sm text-muted-foreground">지원 파일 형식: Excel, CSV</p>
            <Input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] || null)} accept=".csv" />
          </div>
        )}

        {state === 'file_selected' && file && (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
             <div className="flex items-center gap-3 p-4 border rounded-lg w-full max-w-md">
                <File className="w-8 h-8 text-primary" />
                <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                    <X className="w-5 h-5" />
                </Button>
            </div>
            <Button onClick={handleValidate}>업로드 및 데이터 검증</Button>
          </div>
        )}

        {state === 'validating' && (
           <div className="flex flex-col items-center justify-center gap-4 text-center p-8 min-h-[200px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-medium">AI가 데이터를 검증하고 있습니다...</p>
            <p className="text-sm text-muted-foreground">잠시만 기다려주세요.</p>
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
                                    <TableHead key={index}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {editableData.slice(1).map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {row.map((cell, cellIndex) => {
                                        const headerName = editableData[0][cellIndex];
                                        const error = getCellError(rowIndex + 1, headerName);
                                        return (
                                            <TableCell key={cellIndex} className={error ? 'bg-destructive/10' : ''}>
                                                <Input
                                                    value={cell}
                                                    onChange={(e) => handleCellChange(rowIndex + 1, cellIndex, e.target.value)}
                                                    className={error ? 'border-destructive ring-destructive' : ''}
                                                />
                                                {error && <p className="text-xs text-destructive mt-1">{error.errorMessage}</p>}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
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
      </CardContent>
    </Card>
  );
}
