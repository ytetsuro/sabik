import { ASTNode } from './Adapter/ASTNode';
import { CodePoint } from "./Metrics/CodePoint";
import { CodePointType } from './Metrics/CodePointType';

type AnalyzePointNode = {
    astNode: ASTNode,
    codePoints: CodePoint[],
};

export class ASTNodeExtractor {
    private cache: Map<ASTNode, Map<CodePointType, AnalyzePointNode[]>> = new Map();

    extractMethods(astNode: ASTNode): AnalyzePointNode[] {
        const cache = this.cache.get(astNode) ?? new Map();

        if (cache.has(CodePointType.Method)) {
            return cache.get(CodePointType.Method)!;
        }

        const analyzedPointNodes = this.generateMethodAnalyzePointNodes(astNode);
        
        cache.set(CodePointType.Method, analyzedPointNodes);
        this.cache.set(astNode, cache);

        return analyzedPointNodes;
    }

    clear() {
      this.cache.clear();
    }

    private generateMethodAnalyzePointNodes(astNode: ASTNode) {
        const classesNodes = this.extractClassNode(astNode);;
        const functionNodes = this.extractFunctionAndMethodNode(astNode);
        const fauxNodes = functionNodes.filter((row) => row.isFauxClass());
        const pureFunctionNodes = functionNodes.filter((row) => !row.isFauxClass());

        return [
            ...classesNodes.flatMap((row) => this.findMethodAll(row)),
            ...fauxNodes.flatMap((row) => this.findMethodAll(row)),
            ...pureFunctionNodes.map((row) => this.createAnalyzePointNode(row)),
        ];
    }

  private findMethodAll(astNode: ASTNode) {
    return [...astNode.getChildren()]
      .flatMap((row) => this.extractFunctionAndMethodNode(row))
      .map((row) => this.createAnalyzePointNode(row, [this.createCodePoint(astNode)]));
  }

  private createCodePoint(astNode: ASTNode) {
    return new CodePoint(
      CodePointType.castAs(astNode),
      astNode.getName(),
      astNode.getStartLineNumber(),
      astNode.getEndLineNumber(),
    )
  }

  private createAnalyzePointNode(astNode: ASTNode, codePoints: CodePoint[] = []): AnalyzePointNode {
      return {
          codePoints: codePoints.concat(this.createCodePoint(astNode)),
          astNode,
      };
  }

  private extractClassNode(astNode: ASTNode): ASTNode[] {
    const result: ASTNode[] = [];

    if (astNode.isFunction() || astNode.isMethod()) {
      return [];
    }
    if (astNode.isClass()) {
      return [astNode];
    }

    return result.concat(
      ...astNode
        .getChildren()
        .map((row) => this.extractClassNode(row))
    );
  }
  
  private extractFunctionAndMethodNode(astNode: ASTNode): ASTNode[] {
    const result: ASTNode[] = [];

    if (astNode.isFunction() || astNode.isMethod()) {
      return [astNode];
    }
    if (astNode.isClass()) {
      return [];
    }

    return result.concat(
      ...astNode
        .getChildren()
        .map((row) => this.extractFunctionAndMethodNode(row))
    );
  }
}