/**
 * @fileoverview Logger utility for error and information logging
 * 
 * 역할:
 * - 에러, 경고, 정보 로깅 제공
 * - 개발/프로덕션 환경별 로깅 동작 제어
 * - 향후 Sentry 등 외부 로깅 서비스 연동 준비
 * 
 * 사용 예시:
 * ```typescript
 * import { logError, logWarning, logInfo } from '@/lib/utils/logger';
 * 
 * try {
 *   // some code
 * } catch (error) {
 *   logError(error as Error, { component: 'DataUpload', action: 'validate' });
 * }
 * 
 * logWarning('File size exceeds recommended limit', { fileSize: 1024000 });
 * logInfo('User logged in successfully', { userId: '123' });
 * ```
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogContext {
    [key: string]: any;
}

/**
 * 개발 환경 여부 확인
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * 로그 메시지 포맷팅
 */
function formatLogMessage(message: string, context?: LogContext): string {
    if (!context || Object.keys(context).length === 0) {
        return message;
    }

    const contextStr = JSON.stringify(context, null, 2);
    return `${message}\nContext: ${contextStr}`;
}

/**
 * 에러 로깅
 * 
 * @param error - 로깅할 에러 객체
 * @param context - 추가 컨텍스트 정보 (선택사항)
 */
export function logError(error: Error, context?: LogContext): void {
    const message = formatLogMessage(error.message, context);

    if (isDevelopment) {
        console.error('❌ Error:', message);
        console.error('Stack:', error.stack);
    } else {
        // 프로덕션 환경에서는 외부 로깅 서비스로 전송
        // TODO: Sentry 등 외부 서비스 연동
        console.error('Error:', error.message);
    }
}

/**
 * 경고 로깅
 * 
 * @param message - 경고 메시지
 * @param context - 추가 컨텍스트 정보 (선택사항)
 */
export function logWarning(message: string, context?: LogContext): void {
    const formattedMessage = formatLogMessage(message, context);

    if (isDevelopment) {
        console.warn('⚠️ Warning:', formattedMessage);
    } else {
        // 프로덕션 환경에서는 필요시 외부 로깅 서비스로 전송
        console.warn('Warning:', message);
    }
}

/**
 * 정보 로깅
 * 
 * @param message - 정보 메시지
 * @param context - 추가 컨텍스트 정보 (선택사항)
 */
export function logInfo(message: string, context?: LogContext): void {
    if (isDevelopment) {
        const formattedMessage = formatLogMessage(message, context);
        console.info('ℹ️ Info:', formattedMessage);
    }
    // 프로덕션 환경에서는 info 로그를 출력하지 않음
}

/**
 * 디버그 로깅 (개발 환경에서만 동작)
 * 
 * @param message - 디버그 메시지
 * @param context - 추가 컨텍스트 정보 (선택사항)
 */
export function logDebug(message: string, context?: LogContext): void {
    if (isDevelopment) {
        const formattedMessage = formatLogMessage(message, context);
        console.debug('🔍 Debug:', formattedMessage);
    }
}

/**
 * 범용 로거 (레벨 지정 가능)
 * 
 * @param level - 로그 레벨
 * @param message - 로그 메시지 또는 에러 객체
 * @param context - 추가 컨텍스트 정보 (선택사항)
 */
export function log(level: LogLevel, message: string | Error, context?: LogContext): void {
    switch (level) {
        case 'error':
            if (message instanceof Error) {
                logError(message, context);
            } else {
                logError(new Error(message), context);
            }
            break;
        case 'warn':
            logWarning(message instanceof Error ? message.message : message, context);
            break;
        case 'info':
            logInfo(message instanceof Error ? message.message : message, context);
            break;
        case 'debug':
            logDebug(message instanceof Error ? message.message : message, context);
            break;
    }
}
