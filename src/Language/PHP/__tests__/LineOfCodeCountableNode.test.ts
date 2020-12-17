import Engine from 'php-parser';
import { ASTNode } from '../ASTNode';
import { LineOfCodeCountableNode } from '../LineOfCodeCountableNode';

describe('LineOfCodeCountableNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    },
    lexer: {
      all_tokens: true
    }
  });
  const source = `<?php
    /**
     * Class Comment.
     **/
    class A {
      /**
       * MultiLine Comment.
       **/
      function hasCommentMethod() {
        // inline comment.
        return 1;
        // this is end comment.
      }

      function hasNotCommentMethod() {
        $hearDocument = <<<EOT
        /** this is Not Comment **/
        EOT;

        return $hearDocument;
      }
    }`;
  const parent = engine.parseCode(source);

  describe('getText()', () => {
    it('should get full text.', () => {
      const actual = new LineOfCodeCountableNode(new ASTNode(parent, parent));

      expect(actual.getText()).toBe(source);
    });
  });

  describe('getRemovedCommentAndEmptyLineText()', () => {
    it('should get strip empty line text.', () => {
      const actual = new LineOfCodeCountableNode(new ASTNode(parent, parent));

      expect(actual.getRemovedCommentAndEmptyLineText())
        .toBe(`<?php
    class A {
      function hasCommentMethod() {
                return 1;
              }
      function hasNotCommentMethod() {
        $hearDocument = <<<EOT
        /** this is Not Comment **/
        EOT;
        return $hearDocument;
      }
    }`);
    });
  });
});