/**
 * @fileoverview DashboardPage - 대시보드 메인 페이지
 * 
 * 역할:
 * - 애플리케이션의 메인 대시보드 페이지
 * - KPI 카드, 성과 차트, 최근 활동 테이블을 표시
 * - 데이터 업로드 및 리포트 생성으로의 빠른 네비게이션 제공
 * 
 * Props 구조:
 * - Props 없음 (클라이언트 컴포넌트)
 * 
 * 데이터 흐름:
 * - kpis (dummy-data) → KpiCard 컴포넌트들로 렌더링
 * - PerformanceChart: performanceChartData를 내부에서 사용
 * - RecentActivityTable: reportHistory를 내부에서 사용
 * - useMemo로 KPI 카드 목록 메모이제이션하여 불필요한 리렌더링 방지
 * 
 * 이벤트 흐름:
 * - "데이터 업로드" 버튼 클릭 → handleUploadClick → /dashboard/data로 라우팅
 * - "리포트 생성" 버튼 클릭 → handleReportClick → /dashboard/reports로 라우팅
 * - useCallback으로 핸들러 메모이제이션하여 성능 최적화
 * 
 * 컴포넌트 구조:
 * - PageHeader: 페이지 제목과 액션 버튼
 * - KpiCard[]: 4개의 KPI 카드 (그리드 레이아웃)
 * - PerformanceChart: 성과 차트 (2/5 열)
 * - RecentActivityTable: 최근 활동 테이블 (3/5 열)
 * 
 * 사용 예시:
 * - /dashboard 경로로 접근 시 자동으로 렌더링됨
 */

"use client";

import { KpiCard } from "@/components/dashboard/KpiCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { gridKpi, gridDashboard } from "@/lib/utils/styles";
import { cn } from "@/lib/utils";
import { kpis } from "@/lib/dummy-data";
import { FilePlus, Upload } from "lucide-react";
import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // KPI 카드 목록을 메모이제이션
  const kpiCards = useMemo(
    () => kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />),
    []
  );

  // 네비게이션 핸들러를 useCallback으로 메모이제이션
  const handleUploadClick = useCallback(() => {
    router.push("/dashboard/data");
  }, [router]);

  const handleReportClick = useCallback(() => {
    router.push("/dashboard/reports");
  }, [router]);

  return (
    <>
      <PageHeader title="대시보드" description="전체 현황을 요약하여 보여줍니다.">
        <Button 
          variant="outline" 
          className="transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={handleUploadClick}
        >
          <Upload className="mr-2 h-4 w-4" />
          데이터 업로드
        </Button>
        <Button 
          className="transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={handleReportClick}
        >
          <FilePlus className="mr-2 h-4 w-4" />
          리포트 생성
        </Button>
      </PageHeader>
      <div className={gridKpi}>
        {kpiCards}
      </div>
      <div className={cn(gridDashboard, "mt-6 md:mt-8")}>
        <PerformanceChart />
        <RecentActivityTable />
      </div>
    </>
  );
}
