import { KpiCard } from "@/components/dashboard/KpiCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { kpis } from "@/lib/dummy-data";
import { FilePlus, Upload } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="대시보드" description="전체 현황을 요약하여 보여줍니다.">
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          데이터 업로드
        </Button>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          리포트 생성
        </Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <PerformanceChart />
        <RecentActivityTable />
      </div>
    </>
  );
}
