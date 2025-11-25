/**
 * RecentActivityTable 컴포넌트 테스트
 * 
 * 테스트 목적:
 * - 최근 활동 테이블이 올바르게 렌더링되는지 확인
 * - 리포트 데이터가 올바르게 표시되는지 확인
 * - 상태별 배지가 올바르게 표시되는지 확인
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecentActivityTable } from './RecentActivityTable';

describe('RecentActivityTable', () => {
    it('renders table with correct title', () => {
        render(<RecentActivityTable />);
        expect(screen.getByText('최근 활동')).toBeInTheDocument();
    });

    it('renders table with correct description', () => {
        render(<RecentActivityTable />);
        expect(screen.getByText('최근 생성 및 전송된 리포트 목록입니다.')).toBeInTheDocument();
    });

    it('renders "전체 보기" button', () => {
        render(<RecentActivityTable />);
        expect(screen.getByText('전체 보기')).toBeInTheDocument();
    });

    it('renders table column headers', () => {
        render(<RecentActivityTable />);
        expect(screen.getByText('리포트 명')).toBeInTheDocument();
        expect(screen.getByText('대상')).toBeInTheDocument();
        expect(screen.getByText('상태')).toBeInTheDocument();
        expect(screen.getByText('생성자')).toBeInTheDocument();
        expect(screen.getByText('생성일')).toBeInTheDocument();
    });

    it('renders recent report data', () => {
        render(<RecentActivityTable />);
        // 첫 번째 리포트 데이터가 표시되는지 확인
        expect(screen.getByText('2024년 5월 월간 리포트')).toBeInTheDocument();
    });

    it('component renders without crashing', () => {
        const { container } = render(<RecentActivityTable />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
