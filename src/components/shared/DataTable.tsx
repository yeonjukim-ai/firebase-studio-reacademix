/**
 * @fileoverview DataTable 컴포넌트
 * 
 * 역할:
 * - Card 없이 테이블만 필요한 경우 사용하는 재사용 가능한 테이블 컴포넌트
 * - HistoryTable 등에서 사용
 * - 제네릭 타입을 사용하여 다양한 데이터 타입 지원
 * - 컬럼별 커스텀 렌더링 함수 지원
 * 
 * Props 구조:
 * - columns: DataTableColumn<T>[] - 테이블 컬럼 정의 배열 (필수)
 *   - key: string - 컬럼 고유 키
 *   - label: string - 컬럼 헤더 라벨
 *   - className?: string - 컬럼에 적용할 CSS 클래스
 *   - render?: (item: T, index: number) => ReactNode - 셀 커스텀 렌더링 함수 (선택)
 * - data: T[] - 테이블에 표시할 데이터 배열 (필수)
 * - className?: string - 테이블 컨테이너에 적용할 추가 CSS 클래스 (선택)
 * - emptyMessage?: string - 데이터가 없을 때 표시할 메시지 (기본값: "데이터가 없습니다.")
 * - getRowKey?: (item: T, index: number) => string | number - 행의 고유 키 생성 함수 (기본값: index)
 * 
 * 데이터 흐름:
 * - columns 배열을 순회하여 TableHeader 생성
 * - data 배열을 순회하며 각 행 생성
 * - 각 셀은 column.render 함수가 있으면 해당 함수로 렌더링, 없으면 item[column.key] 값 표시
 * - data가 비어있으면 emptyMessage 표시
 * 
 * 이벤트 흐름:
 * - 이 컴포넌트 자체는 이벤트를 발생시키지 않음
 * - column.render 함수 내에서 생성된 컴포넌트들이 각자의 이벤트 핸들러를 가질 수 있음
 * - 테이블 행에 호버 시 배경색 변경 효과 적용
 * 
 * 사용 예시:
 * ```tsx
 * <DataTable<Report>
 *   columns={[
 *     { key: "name", label: "리포트 명" },
 *     { 
 *       key: "status", 
 *       label: "상태",
 *       render: (item) => <Badge>{item.status}</Badge>
 *     }
 *   ]}
 *   data={reports}
 *   getRowKey={(item) => item.id}
 * />
 * ```
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { tableContainer, tableRowHover, tableHeader, bodySmall, emptyState } from "@/lib/utils/styles";
import type { ReactNode } from "react";

type DataTableColumn<T = Record<string, unknown>> = {
  key: string;
  label: string;
  className?: string;
  render?: (item: T, index: number) => ReactNode;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
  getRowKey?: (item: T, index: number) => string | number;
};

/**
 * 재사용 가능한 데이터 테이블 컴포넌트
 * 
 * Card 없이 테이블만 필요한 경우 사용합니다.
 * HistoryTable 등에서 사용됩니다.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  emptyMessage = "데이터가 없습니다.",
  getRowKey = (_, index) => index,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn(emptyState, className)}>
        <p className={cn(bodySmall)}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn(tableContainer, className)}>
      <Table>
        <TableHeader>
          <TableRow className={tableHeader}>
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className={cn("font-semibold", column.className)}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow 
              key={getRowKey(item, index)} 
              className={tableRowHover}
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render ? column.render(item, index) : String(item[column.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

