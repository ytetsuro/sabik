import { ASTGenerator } from '../ASTGenerator';
import { ASTNode } from '../ASTNode';

describe('ASTGenerator', () => {
  describe('.generate()', () => {
    it('should filePath to ASTNode.', () => {
      const astGenerator = new ASTGenerator();
      const actual = astGenerator.generate({
        fullPath: `${__dirname}/fixtures/example.ts`,
        relativePath: `./fixtures/example.ts`,
        extension: '.ts',
      });

      expect(actual).toBeInstanceOf(ASTNode);
    });
  });
});
