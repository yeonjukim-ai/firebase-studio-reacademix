/**
 * @fileoverview ReportsPage - 리포트 관리 페이지
 * 
 * 역할:
 * - 리포트 생성, 생성 이력, 전송 이력을 관리하는 페이지
 * - Tabs 컴포넌트를 사용하여 3개의 탭으로 구성
 * 
 * Props 구조:
 * - Props 없음 (서버 컴포넌트)
 * 
 * 데이터 흐름:
 * - reportHistory (dummy-data) → HistoryTable (type="generation")
 * - transmissionHistory (dummy-data) → HistoryTable (type="transmission")
 * - ReportGeneration: 내부에서 필요한 상태를 hook으로 관리
 * 
 * 이벤트 흐름:
 * - 탭 전환 → Tabs 컴포넌트가 내부적으로 처리
 * - "리포트 생성" 탭: ReportGeneration 컴포넌트의 이벤트 처리
 * - "생성 이력" 탭: HistoryTable 컴포넌트의 이벤트 처리
 * - "전송 이력" 탭: HistoryTable 컴포넌트의 이벤트 처리
 * 
 * 컴포넌트 구조:
 * - PageHeader: 페이지 제목과 설명
 * - Tabs: 3개의 탭 (리포트 생성, 생성 이력, 전송 이력)
 *   - TabsContent "generate": ReportGeneration 컴포넌트
 *   - TabsContent "generation-history": HistoryTable (type="generation")
 *   - TabsContent "transmission-history": HistoryTable (type="transmission")
 * 
 * 사용 예시:
 * - /dashboard/reports 경로로 접근 시 자동으로 렌더링됨
 */

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
