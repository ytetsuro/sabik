import { Reporter } from "../Reporter";

describe('Reporter', () => {
    describe('.output()', () => {
        it('should output html report.', async () => {
            const builderMock = {build: jest.fn((_) => Promise.resolve())};
            const reporter = new Reporter([builderMock], '');

            await reporter.output([]);

            expect(builderMock.build.mock.calls[0][0]).toStrictEqual([]); 
        })
    })
});