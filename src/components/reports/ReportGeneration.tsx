/**
 * @fileoverview ReportGeneration 컴포넌트
 * 
 * 역할:
 * - 리포트 생성 프로세스를 관리하는 컴포넌트
 * - 리포트 템플릿, 대상, 기간 선택 → 리포트 생성 → 진행률 표시 → 완료/실패 처리
 * - useReportGeneration hook을 사용하여 상태 및 로직 관리
 * 
 * Props 구조:
 * - Props 없음 (내부에서 필요한 상태를 hook으로 관리)
 * 
 * 데이터 흐름:
 * - useReportGeneration hook 반환값:
 *   - date: 선택된 날짜 범위 (DateRange)
 *   - generationState: 리포트 생성 상태 ("idle" | "generating" | "completed" | "failed")
 *   - progress: 생성 진행률 (0-100)
 *   - handleGenerate: 리포트 생성 시작 함수
 *   - resetState: 상태 초기화 함수
 * - formattedDateRange: date를 포맷팅한 문자열 (useMemo로 메모이제이션)
 * 
 * 이벤트 흐름:
 * - 날짜 선택 → setDate → date 업데이트 → formattedDateRange 재계산
 * - "리포트 생성 시작" 버튼 클릭 → handleGenerate → generationState를 "generating"으로 변경
 *   → progress interval 시작 → 5초 후 완료/실패 처리
 * - 생성 완료 시 → "새 리포트 생성" 또는 "다운로드" 버튼 표시
 * - 생성 실패 시 → "다시 시도" 버튼 표시
 * - resetState 호출 → 모든 상태 초기화 → "idle" 상태로 복귀
 * 
 * 상태 관리:
 * - 리포트 생성 관련 상태는 useReportGeneration hook에서 관리
 * - interval과 timeout은 hook 내부에서 ref로 관리하여 cleanup 처리
 * 
 * 사용 예시:
 * ```tsx
 * <ReportGeneration />
 * ```
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/SectionCard";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useReportGeneration } from "@/hooks/useReportGeneration";
import { useMemo } from "react";

export function ReportGeneration() {
  const {
    date,
    setDate,
    generationState,
    progress,
    handleGenerate,
    resetState,
  } = useReportGeneration();

  // 날짜 포맷팅을 메모이제이션
  const formattedDateRange = useMemo(() => {
    if (!date?.from) return null;
    if (date.to) {
      return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`;
    }
    return format(date.from, "LLL dd, y");
  }, [date]);

  return (
    <SectionCard
      title="리포트 생성"
      description="리포트 템플릿, 대상, 기간을 선택하여 맞춤형 성과 리포트를 생성합니다."
      contentClassName="grid gap-6"
      footer={
        <>
          {generationState === "idle" && (
            <Button onClick={handleGenerate}>리포트 생성 시작</Button>
          )}
          {generationState === "completed" && (
            <>
              <Button variant="outline" onClick={resetState}>새 리포트 생성</Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                다운로드
              </Button>
            </>
          )}
          {generationState === "failed" && (
            <Button variant="outline" onClick={resetState}>다시 시도</Button>
          )}
        </>
      }
    >
        {generationState === "idle" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                <Label htmlFor="template">리포트 템플릿</Label>
                <Select>
                    <SelectTrigger id="template">
                    <SelectValue placeholder="템플릿 선택" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="monthly">월간 성과 리포트</SelectItem>
                    <SelectItem value="exam">시험 분석 리포트</SelectItem>
                    <SelectItem value="attendance">출결 리포트</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="target">리포트 대상</Label>
                <Select>
                    <SelectTrigger id="target">
                    <SelectValue placeholder="대상 선택" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">전체 학생</SelectItem>
                    <SelectItem value="class-a">A반</SelectItem>
                    <SelectItem value="class-b">B반</SelectItem>
                    <SelectItem value="individual">개별 선택</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <div className="grid gap-2 md:col-span-2">
                <Label>리포트 기간</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formattedDateRange || <span>날짜 선택</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
                </div>
            </div>
        )}
        {generationState === "generating" && (
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center p-8 md:p-12">
            <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-primary" />
            <p className="font-medium text-base md:text-lg">리포트를 생성하고 있습니다...</p>
            <Progress value={progress} className="w-full transition-all duration-300" />
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              {Math.round(progress)}% 완료
            </p>
          </div>
        )}
        {generationState === "completed" && (
          <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800">
            <AlertTitle className="text-green-800 dark:text-green-300">리포트 생성 완료!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              리포트가 성공적으로 생성되었습니다. 아래 버튼을 클릭하여 다운로드하세요.
            </AlertDescription>
          </Alert>
        )}
        {generationState === "failed" && (
            <Alert variant="destructive">
                <AlertTitle>생성 실패</AlertTitle>
                <AlertDescription>
                리포트 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </AlertDescription>
            </Alert>
        )}
    </SectionCard>
  );
}
