import { PageHeader } from "@/components/shared/PageHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ReportGeneration } from "@/components/reports/ReportGeneration";
import { HistoryTable } from "@/components/reports/HistoryTable";
import { reportHistory, transmissionHistory } from "@/lib/dummy-data";

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="리포트 관리"
        description="리포트 생성, 이력 조회 및 관리를 할 수 있습니다."
      />
      <Tabs defaultValue="generate">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="generate">리포트 생성</TabsTrigger>
          <TabsTrigger value="generation-history">생성 이력</TabsTrigger>
          <TabsTrigger value="transmission-history">전송 이력</TabsTrigger>
        </TabsList>
        <TabsContent value="generate" className="mt-6">
          <ReportGeneration />
        </TabsContent>
        <TabsContent value="generation-history" className="mt-6">
          <HistoryTable data={reportHistory} type="generation" />
        </TabsContent>
        <TabsContent value="transmission-history" className="mt-6">
          <HistoryTable
            data={transmissionHistory}
            type="transmission"
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
