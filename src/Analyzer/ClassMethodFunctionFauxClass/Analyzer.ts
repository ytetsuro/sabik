import {ASTNode} from '../Adapter/ASTNode'
import {Analyzer as AnalyzerInterface} from '../Adapter/Analyzer'
import {CodeStructure} from './CodeStructure'
import {CodeMetrics} from './CodeMetrics'
import {CodeStructureType} from './CodeStructureType'
import {ResultFactory} from './ResultFactory'

export class Analyzer<T, K> {
  constructor(
        private analyzer: AnalyzerInterface<T>,
        private resultFactory: ResultFactory<T, K>) {
  }

  analyze(rootASTNode: ASTNode): K {
    const result: CodeMetrics<T>[] = []
    const classesNodes = rootASTNode.getChilds().filter(row => row.isClass())
    const functionNodes = this.extractFunctionNode(rootASTNode)
    const fauxNodes = functionNodes.filter(row => row.isFauxClass())
    const pureFunctionNodes = functionNodes.filter(row => !row.isFauxClass())

    result.push(...classesNodes.flatMap(row => this.createClass(row)))
    result.push(...fauxNodes.flatMap(row => this.createFauxClass(row)))
    result.push(...pureFunctionNodes.map(row => this.createMethod(row)))

    return this.resultFactory.create(result)
  }

  private createFauxClass(astNode: ASTNode) {
    return this.findMethodAll(astNode, CodeStructureType.FAUX_CLASS);
  }

  private createClass(astNode: ASTNode) {
    return this.findMethodAll(astNode, CodeStructureType.CLASS);
  }

  private findMethodAll(astNode: ASTNode, structure: CodeStructureType) {
    const codeStructures = [{
      name: astNode.getName(),
      type: structure,
      startLineNumber: astNode.getStartLineNumber(),
      endLineNumber: astNode.getEndLineNumber()
    }]

    return astNode.getChilds().filter(row => row.isFunction() || row.isMethod()).map(row => this.createMethod(row, codeStructures))
  }

  private createMethod(astNode: ASTNode, codeStructures: CodeStructure[] = []) {
    const currentCodeStructures = codeStructures.slice()

    currentCodeStructures.push({
      name: astNode.getName(),
      type: CodeStructureType.METHOD,
      startLineNumber: astNode.getStartLineNumber(),
      endLineNumber: astNode.getEndLineNumber()})

    return new CodeMetrics(currentCodeStructures, this.analyzer.analyze(astNode))
  }

  private extractFunctionNode(astNode: ASTNode): ASTNode[] {
    const result: ASTNode[] = []

    if (astNode.isFunction()) {
      return [astNode]
    } if (astNode.isClass()) {
      return []
    }

    return result.concat(...astNode.getChilds().map(row => this.extractFunctionNode(row)))
  }
}
