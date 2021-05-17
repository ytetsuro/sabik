import { Analyzer } from '../../../Analyzer/Analyzer';
import { getDouble } from '../../../TestHelpers/getDouble';
import {TypeScript} from '../../Language/TypeScript';

describe('LanguageAnalyzer', () => {
  describe('analyze()', () => {
    it('should be analyzed for TypeScript file.', () => {
        const mock = <Analyzer>getDouble(Analyzer, {
            analyze: () => [],
        });
        const analyzer = new TypeScript(mock);

        analyzer.analyze([
            {
                fullPath: '/tmp/example1.ts',
                relativePath: 'example1.ts',
                extension: '.ts',
            },
            {
                fullPath: '/tmp/example2.php',
                relativePath: 'example2.php',
                extension: '.php',
            },
            {
                fullPath: '/tmp/example3.ts',
                relativePath: 'example3.ts',
                extension: '.ts',
            },
        ]);

        expect((<any>mock.analyze).mock.calls[0][0]).toStrictEqual([
            {
                fullPath: '/tmp/example1.ts',
                relativePath: 'example1.ts',
                extension: '.ts',
            },
            {
                fullPath: '/tmp/example3.ts',
                relativePath: 'example3.ts',
                extension: '.ts',
            },
        ])
    });
  });
});