import { useState, useCallback, useRef, useEffect } from 'react';
import { DateRange } from 'react-day-picker';

type GenerationState = "idle" | "generating" | "completed" | "failed";

/**
 * 리포트 생성 로직을 관리하는 custom hook
 * 
 * 리포트 생성 상태, 진행률, 날짜 범위를 관리하고 생성 프로세스를 제어합니다.
 */
export function useReportGeneration() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [generationState, setGenerationState] = useState<GenerationState>("idle");
  const [progress, setProgress] = useState(0);
  
  // interval과 timeout을 ref로 관리하여 cleanup 가능하게 함
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleGenerate = useCallback(() => {
    setGenerationState("generating");
    setProgress(0);
    
    // 진행률 업데이트 interval
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    // 5초 후 완료 처리
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress(100);
      // Randomly succeed or fail
      setGenerationState(Math.random() > 0.2 ? "completed" : "failed");
    }, 5000);
  }, []);

  const resetState = useCallback(() => {
    // 기존 interval과 timeout 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setGenerationState("idle");
    setProgress(0);
    setDate(undefined);
  }, []);

  return {
    date,
    setDate,
    generationState,
    progress,
    handleGenerate,
    resetState,
  };
}

