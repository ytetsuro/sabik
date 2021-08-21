import { ASTNodeExtractor } from '../ASTNodeExtractor';
import { ASTNode } from '../../TestHelpers/ASTNode';
import { CodePointType } from '../Metrics/CodePointType';
import { CodePoint } from '../Metrics/CodePoint';

describe('ASTNodeExtractor class', () => {
  let analyzer: ASTNodeExtractor = new ASTNodeExtractor();

  describe('should returns extracted method astNode.', () => {
    it('should return has two method astNode and codePoint when two method in one class node.', () => {
      const dummyNode = new ASTNode(':root:0:0', {
        'C:DummyClass:0:20': {
          'M:dummyMethod1:1:9': {},
          'M:dummyMethod2:12:19': {},
        },
      });

      const actual = analyzer.extractMethods(dummyNode);
      expect(actual).toStrictEqual([
        {
          astNode: new ASTNode('M:dummyMethod1:1:9', {}),
          codePoints: [
            new CodePoint(CodePointType.Class, 'DummyClass', 0, 20),
            new CodePoint(CodePointType.Method, 'dummyMethod1', 1, 9),
          ],
        },
        {
          astNode: new ASTNode('M:dummyMethod2:12:19', {}),
          codePoints: [
            new CodePoint(CodePointType.Class, 'DummyClass', 0, 20),
            new CodePoint(CodePointType.Method, 'dummyMethod2', 12, 19),
          ],
        },
      ]);
    });

    it('should return has two method astNode and codePoint when two method in one faux class node.', () => {
      const dummyNode = new ASTNode(':root:0:0', {
        'D:FauxClass:0:20': {
          'F:dummyFauxMethod1:1:9': {},
          'F:dummyFauxMethod2:10:19': {},
        },
      });

      const actual = analyzer.extractMethods(dummyNode);
      expect(actual).toStrictEqual([
        {
          astNode: new ASTNode('F:dummyFauxMethod1:1:9', {}),
          codePoints: [
            new CodePoint(CodePointType.FauxClass, 'FauxClass', 0, 20),
            new CodePoint(CodePointType.Method, 'dummyFauxMethod1', 1, 9),
          ],
        },
        {
          astNode: new ASTNode('F:dummyFauxMethod2:10:19', {}),
          codePoints: [
            new CodePoint(CodePointType.FauxClass, 'FauxClass', 0, 20),
            new CodePoint(CodePointType.Method, 'dummyFauxMethod2', 10, 19),
          ],
        },
      ]);
    });

    it('should return has two method astNode and codePoint when two function node.', () => {
      const dummyNode = new ASTNode(':root:0:0', {
        'F:dummyFunction1:0:5': {},
        'F:dummyFunction2:6:8': {},
      });

      const actual = analyzer.extractMethods(dummyNode);
      expect(actual).toStrictEqual([
        {
          astNode: new ASTNode('F:dummyFunction1:0:5', {}),
          codePoints: [new CodePoint(CodePointType.Method, 'dummyFunction1', 0, 5)],
        },
        {
          astNode: new ASTNode('F:dummyFunction2:6:8', {}),
          codePoints: [new CodePoint(CodePointType.Method, 'dummyFunction2', 6, 8)],
        },
      ]);
    });
  });
});
