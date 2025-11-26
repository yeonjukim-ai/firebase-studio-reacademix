/**
 * @fileoverview ErrorBoundary 컴포넌트
 * 
 * 역할:
 * - React 컴포넌트 트리에서 발생하는 에러를 포착
 * - 에러 발생 시 사용자 친화적인 UI 표시
 * - 에러 로깅 및 리포팅
 * - 애플리케이션 리셋 기능 제공
 * 
 * 사용 예시:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { logError } from '@/lib/utils/logger';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary 클래스 컴포넌트
 * 
 * React의 Error Boundary는 클래스 컴포넌트로만 구현 가능
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // 에러가 발생하면 상태를 업데이트하여 fallback UI를 렌더링
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // 에러 로깅
        logError(error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: 'ErrorBoundary',
        });

        // 부모 컴포넌트에 에러 전달 (있는 경우)
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // 커스텀 fallback이 제공된 경우
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // 기본 에러 UI
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-w-md w-full space-y-4">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>문제가 발생했습니다</AlertTitle>
                            <AlertDescription>
                                {this.state.error?.message || '알 수 없는 에러가 발생했습니다.'}
                            </AlertDescription>
                        </Alert>

                        <div className="flex flex-col gap-2">
                            <Button onClick={this.handleReset} className="w-full">
                                다시 시도
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                                className="w-full"
                            >
                                홈으로 이동
                            </Button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 p-4 bg-muted rounded-lg">
                                <summary className="cursor-pointer font-medium">
                                    에러 상세 정보 (개발 모드)
                                </summary>
                                <pre className="mt-2 text-xs overflow-auto">
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * 함수형 컴포넌트 스타일로 ErrorBoundary 사용하기 위한 래퍼
 */
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: ReactNode
): React.FC<P> {
    return function WithErrorBoundary(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
