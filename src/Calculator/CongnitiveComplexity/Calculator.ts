import {ComplexityCountableNode} from './Adapter/ComplexityCountableNode'
import {Complexity} from './Complexity'
import {ComplexityStore} from './ComplexityStore'

export class Calculator {
  calculate(node: ComplexityCountableNode): ComplexityStore {
    const complexities = this.extractComplexity(node, 0)

    return new ComplexityStore(complexities)
  }

  private extractComplexity(node: ComplexityCountableNode, nest: number): Complexity[] {
    const result: Complexity[] = []

    if (node.isIncrement()) {
      result.push(new Complexity(node, nest))
    }

    if (node.isNestLevelUp()) {
      const incrementedNest = nest + 1
      return result.concat(...node.getChilds().map(row => this.extractComplexity(row, incrementedNest)).filter(row => row.length > 0))
    }

    return result.concat(...node.getChilds().map(row => this.extractComplexity(row, nest)))
  }
}
