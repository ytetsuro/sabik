import { basename, dirname } from 'path';
import { LineOfCode } from '../../../../Calculator/LineOfCode/LineOfCode';
import { Analyzed } from '../../../../Sabik/Analyzer/Analyzed';
import { Event } from "../Event";

describe('Event', () => {
    describe('build', () => {
        it('should create html.', async () => {
            const writerMock = {write: jest.fn((_, __) => Promise.resolve())};
            const builder = new Event(<any>writerMock, dirname(__filename));

            await builder.build([new Analyzed(basename(__filename), [], new LineOfCode(2, 1))]);

            expect(writerMock.write.mock.calls.length).toBe(2);
            expect(writerMock.write.mock.calls[0][0]).toBe('event/analyzed.js');
            expect(writerMock.write.mock.calls[1][0]).toBe(`event/sourceCode/${basename(__filename)}.js`);
        })
    })
});