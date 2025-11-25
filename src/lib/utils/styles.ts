import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * TailwindCSS Best Practice 기반 재사용 가능한 스타일 유틸리티
 * 
 * 시각적 계층 구조, 간격, 폰트, 색상, hover 효과 등을 표준화합니다.
 */

// ============================================================================
// 타이포그래피 (Typography)
// ============================================================================

/**
 * 페이지 제목 스타일
 * 가장 큰 제목, 페이지의 주요 제목에 사용
 */
export const heading1 = "text-3xl md:text-4xl font-bold font-headline tracking-tight text-foreground";

/**
 * 섹션 제목 스타일
 * 섹션의 주요 제목에 사용
 */
export const heading2 = "text-2xl md:text-3xl font-semibold font-headline tracking-tight text-foreground";

/**
 * 카드/컴포넌트 제목 스타일
 * 카드나 컴포넌트 내부 제목에 사용
 */
export const heading3 = "text-xl md:text-2xl font-semibold font-headline tracking-tight text-foreground";

/**
 * 소제목 스타일
 * 작은 제목이나 라벨에 사용
 */
export const heading4 = "text-lg md:text-xl font-medium font-headline text-foreground";

/**
 * 본문 텍스트 스타일
 * 일반적인 본문 텍스트에 사용
 */
export const body = "text-sm md:text-base font-normal font-body text-foreground";

/**
 * 작은 본문 텍스트 스타일
 * 보조 정보나 설명에 사용
 */
export const bodySmall = "text-xs md:text-sm font-normal font-body text-muted-foreground";

/**
 * 캡션 스타일
 * 매우 작은 텍스트, 메타 정보에 사용
 */
export const caption = "text-xs font-normal font-body text-muted-foreground";

/**
 * 강조 텍스트 스타일
 * 중요한 정보를 강조할 때 사용
 */
export const emphasis = "text-sm md:text-base font-medium font-body text-foreground";

// ============================================================================
// 간격 (Spacing)
// ============================================================================

/**
 * 섹션 간격
 * 큰 섹션 사이의 간격
 */
export const sectionGap = "gap-6 md:gap-8 lg:gap-10";

/**
 * 카드 내부 간격
 * 카드 내부 요소들 사이의 간격
 */
export const cardGap = "gap-4 md:gap-6";

/**
 * 폼 요소 간격
 * 폼 내부 입력 필드들 사이의 간격
 */
export const formGap = "gap-3 md:gap-4";

/**
 * 버튼 그룹 간격
 * 버튼들 사이의 간격
 */
export const buttonGap = "gap-2 md:gap-3";

/**
 * 페이지 패딩
 * 페이지 콘텐츠의 패딩
 */
export const pagePadding = "p-4 md:p-6 lg:p-8";

/**
 * 카드 패딩
 * 카드 내부의 패딩
 */
export const cardPadding = "p-4 md:p-6";

// ============================================================================
// 레이아웃 (Layout)
// ============================================================================

/**
 * 그리드 레이아웃 - KPI 카드
 * 4개의 KPI 카드를 표시하는 그리드
 */
export const gridKpi = "grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4";

/**
 * 그리드 레이아웃 - 대시보드
 * 대시보드 메인 레이아웃
 */
export const gridDashboard = "grid grid-cols-1 gap-6 lg:grid-cols-5";

/**
 * 그리드 레이아웃 - 설정
 * 설정 페이지의 2열 그리드
 */
export const gridSettings = "grid gap-6 md:grid-cols-2";

/**
 * 그리드 레이아웃 - 폼
 * 폼 요소들의 그리드
 */
export const gridForm = "grid gap-4 md:grid-cols-2";

/**
 * 플렉스 레이아웃 - 행
 * 가로로 정렬된 요소들
 */
export const flexRow = "flex flex-row items-center gap-2 md:gap-4";

/**
 * 플렉스 레이아웃 - 열
 * 세로로 정렬된 요소들
 */
export const flexCol = "flex flex-col gap-3 md:gap-4";

/**
 * 플렉스 레이아웃 - 중앙 정렬
 * 중앙에 정렬된 요소들
 */
export const flexCenter = "flex items-center justify-center";

// ============================================================================
// 카드 스타일 (Card Styles)
// ============================================================================

/**
 * 기본 카드 스타일
 */
export const cardBase = "rounded-lg border bg-card text-card-foreground shadow-sm";

/**
 * 인터랙티브 카드 스타일
 * 호버 효과가 있는 카드
 */
export const cardInteractive = clsx(
  cardBase,
  "transition-all duration-200 ease-in-out",
  "hover:shadow-md hover:border-primary/20",
  "cursor-pointer"
);

/**
 * 강조 카드 스타일
 * 중요한 정보를 표시하는 카드
 */
export const cardHighlight = clsx(
  cardBase,
  "border-primary/30 bg-primary/5"
);

// ============================================================================
// 버튼 스타일 (Button Styles)
// ============================================================================

/**
 * 버튼 그룹 스타일
 * 여러 버튼을 함께 표시할 때
 */
export const buttonGroup = "flex flex-wrap items-center gap-2 md:gap-3";

/**
 * 버튼 그룹 - 우측 정렬
 */
export const buttonGroupRight = clsx(buttonGroup, "justify-end");

/**
 * 버튼 그룹 - 중앙 정렬
 */
export const buttonGroupCenter = clsx(buttonGroup, "justify-center");

// ============================================================================
// 호버 효과 (Hover Effects)
// ============================================================================

/**
 * 부드러운 호버 효과
 * 일반적인 인터랙티브 요소에 사용
 */
export const hoverSmooth = "transition-all duration-200 ease-in-out";

/**
 * 호버 - 배경색 변경
 */
export const hoverBg = clsx(hoverSmooth, "hover:bg-accent hover:text-accent-foreground");

/**
 * 호버 - 스케일 효과
 */
export const hoverScale = clsx(hoverSmooth, "hover:scale-105 active:scale-95");

/**
 * 호버 - 그림자 효과
 */
export const hoverShadow = clsx(hoverSmooth, "hover:shadow-md hover:shadow-primary/10");

/**
 * 호버 - 테두리 강조
 */
export const hoverBorder = clsx(hoverSmooth, "hover:border-primary/50");

// ============================================================================
// 포커스 효과 (Focus Effects)
// ============================================================================

/**
 * 접근성을 고려한 포커스 링
 */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * 포커스 - 버튼
 */
export const focusButton = clsx(focusRing, "focus-visible:ring-offset-background");

/**
 * 포커스 - 입력 필드
 */
export const focusInput = clsx(focusRing, "focus-visible:ring-primary/50");

// ============================================================================
// 상태 스타일 (State Styles)
// ============================================================================

/**
 * 로딩 상태 스타일
 */
export const loadingState = "flex flex-col items-center justify-center gap-4 text-center p-8 min-h-[200px]";

/**
 * 빈 상태 스타일
 */
export const emptyState = "flex flex-col items-center justify-center gap-3 p-12 text-center text-muted-foreground";

/**
 * 에러 상태 스타일
 */
export const errorState = "text-destructive bg-destructive/10 border-destructive/20";

/**
 * 성공 상태 스타일
 */
export const successState = "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800";

// ============================================================================
// 테이블 스타일 (Table Styles)
// ============================================================================

/**
 * 테이블 컨테이너 스타일
 */
export const tableContainer = "rounded-lg border overflow-hidden";

/**
 * 테이블 행 호버 효과
 */
export const tableRowHover = clsx(
  hoverSmooth,
  "hover:bg-muted/50"
);

/**
 * 테이블 헤더 스타일
 */
export const tableHeader = "bg-muted/50 font-semibold";

// ============================================================================
// 입력 필드 스타일 (Input Styles)
// ============================================================================

/**
 * 입력 필드 그룹 스타일
 */
export const inputGroup = "grid gap-2";

/**
 * 입력 필드 레이블 스타일
 */
export const inputLabel = "text-sm font-medium text-foreground";

/**
 * 입력 필드 설명 스타일
 */
export const inputDescription = "text-xs text-muted-foreground";

// ============================================================================
// 배지 스타일 (Badge Styles)
// ============================================================================

/**
 * 배지 - 성공 상태
 */
export const badgeSuccess = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800";

/**
 * 배지 - 경고 상태
 */
export const badgeWarning = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";

/**
 * 배지 - 에러 상태
 */
export const badgeError = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800";

/**
 * 배지 - 정보 상태
 */
export const badgeInfo = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";

// ============================================================================
// 애니메이션 (Animations)
// ============================================================================

/**
 * 페이드 인 애니메이션
 */
export const fadeIn = "animate-in fade-in duration-200";

/**
 * 슬라이드 인 애니메이션
 */
export const slideIn = "animate-in slide-in-from-bottom-4 duration-300";

/**
 * 스케일 인 애니메이션
 */
export const scaleIn = "animate-in zoom-in-95 duration-200";

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 클래스 병합 유틸리티
 * 기존 cn 함수와 동일하지만 명시적으로 export
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 조건부 클래스 적용
 */
export function conditionalClass(condition: boolean, trueClass: string, falseClass = "") {
  return condition ? trueClass : falseClass;
}

