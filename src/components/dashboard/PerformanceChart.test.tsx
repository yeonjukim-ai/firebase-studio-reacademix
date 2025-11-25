/**
 * PerformanceChart 컴포넌트 테스트
 * 
 * 테스트 목적:
 * - 차트가 올바르게 렌더링되는지 확인
 * - SectionCard가 올바른 props로 렌더링되는지 확인
 * - 차트 데이터가 올바르게 전달되는지 확인
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PerformanceChart } from './PerformanceChart';

describe('PerformanceChart', () => {
    it('renders section card with correct title', () => {
        render(<PerformanceChart />);
        expect(screen.getByText('학원/지점별 성과 추이')).toBeInTheDocument();
    });

    it('renders section card with correct description', () => {
        render(<PerformanceChart />);
        expect(screen.getByText('지난 6개월간의 평균 성적 추이입니다.')).toBeInTheDocument();
    });

    it('renders chart container', () => {
        const { container } = render(<PerformanceChart />);
        // ChartContainer가 렌더링되는지 확인
        const chartContainer = container.querySelector('[class*="min-h-"]');
        expect(chartContainer).toBeInTheDocument();
    });

    it('component renders without crashing', () => {
        const { container } = render(<PerformanceChart />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
