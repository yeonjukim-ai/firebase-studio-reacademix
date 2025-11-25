/**
 * @fileoverview HistoryTable 컴포넌트
 * 
 * 역할:
 * - 리포트 생성 이력 또는 전송 이력을 표시하는 테이블 컴포넌트
 * - DataTable 컴포넌트를 사용하여 구현
 * - type prop에 따라 생성 이력 또는 전송 이력으로 동작
 * 
 * Props 구조:
 * - data: HistoryItem[] - 표시할 이력 데이터 배열 (필수)
 * - type: "generation" | "transmission" - 이력 타입 (필수)
 * 
 * 데이터 흐름:
 * - data prop → DataTable의 data prop
 * - type prop에 따라 컬럼 라벨과 렌더링 로직이 변경됨
 *   - "generation": 리포트 명, 대상, 생성자, 생성일 표시
 *   - "transmission": 리포트 명, 수신자, 채널, 전송일 표시
 * - columns: type에 따라 동적으로 생성되는 컬럼 정의 배열
 * 
 * 이벤트 흐름:
 * - "다운로드" 버튼 클릭 (생성 이력, completed 상태) → 현재는 이벤트 핸들러 없음
 * - "재전송" 버튼 클릭 (전송 이력, sent 상태) → 현재는 이벤트 핸들러 없음
 * - 테이블 행 호버 → DataTable의 tableRowHover 스타일 적용
 * 
 * 상태 표시:
 * - completed/sent: 파란색 배지 (default variant)
 * - failed: 빨간색 배지 (destructive variant)
 * - 기타: 회색 배지 (secondary variant)
 * 
 * 사용 예시:
 * ```tsx
 * <HistoryTable data={reportHistory} type="generation" />
 * <HistoryTable data={transmissionHistory} type="transmission" />
 * ```
 */

"use client";

import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Send } from "lucide-react";

type HistoryItem = {
  id: string;
  name?: string;
  reportName?: string;
  target?: string;
  recipient?: string;
  status: "completed" | "failed" | "in_progress" | "sent";
  creator?: string;
  channel?: "Email" | "SMS";
  createdAt?: string;
  sentAt?: string;
};

type HistoryTableProps = {
  data: HistoryItem[];
  type: "generation" | "transmission";
};

export function HistoryTable({ data, type }: HistoryTableProps) {
  const isGeneration = type === "generation";

  const columns = [
    {
      key: "name",
      label: "리포트 명",
      render: (item: HistoryItem) => (
        <span className="font-medium">
          {isGeneration ? item.name : item.reportName}
        </span>
      ),
    },
    {
      key: "target",
      label: isGeneration ? "대상" : "수신자",
      render: (item: HistoryItem) => isGeneration ? item.target : item.recipient,
    },
    {
      key: "creator",
      label: isGeneration ? "생성자" : "채널",
      render: (item: HistoryItem) => isGeneration ? item.creator : item.channel,
    },
    {
      key: "status",
      label: "상태",
      render: (item: HistoryItem) => (
        <Badge
          variant={
            item.status === "completed" || item.status === "sent"
              ? "default"
              : item.status === "failed"
              ? "destructive"
              : "secondary"
          }
          className={
            item.status === "completed" || item.status === "sent"
              ? 'bg-blue-100 text-blue-800'
              : ''
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: "date",
      label: isGeneration ? "생성일" : "전송일",
      render: (item: HistoryItem) => isGeneration ? item.createdAt : item.sentAt,
    },
    {
      key: "action",
      label: "작업",
      className: "text-right",
      render: (item: HistoryItem) => (
        <div className="text-right">
          {isGeneration && item.status === 'completed' && (
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              다운로드
            </Button>
          )}
          {!isGeneration && item.status === 'sent' && (
            <Button variant="outline" size="sm">
              <Send className="mr-2 h-4 w-4" />
              재전송
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      getRowKey={(item) => item.id}
    />
  );
}
