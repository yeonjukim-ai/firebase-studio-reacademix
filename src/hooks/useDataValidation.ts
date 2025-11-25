import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { validateUploadedData } from '@/ai/flows/validate-uploaded-data';
import type { ValidateUploadedDataOutput } from '@/ai/flows/validate-uploaded-data';
import { sampleDataForValidation } from '@/lib/dummy-data';

type State = 'idle' | 'file_selected' | 'validating' | 'validation_complete';

/**
 * 파일 업로드 및 데이터 검증 로직을 관리하는 custom hook
 * 
 * 파일 선택, 드래그 앤 드롭, 데이터 검증, 에러 수정을 관리합니다.
 */
export function useDataValidation() {
  const [state, setState] = useState<State>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<ValidateUploadedDataOutput | null>(null);
  const [editableData, setEditableData] = useState<string[][]>([]);
  const { toast } = useToast();
  
  // timeout을 ref로 관리하여 cleanup 가능하게 함
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 파일을 Data URI로 변환
  const fileToDataUri = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // Data URI를 CSV 데이터로 변환
  const dataUriToCsv = useCallback((dataUri: string): string[][] => {
    const base64 = dataUri.split(',')[1];
    const csvString = atob(base64);
    return csvString.split('\n').map(row => row.split(','));
  }, []);

  // 파일 변경 핸들러
  const handleFileChange = useCallback((selectedFile: File | null) => {
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
  }, [toast]);

  // 드래그 앤 드롭 핸들러
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  // 데이터 검증 핸들러
  const handleValidate = useCallback(async () => {
    if (!file) return;
    
    setState('validating');
    
    // 기존 timeout 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Simulate API call
    timeoutRef.current = setTimeout(async () => {
      try {
        // In a real app, you would use the uploaded file:
        // const dataUri = await fileToDataUri(file);
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
  }, [file, fileToDataUri, dataUriToCsv, toast]);

  // 셀 변경 핸들러
  const handleCellChange = useCallback((rowIndex: number, cellIndex: number, value: string) => {
    setEditableData(prev => {
      const newData = prev.map(row => [...row]);
      newData[rowIndex][cellIndex] = value;
      return newData;
    });
  }, []);

  // 상태 초기화
  const reset = useCallback(() => {
    // timeout 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setFile(null);
    setState('idle');
    setValidationResult(null);
    setEditableData([]);
  }, []);

  // 변경사항 저장 핸들러
  const handleSaveChanges = useCallback(() => {
    toast({
      title: "저장 완료",
      description: "수정된 데이터가 성공적으로 저장되었습니다.",
    });
    reset();
  }, [toast, reset]);

  // 셀 에러 조회
  const getCellError = useCallback((rowIndex: number, colName: string) => {
    return validationResult?.validationErrors?.find(
      e => e.row === rowIndex + 1 && e.column.toLowerCase() === colName.toLowerCase()
    );
  }, [validationResult]);

  return {
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
  };
}

