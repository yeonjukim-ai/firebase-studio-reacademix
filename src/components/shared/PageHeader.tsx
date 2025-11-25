/**
 * @fileoverview PageHeader 컴포넌트
 * 
 * 역할:
 * - 페이지의 제목, 설명, 액션 버튼을 표시하는 공통 헤더 컴포넌트
 * - 모든 페이지에서 일관된 헤더 스타일을 제공
 * 
 * Props 구조:
 * - title: string - 페이지 제목 (필수)
 * - description?: string - 페이지 설명 (선택)
 * - children?: ReactNode - 우측에 표시될 액션 버튼들 (선택)
 * - className?: string - 추가 CSS 클래스 (선택)
 * 
 * 데이터 흐름:
 * - Props로 받은 title, description을 표시
 * - children으로 전달된 ReactNode를 우측에 배치
 * - 스타일 유틸리티(heading1, bodySmall, buttonGroup)를 사용하여 일관된 디자인 적용
 * 
 * 이벤트 흐름:
 * - 이 컴포넌트 자체는 이벤트를 발생시키지 않음
 * - children으로 전달된 버튼들이 각자의 이벤트 핸들러를 가짐
 * 
 * 사용 예시:
 * ```tsx
 * <PageHeader title="대시보드" description="전체 현황을 요약합니다.">
 *   <Button>액션</Button>
 * </PageHeader>
 * ```
 */

import type { ReactNode } from 'react';
import { heading1, bodySmall, buttonGroup } from '@/lib/utils/styles';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-6 md:mb-8 flex flex-wrap items-center justify-between gap-4", className)}>
      <div className="flex-1 min-w-0">
        <h1 className={cn(heading1, "mb-2")}>{title}</h1>
        {description && (
          <p className={cn(bodySmall, "mt-1 max-w-2xl")}>
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className={cn(buttonGroup, "flex-shrink-0")}>
          {children}
        </div>
      )}
    </div>
  );
}
