/**
 * useReportGeneration 훅  테스트
 * 
 * 테스트 목적:
 * - 리포트 생성 상태 관리가 올바르게 작동하는지 확인
 * - 날짜 설정, 상태 변경, 리셋 기능이 제대로 작동하는지 확인
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReportGeneration } from './useReportGeneration';

describe('useReportGeneration', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('initializes with idle state', () => {
        const { result } = renderHook(() => useReportGeneration());

        expect(result.current.generationState).toBe('idle');
        expect(result.current.progress).toBe(0);
        expect(result.current.date).toBeUndefined();
    });

    it('sets date correctly', () => {
        const { result } = renderHook(() => useReportGeneration());
        const testDate = { from: new Date(2024, 0, 1), to: new Date(2024, 0, 31) };

        act(() => {
            result.current.setDate(testDate);
        });

        expect(result.current.date).toEqual(testDate);
    });

    it('changes state to generating when handleGenerate is called', () => {
        const { result } = renderHook(() => useReportGeneration());

        act(() => {
            result.current.handleGenerate();
        });

        expect(result.current.generationState).toBe('generating');
        expect(result.current.progress).toBeGreaterThanOrEqual(0);
    });

    it('updates progress during generation', () => {
        const { result } = renderHook(() => useReportGeneration());

        act(() => {
            result.current.handleGenerate();
        });

        expect(result.current.progress).toBe(0);

        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Progress should have increased
        expect(result.current.progress).toBeGreaterThan(0);
    });

    it('resets state correctly', () => {
        const { result } = renderHook(() => useReportGeneration());
        const testDate = { from: new Date(2024, 0, 1), to: new Date(2024, 0, 31) };

        act(() => {
            result.current.setDate(testDate);
            result.current.handleGenerate();
        });

        act(() => {
            result.current.resetState();
        });

        expect(result.current.generationState).toBe('idle');
        expect(result.current.progress).toBe(0);
        expect(result.current.date).toBeUndefined();
    });

    it('completes generation after timeout', () => {
        const { result } = renderHook(() => useReportGeneration());

        act(() => {
            result.current.handleGenerate();
        });

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(result.current.progress).toBe(100);
        expect(['completed', 'failed']).toContain(result.current.generationState);
    });
});
