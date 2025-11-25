/**
 * KpiCard 컴포넌트 테스트
 * 
 * 테스트 목적:
 * - KPI 데이터가 올바르게 렌더링되는지 확인
 * - increase/decrease 타입에 따라 올바른 아이콘과 색상이 표시되는지 확인
 * - 모든 props가 올바르게 전달되고 표시되는지 확인
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KpiCard } from './KpiCard';
import type { Kpi } from '@/lib/types';

describe('KpiCard', () => {
    const mockKpiIncrease: Kpi = {
        title: '총 등록생 수',
        value: '1,250',
        change: '+5.2%',
        changeType: 'increase',
    };

    const mockKpiDecrease: Kpi = {
        title: '평균 성적 변화',
        value: '+3.5점',
        change: '-0.5%',
        changeType: 'decrease',
    };

    it('renders KPI title correctly', () => {
        render(<KpiCard {...mockKpiIncrease} />);
        expect(screen.getByText('총 등록생 수')).toBeInTheDocument();
    });

    it('renders KPI value correctly', () => {
        render(<KpiCard {...mockKpiIncrease} />);
        expect(screen.getByText('1,250')).toBeInTheDocument();
    });

    it('renders change percentage correctly', () => {
        render(<KpiCard {...mockKpiIncrease} />);
        expect(screen.getByText(/\+5\.2% vs last month/)).toBeInTheDocument();
    });

    it('displays green color for increase type', () => {
        const { container } = render(<KpiCard {...mockKpiIncrease} />);
        const changeElement = screen.getByText(/\+5\.2% vs last month/);
        expect(changeElement).toHaveClass('text-green-600');
    });

    it('displays red color for decrease type', () => {
        const { container } = render(<KpiCard {...mockKpiDecrease} />);
        const changeElement = screen.getByText(/-0\.5% vs last month/);
        expect(changeElement).toHaveClass('text-red-600');
    });

    it('renders all props correctly for increase type', () => {
        render(<KpiCard {...mockKpiIncrease} />);

        expect(screen.getByText(mockKpiIncrease.title)).toBeInTheDocument();
        expect(screen.getByText(mockKpiIncrease.value)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(mockKpiIncrease.change))).toBeInTheDocument();
    });

    it('renders all props correctly for decrease type', () => {
        render(<KpiCard {...mockKpiDecrease} />);

        expect(screen.getByText(mockKpiDecrease.title)).toBeInTheDocument();
        expect(screen.getByText(mockKpiDecrease.value)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(mockKpiDecrease.change))).toBeInTheDocument();
    });

    it('applies group class for hover effects', () => {
        const { container } = render(<KpiCard {...mockKpiIncrease} />);
        const card = container.firstChild;
        expect(card).toHaveClass('group');
    });
});
