import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 클래스 병합 유틸리티
 * clsx와 tailwind-merge를 결합하여 클래스 충돌을 자동으로 해결합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 스타일 유틸리티는 별도 파일에서 관리
// @see src/lib/utils/styles.ts
