/**
 * useStudentFilter 훅 테스트
 * 
 * 테스트 목적:
 * - 학생 필터링 로직이 올바르게 작동하는지 확인
 * - 검색어, 상태 필터, 지점 필터가 제대로 작동하는지 확인
 * - 필터링된 결과가 정확한지 검증
 */

import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStudentFilter } from './useStudentFilter';
import type { Student } from '@/lib/types';

const mockStudents: Student[] = [
    {
        id: 'S001',
        name: '김민준',
        class: 'A반',
        status: 'active',
        registrationDate: '2023-03-15',
        lastReportDate: '2024-05-30',
        avgScore: 88,
        attendance: 95,
        branch: '강남점'
    },
    {
        id: 'S002',
        name: '이서연',
        class: 'B반',
        status: 'active',
        registrationDate: '2023-04-01',
        lastReportDate: '2024-05-30',
        avgScore: 92,
        attendance: 98,
        branch: '서초점'
    },
    {
        id: 'S003',
        name: '박지훈',
        class: 'A반',
        status: 'inactive',
        registrationDate: '2023-03-20',
        lastReportDate: '2024-04-28',
        avgScore: 76,
        attendance: 85,
        branch: '강남점'
    },
];

describe('useStudentFilter', () => {
    it('initializes with all students', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));
        expect(result.current.filteredStudents).toHaveLength(3);
    });

    it('filters students by search term (name)', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleSearchChange('김민준');
        });

        expect(result.current.filteredStudents).toHaveLength(1);
        expect(result.current.filteredStudents[0].name).toBe('김민준');
    });

    it('filters students by search term (class)', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleSearchChange('A반');
        });

        expect(result.current.filteredStudents).toHaveLength(2);
    });

    it('filters students by search term (ID)', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleSearchChange('S002');
        });

        expect(result.current.filteredStudents).toHaveLength(1);
        expect(result.current.filteredStudents[0].id).toBe('S002');
    });

    it('filters students by status', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleStatusChange('inactive');
        });

        expect(result.current.filteredStudents).toHaveLength(1);
        expect(result.current.filteredStudents[0].status).toBe('inactive');
    });

    it('filters students by branch', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleBranchChange('강남점');
        });

        expect(result.current.filteredStudents).toHaveLength(2);
    });

    it('combines multiple filters', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleSearchChange('A반');
            result.current.handleStatusChange('active');
        });

        expect(result.current.filteredStudents).toHaveLength(1);
        expect(result.current.filteredStudents[0].name).toBe('김민준');
    });

    it('resets all filters', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));

        act(() => {
            result.current.handleSearchChange('김민준');
            result.current.handleStatusChange('active');
            result.current.handleBranchChange('강남점');
        });

        expect(result.current.filteredStudents).toHaveLength(1);

        act(() => {
            result.current.resetFilters();
        });

        expect(result.current.searchTerm).toBe('');
        expect(result.current.statusFilter).toHaveLength(0);
        expect(result.current.branchFilter).toHaveLength(0);
        expect(result.current.filteredStudents).toHaveLength(3);
    });

    it('returns unique branches', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));
        expect(result.current.uniqueBranches).toEqual(['강남점', '서초점']);
    });

    it('returns unique statuses', () => {
        const { result } = renderHook(() => useStudentFilter(mockStudents));
        expect(result.current.uniqueStatuses).toEqual(['active', 'inactive']);
    });
});
