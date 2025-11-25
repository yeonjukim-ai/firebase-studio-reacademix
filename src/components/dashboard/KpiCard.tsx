/**
 * @fileoverview KpiCard 컴포넌트
 * 
 * 역할:
 * - 대시보드에 표시되는 KPI(핵심 성과 지표) 카드 컴포넌트
 * - 제목, 값, 변화량, 변화 방향(증가/감소)을 표시
 * - 호버 효과와 반응형 디자인 지원
 * 
 * Props 구조 (Kpi 타입):
 * - title: string - KPI 제목 (예: "총 학생 수")
 * - value: string - KPI 값 (예: "1,234")
 * - change: string - 변화량 표시 (예: "+12.5%")
 * - changeType: 'increase' | 'decrease' - 변화 방향
 * 
 * 데이터 흐름:
 * - Props로 받은 Kpi 데이터를 카드 형태로 표시
 * - changeType에 따라 화살표 아이콘과 색상이 변경됨
 *   - 'increase': ArrowUpRight (녹색)
 *   - 'decrease': ArrowDownRight (빨간색)
 * - value는 큰 폰트로 강조 표시
 * - change는 작은 폰트로 value 아래에 표시
 * 
 * 이벤트 흐름:
 * - 카드에 호버 시 그림자와 테두리 효과 적용 (cardInteractive 스타일)
 * - 화살표 아이콘에 호버 시 스케일 효과 적용
 * - 클릭 이벤트는 없음 (표시 전용 컴포넌트)
 * 
 * 사용 예시:
 * ```tsx
 * <KpiCard
 *   title="총 학생 수"
 *   value="1,234"
 *   change="+12.5%"
 *   changeType="increase"
 * />
 * ```
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardInteractive, heading4, bodySmall, hoverSmooth } from "@/lib/utils/styles";
import type { Kpi } from "@/lib/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function KpiCard({ title, value, change, changeType }: Kpi) {
  const isPositive = changeType === 'increase';
  
  return (
    <Card className={cn(cardInteractive, "group")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className={cn(heading4, "text-sm md:text-base")}>
          {title}
        </CardTitle>
        <div className={cn(
          hoverSmooth,
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}>
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
          ) : (
            <ArrowDownRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className={cn(
          "text-2xl md:text-3xl font-bold font-headline",
          "transition-colors duration-200",
          "text-foreground"
        )}>
          {value}
        </div>
        <p
          className={cn(
            bodySmall,
            "font-medium",
            isPositive 
              ? "text-green-600 dark:text-green-400" 
              : "text-red-600 dark:text-red-400"
          )}
        >
          {change} vs last month
        </p>
      </CardContent>
    </Card>
  );
}
