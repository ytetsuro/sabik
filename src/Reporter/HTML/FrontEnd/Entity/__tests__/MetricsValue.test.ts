import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';

describe('MetricsValue', () => {
    describe('.valueOf()', () => {
        it('should be rounded if there are two or more decimal places.', () => {
            const actual = new MetricsValue(MetricsType.Maintainability, 23.212);

            expect(Number(actual)).toBe(23.21);
        });
    });

    describe('.toString()', () => {
        it('should return a readable number.', () => {
            const actual = new MetricsValue(MetricsType.BugsDelivered, 10223.212);

            expect(String(actual)).toBe('10,223.21');
        });
    });

    describe('.getLevel()', () => {
        it('should return level.', () => {
            const actual = new MetricsValue(MetricsType.BugsDelivered, 10223.212);

            expect(actual.getLevel()).toBe(2);
        });
    });
});