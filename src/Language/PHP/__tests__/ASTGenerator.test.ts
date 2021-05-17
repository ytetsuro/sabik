import { ASTGenerator } from '../ASTGenerator';
import { ASTNode } from '../ASTNode';

describe('ASTGenerator', () => {
  describe('.generate()', () => {
    it('should filePath to ASTNode.', () => {
      const astGenerator = new ASTGenerator();
      const actual = astGenerator.generate({
        fullPath: `${__dirname}/fixtures/example.php`,
        relativePath: `./fixtures/example.php`,
        extension: '.php'
      });

      expect(actual).toBeInstanceOf(ASTNode);
    });
  });
});
