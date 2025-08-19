import {describe, it, expect} from 'vitest';
import {calculateTipPerPerson, calculateTotalPerPerson} from './utils';

describe('Utility Functions', () => {
    describe('calculateTipPerPerson', () => {
        it('should calculate tip per person correctly', () => {
            expect(calculateTipPerPerson(100, 4)).toBe('25.00');
            expect(calculateTipPerPerson(50, 2)).toBe('25.00');
            expect(calculateTipPerPerson(75, 3)).toBe('25.00');
        });

        it('should handle decimal results correctly', () => {
            expect(calculateTipPerPerson(100, 3)).toBe('33.33');
            expect(calculateTipPerPerson(10, 3)).toBe('3.33');
            expect(calculateTipPerPerson(5, 2)).toBe('2.50');
        });

        it('should return 0.00 when percentTip is 0', () => {
            expect(calculateTipPerPerson(0, 4)).toBe('0.00');
            expect(calculateTipPerPerson(0, 1)).toBe('0.00');
        });

        it('should handle single person', () => {
            expect(calculateTipPerPerson(100, 1)).toBe('100.00');
            expect(calculateTipPerPerson(25, 1)).toBe('25.00');
        });
    });

    describe('calculateTotalPerPerson', () => {
        it('should calculate total per person correctly', () => {
            expect(calculateTotalPerPerson(100, 20, 4)).toBe('30.00'); // (100/4) + (20/4) = 25 + 5
            expect(calculateTotalPerPerson(200, 40, 2)).toBe('120.00'); // (200/2) + (40/2) = 100 + 20
        });

        it('should handle decimal results correctly', () => {
            expect(calculateTotalPerPerson(100, 10, 3)).toBe('36.67'); // (100/3) + (10/3) = 33.33 + 3.33
            expect(calculateTotalPerPerson(50, 15, 2)).toBe('32.50'); // (50/2) + (15/2) = 25 + 7.5
        });

        it('should handle zero tip', () => {
            expect(calculateTotalPerPerson(100, 0, 4)).toBe('25.00'); // (100/4) + (0/4) = 25 + 0
            expect(calculateTotalPerPerson(200, 0, 2)).toBe('100.00');
        });

        it('should handle single person', () => {
            expect(calculateTotalPerPerson(100, 20, 1)).toBe('120.00'); // (100/1) + (20/1) = 100 + 20
            expect(calculateTotalPerPerson(50, 10, 1)).toBe('60.00');
        });

        it('should handle zero bill amount', () => {
            expect(calculateTotalPerPerson(0, 20, 4)).toBe('5.00'); // (0/4) + (20/4) = 0 + 5
            expect(calculateTotalPerPerson(0, 0, 2)).toBe('0.00');
        });
    });
});
