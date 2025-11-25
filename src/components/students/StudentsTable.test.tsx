/**
 * StudentsTable 컴포넌트 테스트
 * 
 * 테스트 목적:
 * - 학생 테이블이 올바르게 렌더링되는지 확인
 * - 검색 입력이 표시되는지 확인
 * - 필터 버튼이 표시되는지 확인
 * - 학생 데이터가 올바르게 표시되는지 확인
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StudentsTable } from './StudentsTable';

describe('StudentsTable', () => {
    it('renders search input', () => {
        render(<StudentsTable />);
        const searchInput = screen.getByPlaceholderText('학생 이름, 반, ID로 검색...');
        expect(searchInput).toBeInTheDocument();
    });

    it('renders filter button', () => {
        render(<StudentsTable />);
        const filterButton = screen.getByText('필터');
        expect(filterButton).toBeInTheDocument();
    });

    it('renders table headers', () => {
        render(<StudentsTable />);
        expect(screen.getByText('이름')).toBeInTheDocument();
        expect(screen.getByText('지점')).toBeInTheDocument();
        expect(screen.getByText('반')).toBeInTheDocument();
        expect(screen.getByText('상태')).toBeInTheDocument();
        expect(screen.getByText('등록일')).toBeInTheDocument();
        expect(screen.getByText('최종 리포트일')).toBeInTheDocument();
    });

    it('renders student data', () => {
        render(<StudentsTable />);
        // dummy-data에서 첫 번째 학생 데이터 확인
        expect(screen.getByText('김민준')).toBeInTheDocument();
        expect(screen.getByText('이서연')).toBeInTheDocument();
    });

    it('component renders without crashing', () => {
        const { container } = render(<StudentsTable />);
        expect(container).toBeInTheDocument();
    });
});
