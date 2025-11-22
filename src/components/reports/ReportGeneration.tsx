"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DateRange } from "react-day-picker";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export function ReportGeneration() {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [generationState, setGenerationState] = React.useState<"idle" | "generating" | "completed" | "failed">("idle");
  const [progress, setProgress] = React.useState(0);

  const handleGenerate = () => {
    setGenerationState("generating");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      // Randomly succeed or fail
      setGenerationState(Math.random() > 0.2 ? "completed" : "failed");
    }, 5000);
  };

  const resetState = () => {
    setGenerationState("idle");
    setProgress(0);
    setDate(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>리포트 생성</CardTitle>
        <CardDescription>
          리포트 템플릿, 대상, 기간을 선택하여 맞춤형 성과 리포트를 생성합니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
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
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>날짜 선택</span>
                        )}
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
          <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-medium">리포트를 생성하고 있습니다...</p>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">{Math.round(progress)}% 완료</p>
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
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
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
      </CardFooter>
    </Card>
  );
}
