import { ASTGenerator } from '../ASTGenerator';
import { ASTNode } from '../ASTNode';

describe('ASTGenerator', () => {
  describe('.generate()', () => {
    it('should filePath to ASTNode.', () => {
      const astGenerator = new ASTGenerator();
      const actual = astGenerator.generate(`${__dirname}/fixtures/example.php`);

      expect(actual).toBeInstanceOf(ASTNode);
    });
  });
});
