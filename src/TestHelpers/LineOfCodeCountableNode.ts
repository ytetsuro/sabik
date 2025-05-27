import { ASTNode } from './ASTNode'; // Assuming a mock ASTNode exists or can be added if needed.
                                     // For now, we'll use a simple mock placeholder.

// A simple placeholder for ASTNode if not already defined in TestHelpers
class MockASTNode {
  constructor(public source: string = '') {}
  // Add any methods if LineOfCodeCountableNode's actual implementations use them.
  // For now, this is minimal.
}

export class LineOfCodeCountableNode {
  public statementsToCount: number = 0; // Default, can be set by test
  public mockAstNode: ASTNode;

  constructor(private text: string, statements?: number) {
    if (statements !== undefined) {
      this.statementsToCount = statements;
    }
    // Initialize astNode with a default or passed-in mock.
    // The actual tests for Calculator.ts will mock the converter to return this,
    // so the exact astNode content might not be critical unless countStatements needs it.
    this.mockAstNode = new MockASTNode(text) as ASTNode; // Cast, assuming ASTNode is more complex
  }

  // Getter to satisfy LineOfCodeCountableNodeInterface
  get astNode(): ASTNode {
    return this.mockAstNode;
  }

  getText(): string {
    return this.text;
  }

  getRemovedCommentAndEmptyLineText(): string {
    // This logic might not be perfectly identical to the main one but is a test mock.
    return this.text
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '') // Remove comments
      .split('\n')
      .filter(line => line.trim() !== '') // Remove empty lines
      .join('\n');
  }

  countStatements(): number {
    // This will be set by the test case to mock the real counting behavior.
    return this.statementsToCount;
  }
}
