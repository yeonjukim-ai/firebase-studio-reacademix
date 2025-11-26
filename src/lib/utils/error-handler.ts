/**
 * @fileoverview Unified error handling utilities
 * 
 * 역할:
 * - 일관된 에러 처리 및 메시지 변환
 * - 에러 타입 감지 및 분류
 * - 사용자 친화적인 에러 메시지 생성
 * 
 * 사용 예시:
 * ```typescript
 * import { handleError, getErrorMessage } from '@/lib/utils/error-handler';
 * 
 * try {
 *   await apiCall();
 * } catch (error) {
 *   const errorInfo = handleError(error);
 *   toast({
 *     title: errorInfo.title,
 *     description: errorInfo.message,
 *     variant: "destructive",
 *   });
 * }
 * ```
 */

import { logError } from './logger';

/**
 * 에러 정보 인터페이스
 */
export interface ErrorInfo {
    title: string;
    message: string;
    type: ErrorType;
    originalError?: Error;
}

/**
 * 에러 타입
 */
export enum ErrorType {
    NETWORK = 'network',
    FIREBASE = 'firebase',
    VALIDATION = 'validation',
    API = 'api',
    UNKNOWN = 'unknown',
}

/**
 * Firebase 에러 코드 매핑
 */
const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
    'auth/user-not-found': '사용자를 찾을 수 없습니다.',
    'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
    'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
    'auth/weak-password': '비밀번호가 너무 약합니다.',
    'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
    'auth/operation-not-allowed': '이 작업은 허용되지 않습니다.',
    'auth/account-exists-with-different-credential': '다른 로그인 방법으로 등록된 계정입니다.',
    'permission-denied': '권한이 없습니다.',
    'not-found': '요청한 데이터를 찾을 수 없습니다.',
    'already-exists': '이미 존재하는 데이터입니다.',
    'resource-exhausted': '요청 한도를 초과했습니다.',
    'unauthenticated': '인증이 필요합니다.',
};

/**
 * 네트워크 에러 여부 확인
 */
export function isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
        return (
            error.message.toLowerCase().includes('network') ||
            error.message.toLowerCase().includes('fetch') ||
            error.name === 'NetworkError'
        );
    }
    return false;
}

/**
 * Firebase 에러 여부 확인
 */
export function isFirebaseError(error: unknown): boolean {
    if (error && typeof error === 'object' && 'code' in error) {
        const code = (error as any).code;
        return typeof code === 'string' && (code.startsWith('auth/') || code.startsWith('firestore/'));
    }
    return false;
}

/**
 * API 에러 여부 확인
 */
export function isApiError(error: unknown): boolean {
    if (error && typeof error === 'object' && 'response' in error) {
        return true;
    }
    return false;
}

/**
 * 에러 타입 감지
 */
export function detectErrorType(error: unknown): ErrorType {
    if (isNetworkError(error)) {
        return ErrorType.NETWORK;
    }
    if (isFirebaseError(error)) {
        return ErrorType.FIREBASE;
    }
    if (isApiError(error)) {
        return ErrorType.API;
    }
    if (error instanceof Error && error.message.includes('validation')) {
        return ErrorType.VALIDATION;
    }
    return ErrorType.UNKNOWN;
}

/**
 * Firebase 에러 메시지 추출
 */
function getFirebaseErrorMessage(error: any): string {
    const code = error.code || '';
    return FIREBASE_ERROR_MESSAGES[code] || '알 수 없는 Firebase 에러가 발생했습니다.';
}

/**
 * 에러 메시지 추출
 */
export function getErrorMessage(error: unknown): string {
    // null 또는 undefined
    if (!error) {
        return '알 수 없는 에러가 발생했습니다.';
    }

    // Firebase 에러
    if (isFirebaseError(error)) {
        return getFirebaseErrorMessage(error);
    }

    // 네트워크 에러
    if (isNetworkError(error)) {
        return '네트워크 연결을 확인해주세요.';
    }

    // API 에러
    if (isApiError(error)) {
        const apiError = error as any;
        if (apiError.response?.data?.message) {
            return apiError.response.data.message;
        }
        if (apiError.response?.statusText) {
            return `서버 에러: ${apiError.response.statusText}`;
        }
        return 'API 요청 중 에러가 발생했습니다.';
    }

    // Error 객체
    if (error instanceof Error) {
        return error.message || '에러가 발생했습니다.';
    }

    // 문자열
    if (typeof error === 'string') {
        return error;
    }

    // 기타
    return '알 수 없는 에러가 발생했습니다.';
}

/**
 * 에러 타이틀 생성
 */
function getErrorTitle(type: ErrorType): string {
    switch (type) {
        case ErrorType.NETWORK:
            return '네트워크 에러';
        case ErrorType.FIREBASE:
            return 'Firebase 에러';
        case ErrorType.API:
            return 'API 에러';
        case ErrorType.VALIDATION:
            return '검증 에러';
        default:
            return '에러 발생';
    }
}

/**
 * 통합 에러 처리
 * 
 * @param error - 처리할 에러
 * @param context - 에러 컨텍스트 (로깅용)
 * @returns 에러 정보 객체
 */
export function handleError(error: unknown, context?: Record<string, any>): ErrorInfo {
    const type = detectErrorType(error);
    const message = getErrorMessage(error);
    const title = getErrorTitle(type);

    // 에러 로깅
    if (error instanceof Error) {
        logError(error, context);
    } else {
        logError(new Error(message), context);
    }

    return {
        title,
        message,
        type,
        originalError: error instanceof Error ? error : undefined,
    };
}

/**
 * 재시도 가능 여부 확인
 */
export function isRetryableError(error: unknown): boolean {
    const type = detectErrorType(error);
    return type === ErrorType.NETWORK || type === ErrorType.API;
}
