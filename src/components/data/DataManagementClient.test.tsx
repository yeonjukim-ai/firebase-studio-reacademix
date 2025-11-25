/**
 * DataManagementClient 컴포넌트 테스트
 * 
 * 테스트 목적:
 * - 데이터 관리 컴포넌트가 올바르게 렌더링되는지 확인
 * - 섹션 타이틀과 설명이 표시되는지 확인
 * - 초기 상태에서 파일 업로드 UI가 표시되는지 확인
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataManagementClient } from './DataManagementClient';

describe('DataManagementClient', () => {
    it('renders section title', () => {
        render(<DataManagementClient />);
        expect(screen.getByText('데이터 연동 및 검증')).toBeInTheDocument();
    });

    it('renders section description', () => {
        render(<DataManagementClient />);
        expect(screen.getByText('학생 성적 및 정보 파일을 업로드하여 데이터를 시스템에 연동합니다.')).toBeInTheDocument();
    });

    it('renders upload area text', () => {
        render(<DataManagementClient />);
        expect(screen.getByText('드래그 앤 드롭 또는 클릭하여 파일 업로드')).toBeInTheDocument();
    });

    it('renders supported file types text', () => {
        render(<DataManagementClient />);
        expect(screen.getByText('지원 파일 형식: Excel, CSV')).toBeInTheDocument();
    });

    it('component renders without crashing', () => {
        const { container } = render(<DataManagementClient />);
        expect(container).toBeInTheDocument();
    });
});
