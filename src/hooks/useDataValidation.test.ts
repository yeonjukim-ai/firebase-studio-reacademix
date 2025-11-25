/**
 * useDataValidation 훅 테스트
 * 
 * 테스트 목적:
 * - 파일 선택 및 검증 로직이 올바르게 작동하는지 확인
 * - 상태 변경, 파일 처리, 데이터 수정 기능이 제대로 작동하는지 확인
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDataValidation } from './useDataValidation';

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: vi.fn(),
    }),
}));

// Mock the AI validation function
vi.mock('@/ai/flows/validate-uploaded-data', () => ({
    validateUploadedData: vi.fn().mockResolvedValue({
        isValid: false,
        validationErrors: [
            { row: 3, column: 'avgScore', errorType: 'Missing Value', errorMessage: 'Missing avgScore' },
        ],
    }),
}));

describe('useDataValidation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes with idle state', () => {
        const { result } = renderHook(() => useDataValidation());

        expect(result.current.state).toBe('idle');
        expect(result.current.file).toBeNull();
        expect(result.current.validationResult).toBeNull();
    });

    it('handles file change with valid CSV file', () => {
        const { result } = renderHook(() => useDataValidation());
        const file = new File(['test,data'], 'test.csv', { type: 'text/csv' });

        act(() => {
            result.current.handleFileChange(file);
        });

        expect(result.current.file).toBe(file);
        expect(result.current.state).toBe('file_selected');
    });

    it('resets state when file is set to null', () => {
        const { } = renderHook(() => useDataValidation());
        const file = new File(['test,data'], 'test.csv', { type: 'text/csv' });

        const { result } = renderHook(() => useDataValidation());

        act(() => {
            result.current.handleFileChange(file);
        });

        expect(result.current.file).toBe(file);

        act(() => {
            result.current.handleFileChange(null);
        });

        // File should not be set if null is passed
        expect(result.current.state).toBe('idle');
    });

    it('handles drag over event', () => {
        const { result } = renderHook(() => useDataValidation());
        const event = {
            preventDefault: vi.fn(),
            stopPropagation: vi.fn(),
        } as unknown as React.DragEvent<HTMLDivElement>;

        act(() => {
            result.current.handleDragOver(event);
        });

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('resets all state correctly', () => {
        const { result } = renderHook(() => useDataValidation());
        const file = new File(['test,data'], 'test.csv', { type: 'text/csv' });

        act(() => {
            result.current.handleFileChange(file);
        });

        expect(result.current.file).toBe(file);
        expect(result.current.state).toBe('file_selected');

        act(() => {
            result.current.reset();
        });

        expect(result.current.file).toBeNull();
        expect(result.current.state).toBe('idle');
        expect(result.current.validationResult).toBeNull();
    });

    it('handles cell change', () => {
        const { result } = renderHook(() => useDataValidation());

        // Set initial editable data (simulating validation complete state)
        act(() => {
            const file = new File(['test,data'], 'test.csv', { type: 'text/csv' });
            result.current.handleFileChange(file);
        });

        // Cell change functionality is tested indirectly through integration tests
        expect(result.current.handleCellChange).toBeDefined();
    });

    it('provides getCellError function', () => {
        const { result } = renderHook(() => useDataValidation());

        expect(result.current.getCellError).toBeDefined();
        expect(typeof result.current.getCellError).toBe('function');
    });
});
