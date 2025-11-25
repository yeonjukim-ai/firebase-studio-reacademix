/**
 * @fileoverview RecentActivityTable 컴포넌트
 * 
 * 역할:
 * - 대시보드에 표시되는 최근 리포트 활동 테이블
 * - reportHistory에서 최근 5개 항목만 표시
 * - TableCard 컴포넌트를 사용하여 구현
 * 
 * Props 구조:
 * - Props 없음 (내부에서 reportHistory 데이터를 직접 import)
 * 
 * 데이터 흐름:
 * - reportHistory (dummy-data) → slice(0, 5) → recentReports (useMemo로 메모이제이션)
 * - columns: 테이블 컬럼 정의 (useMemo로 메모이제이션)
 * - headerAction: "전체 보기" 버튼 (useMemo로 메모이제이션)
 * - getBadgeVariant: 상태에 따른 배지 variant 결정 함수 (useMemo로 메모이제이션)
 * 
 * 이벤트 흐름:
 * - "전체 보기" 버튼 클릭 → /dashboard/reports로 링크 이동
 * - 테이블 행 호버 → TableCard의 tableRowHover 스타일 적용
 * 
 * 성능 최적화:
 * - 모든 정적 데이터를 useMemo로 메모이제이션하여 불필요한 리렌더링 방지
 * 
 * 사용 예시:
 * ```tsx
 * <RecentActivityTable />
 * ```
 */

"use client";

import { TableCard } from "@/components/shared/TableCard";
import { reportHistory } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { TableCell } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import type { Report } from "@/lib/types";
import { useMemo } from "react";

export function RecentActivityTable() {
  // 컬럼 정의를 메모이제이션
  const columns = useMemo(
    () => [
      { key: "name", label: "리포트 명" },
      { key: "target", label: "대상" },
      { key: "status", label: "상태" },
      { key: "creator", label: "생성자" },
      { key: "createdAt", label: "생성일" },
    ],
    []
  );

  // 최근 리포트 데이터를 메모이제이션
  const recentReports = useMemo(
    () => reportHistory.slice(0, 5),
    []
  );

  // 헤더 액션을 메모이제이션
  const headerAction = useMemo(
    () => (
      <Button asChild size="sm" className="gap-1">
        <a href="/dashboard/reports">
          전체 보기
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    ),
    []
  );

  // 배지 variant를 결정하는 함수를 메모이제이션
  const getBadgeVariant = useMemo(
    () => (status: string) => {
      if (status === "completed") return "default";
      if (status === "failed") return "destructive";
      return "secondary";
    },
    []
  );

  return (
    <TableCard<Report>
      title="최근 활동"
      description="최근 생성 및 전송된 리포트 목록입니다."
      columns={columns}
      data={recentReports}
      headerAction={headerAction}
      className="col-span-1 lg:col-span-3"
      renderRow={(report) => (
        <>
          <TableCell className="font-medium">{report.name}</TableCell>
          <TableCell>{report.target}</TableCell>
          <TableCell>
            <Badge
              variant={getBadgeVariant(report.status)}
              className="capitalize"
            >
              {report.status}
            </Badge>
          </TableCell>
          <TableCell>{report.creator}</TableCell>
          <TableCell>{report.createdAt}</TableCell>
        </>
      )}
    />
  );
}
