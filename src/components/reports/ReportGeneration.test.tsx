/**
 * ReportGeneration 컴포넌트 테스트
 * 
 * 테스트 목적:
 * - 리포트 생성 폼이 올바르게 렌더링되는지 확인
 * - 섹션 타이틀과 설명이 표시되는지 확인
 * - 초기 상태에서 적절한 폼 요소들이 렌더링되는지 확인
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReportGeneration } from './ReportGeneration';

describe('ReportGeneration', () => {
    it('renders section title', () => {
        render(<ReportGeneration />);
        expect(screen.getByText('리포트 생성')).toBeInTheDocument();
    });

    it('renders section description', () => {
        render(<ReportGeneration />);
        expect(screen.getByText('리포트 템플릿, 대상, 기간을 선택하여 맞춤형 성과 리포트를 생성합니다.')).toBeInTheDocument();
    });

    it('renders template label', () => {
        render(<ReportGeneration />);
        expect(screen.getByText('리포트 템플릿')).toBeInTheDocument();
    });

    it('renders target label', () => {
        render(<ReportGeneration />);
        expect(screen.getByText('리포트 대상')).toBeInTheDocument();
    });

    it('renders period label', () => {
        render(<ReportGeneration />);
        expect(screen.getByText('리포트 기간')).toBeInTheDocument();
    });

    it('renders generate button', () => {
        render(<ReportGeneration />);
        expect(screen.getByText('리포트 생성 시작')).toBeInTheDocument();
    });

    it('component renders without crashing', () => {
        const { container } = render(<ReportGeneration />);
        expect(container).toBeInTheDocument();
    });
});
