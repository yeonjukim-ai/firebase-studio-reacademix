/**
 * @fileoverview SectionCard 컴포넌트
 * 
 * 역할:
 * - Card + Header + Title + Description + Content 패턴을 표준화한 재사용 가능한 섹션 카드
 * - Settings 페이지, ReportGeneration, DataManagementClient 등에서 사용
 * - 일관된 카드 스타일과 레이아웃을 제공
 * 
 * Props 구조:
 * - title: string - 카드 제목 (필수)
 * - description?: string - 카드 설명 (선택)
 * - children: ReactNode - 카드 본문 내용 (필수)
 * - footer?: ReactNode - 카드 하단에 표시될 내용 (선택)
 * - headerAction?: ReactNode - 헤더 우측에 표시될 액션 버튼 (선택)
 * - className?: string - 카드 컨테이너에 적용할 추가 CSS 클래스 (선택)
 * - contentClassName?: string - 콘텐츠 영역에 적용할 추가 CSS 클래스 (선택)
 * - interactive?: boolean - 호버 효과 활성화 여부 (기본값: false)
 * 
 * 데이터 흐름:
 * - Props로 받은 title, description을 CardHeader에 표시
 * - children을 CardContent에 렌더링
 * - footer가 있으면 CardFooter에 렌더링
 * - headerAction이 있으면 헤더 우측에 배치
 * - interactive가 true이면 호버 시 그림자와 테두리 효과 적용
 * 
 * 이벤트 흐름:
 * - 이 컴포넌트 자체는 이벤트를 발생시키지 않음
 * - children이나 footer, headerAction으로 전달된 컴포넌트들이 각자의 이벤트 핸들러를 가짐
 * - interactive가 true일 때 호버 이벤트에 반응하여 스타일 변경
 * 
 * 사용 예시:
 * ```tsx
 * <SectionCard
 *   title="설정"
 *   description="시스템 설정을 관리합니다."
 *   headerAction={<Button>저장</Button>}
 *   footer={<Button>확인</Button>}
 * >
 *   <Input placeholder="입력..." />
 * </SectionCard>
 * ```
 */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { heading3, bodySmall, cardBase, hoverSmooth } from "@/lib/utils/styles";
import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  headerAction?: ReactNode;
  className?: string;
  contentClassName?: string;
  interactive?: boolean;
};

/**
 * 재사용 가능한 섹션 카드 컴포넌트
 * 
 * Card + Header + Title + Description + Content 패턴을 표준화합니다.
 * Settings 페이지, ReportGeneration, DataManagementClient 등에서 사용됩니다.
 */
export function SectionCard({
  title,
  description,
  children,
  footer,
  headerAction,
  className,
  contentClassName,
  interactive = false,
}: SectionCardProps) {
  return (
    <Card className={cn(
      cardBase,
      interactive && hoverSmooth,
      interactive && "hover:shadow-md hover:border-primary/20",
      className
    )}>
      <CardHeader className="pb-4 md:pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className={cn(heading3, "text-lg md:text-xl mb-1")}>
              {title}
            </CardTitle>
            {description && (
              <CardDescription className={cn(bodySmall, "mt-1")}>
                {description}
              </CardDescription>
            )}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn("pt-0", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("pt-4 md:pt-6 border-t", hoverSmooth)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

