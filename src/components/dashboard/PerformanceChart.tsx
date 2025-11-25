/**
 * @fileoverview PerformanceChart 컴포넌트
 * 
 * 역할:
 * - 대시보드에 표시되는 학원/지점별 성과 추이 차트
 * - Recharts의 BarChart를 사용하여 막대 그래프 표시
 * - SectionCard로 감싸져 있음
 * 
 * Props 구조:
 * - Props 없음 (내부에서 performanceChartData를 직접 import)
 * 
 * 데이터 흐름:
 * - performanceChartData (dummy-data) → BarChart의 data prop
 * - chartConfig: 차트 설정 (지점 A, 지점 B의 색상 정의)
 * - config: chartConfig를 useMemo로 메모이제이션 (일관성을 위해)
 * 
 * 이벤트 흐름:
 * - 차트 호버 → ChartTooltip 표시
 * - 이벤트 직접 발생 없음 (표시 전용 컴포넌트)
 * 
 * 차트 구성:
 * - X축: 월 (month)
 * - Y축: 성적 점수
 * - 데이터 시리즈: 지점 A, 지점 B
 * 
 * 사용 예시:
 * ```tsx
 * <PerformanceChart />
 * ```
 */

"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { SectionCard } from '@/components/shared/SectionCard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { performanceChartData } from '@/lib/dummy-data';
import { useMemo } from 'react';

const chartConfig = {
  '지점 A': {
    label: '지점 A',
    color: 'hsl(var(--primary))',
  },
  '지점 B': {
    label: '지점 B',
    color: 'hsl(var(--accent))',
  },
} as const;

export function PerformanceChart() {
  // 차트 설정을 메모이제이션 (실제로는 상수이지만 일관성을 위해)
  const config = useMemo(() => chartConfig, []);

  return (
    <SectionCard
      title="학원/지점별 성과 추이"
      description="지난 6개월간의 평균 성적 추이입니다."
      className="col-span-1 lg:col-span-2 transition-all duration-200"
      contentClassName="pl-2 md:pl-4"
    >
        <ChartContainer config={config} className="min-h-[350px] w-full">
          <BarChart data={performanceChartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
            />
            <ChartTooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="지점 A" fill="var(--color-지점 A)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="지점 B" fill="var(--color-지점 B)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
    </SectionCard>
  );
}
