import {File} from '../File';

describe('File', () => {
    describe('get extension()', () => {
        it('should get extension.', () => {
            const file = new File('/foo/bar/baz.ts', 'bar/bax.ts');

            expect(file.extension).toBe('.ts');
        });

        it('should get empty string when filename has not extension.', () => {
            const file = new File('/foo/bar/baz', 'bar/bax');

            expect(file.extension).toBe('');
        })
    });
});