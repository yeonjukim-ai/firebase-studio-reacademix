/**
 * @/lib/utils 테스트
 * 
 * 테스트 목적:
 * - cn 함수가 클래스 병합을 올바르게 수행하는지 확인
 */

import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
    describe('cn', () => {
        it('merges class names correctly', () => {
            const result = cn('class1', 'class2');
            expect(result).toBe('class1 class2');
        });

        it('handles conditional classes', () => {
            const result = cn('base', true && 'conditional', false && 'hidden');
            expect(result).toBe('base conditional');
        });

        it('handles Tailwind class conflicts', () => {
            const result = cn('p-4', 'p-8');
            // twMerge should resolve conflicts, keeping the last one
            expect(result).toBe('p-8');
        });

        it('handles empty inputs', () => {
            const result = cn();
            expect(result).toBe('');
        });

        it('handles undefined and null values', () => {
            const result = cn('class1', undefined, null, 'class2');
            expect(result).toBe('class1 class2');
        });

        it('handles array inputs', () => {
            const result = cn(['class1', 'class2']);
            expect(result).toBe('class1 class2');
        });

        it('handles object inputs', () => {
            const result = cn({ class1: true, class2: false, class3: true });
            expect(result).toBe('class1 class3');
        });

        it('merges complex Tailwind classes correctly', () => {
            const base = 'text-sm text-gray-500';
            const override = 'text-lg text-blue-600';
            const result = cn(base, override);
            // Should keep only the latest text-* classes
            expect(result).toBe('text-lg text-blue-600');
        });
    });
});
