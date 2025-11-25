/**
 * @fileoverview TableCard 컴포넌트
 * 
 * 역할:
 * - Card로 감싸진 테이블 패턴을 표준화한 재사용 가능한 컴포넌트
 * - RecentActivityTable, HistoryTable 등에서 사용
 * - 제네릭 타입을 사용하여 다양한 데이터 타입 지원
 * 
 * Props 구조:
 * - title: string - 테이블 제목 (필수)
 * - description?: string - 테이블 설명 (선택)
 * - columns: TableColumn[] - 테이블 컬럼 정의 배열 (필수)
 *   - key: string - 컬럼 고유 키
 *   - label: string - 컬럼 헤더 라벨
 *   - className?: string - 컬럼 헤더에 적용할 CSS 클래스
 * - data: T[] - 테이블에 표시할 데이터 배열 (필수)
 * - renderRow: (item: T, index: number) => ReactNode - 각 행을 렌더링하는 함수 (필수)
 * - headerAction?: ReactNode - 헤더 우측에 표시될 액션 버튼 (선택)
 * - className?: string - 카드 컨테이너에 적용할 추가 CSS 클래스 (선택)
 * - emptyMessage?: string - 데이터가 없을 때 표시할 메시지 (기본값: "데이터가 없습니다.")
 * 
 * 데이터 흐름:
 * - columns 배열을 순회하여 TableHeader 생성
 * - data 배열을 순회하며 renderRow 함수를 호출하여 각 행 렌더링
 * - data가 비어있으면 emptyMessage 표시
 * - headerAction이 있으면 헤더 우측에 배치
 * 
 * 이벤트 흐름:
 * - 이 컴포넌트 자체는 이벤트를 발생시키지 않음
 * - renderRow 함수 내에서 생성된 TableCell들이 각자의 이벤트 핸들러를 가질 수 있음
 * - 테이블 행에 호버 시 배경색 변경 효과 적용
 * 
 * 사용 예시:
 * ```tsx
 * <TableCard<Report>
 *   title="최근 활동"
 *   columns={[
 *     { key: "name", label: "리포트 명" },
 *     { key: "status", label: "상태" }
 *   ]}
 *   data={reports}
 *   renderRow={(report) => (
 *     <>
 *       <TableCell>{report.name}</TableCell>
 *       <TableCell>{report.status}</TableCell>
 *     </>
 *   )}
 * />
 * ```
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { heading3, bodySmall, cardBase, tableContainer, tableRowHover, tableHeader } from "@/lib/utils/styles";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type TableCardProps<T = Record<string, unknown>> = {
  title: string;
  description?: string;
  columns: TableColumn[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  headerAction?: ReactNode;
  className?: string;
  emptyMessage?: string;
};

/**
 * 재사용 가능한 테이블 카드 컴포넌트
 * 
 * Card로 감싸진 테이블 패턴을 표준화합니다.
 * RecentActivityTable, HistoryTable 등에서 사용됩니다.
 */
export function TableCard<T extends Record<string, unknown>>({
  title,
  description,
  columns,
  data,
  renderRow,
  headerAction,
  className,
  emptyMessage = "데이터가 없습니다.",
}: TableCardProps<T>) {
  return (
    <Card className={cn(cardBase, className)}>
      <CardHeader className={cn(
        "pb-4 md:pb-6",
        headerAction && "flex-row items-center gap-4"
      )}>
        <div className="grid gap-1.5 flex-1 min-w-0">
          <CardTitle className={cn(heading3, "text-lg md:text-xl")}>
            {title}
          </CardTitle>
          {description && (
            <CardDescription className={cn(bodySmall)}>
              {description}
            </CardDescription>
          )}
        </div>
        {headerAction && (
          <div className="flex-shrink-0">
            {headerAction}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className={cn(bodySmall)}>{emptyMessage}</p>
          </div>
        ) : (
          <div className={tableContainer}>
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
                  <TableRow key={index} className={tableRowHover}>
                    {renderRow(item, index)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

