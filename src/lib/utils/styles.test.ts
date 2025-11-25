/**
 * @/lib/utils/styles 테스트
 * 
 * 테스트 목적:
 * - 스타일 유틸리티 함수들이 올바르게 작동하는지 확인
 */

import { describe, it, expect } from 'vitest';
import { cn, conditionalClass } from './styles';

describe('utils/styles', () => {
    describe('cn', () => {
        it('merges class names correctly', () => {
            const result = cn('class1', 'class2');
            expect(result).toBe('class1 class2');
        });

        it('handles Tailwind class conflicts', () => {
            const result = cn('p-4', 'p-8');
            expect(result).toBe('p-8');
        });
    });

    describe('conditionalClass', () => {
        it('returns true class when condition is true', () => {
            const result = conditionalClass(true, 'truthy', 'falsy');
            expect(result).toBe('truthy');
        });

        it('returns false class when condition is false', () => {
            const result = conditionalClass(false, 'truthy', 'falsy');
            expect(result).toBe('falsy');
        });

        it('returns empty string when condition is false and no false class is provided', () => {
            const result = conditionalClass(false, 'truthy');
            expect(result).toBe('');
        });

        it('works with boolean expressions', () => {
            const isActive = true;
            const result = conditionalClass(isActive, 'bg-blue-500', 'bg-gray-500');
            expect(result).toBe('bg-blue-500');
        });
    });

    // Test that style constants are defined and are strings
    describe('style constants', () => {
        it('exports heading styles', async () => {
            const styles = await import('./styles');
            expect(typeof styles.heading1).toBe('string');
            expect(typeof styles.heading2).toBe('string');
            expect(typeof styles.heading3).toBe('string');
            expect(typeof styles.heading4).toBe('string');
        });

        it('exports body styles', async () => {
            const styles = await import('./styles');
            expect(typeof styles.body).toBe('string');
            expect(typeof styles.bodySmall).toBe('string');
            expect(typeof styles.caption).toBe('string');
        });

        it('exports layout styles', async () => {
            const styles = await import('./styles');
            expect(typeof styles.gridKpi).toBe('string');
            expect(typeof styles.flexRow).toBe('string');
            expect(typeof styles.flexCol).toBe('string');
        });

        it('exports card styles', async () => {
            const styles = await import('./styles');
            expect(typeof styles.cardBase).toBe('string');
            expect(typeof styles.cardInteractive).toBe('string');
            expect(typeof styles.cardHighlight).toBe('string');
        });

        it('exports hover effects', async () => {
            const styles = await import('./styles');
            expect(typeof styles.hoverSmooth).toBe('string');
            expect(typeof styles.hoverBg).toBe('string');
            expect(typeof styles.hoverScale).toBe('string');
        });
    });
});
