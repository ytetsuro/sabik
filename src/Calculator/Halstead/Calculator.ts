import {HalsteadCountableNode} from './Adapter/HalsteadCountableNode'
import {Halstead} from './Halstead'
import {OperandAndOperator} from './OperandAndOperator'

export class Calculator {
  calculate(node: HalsteadCountableNode): Halstead {
    const operands = new Map<string, number>()
    const operators = new Map<string, number>()

    this.extractOperandsAndOperators(node)
    .forEach(row => {
      this.add(row, operands, operators)
    })

    return new Halstead(new OperandAndOperator(operands, operators))
  }

  private extractOperandsAndOperators(node: HalsteadCountableNode) {
    let result: HalsteadCountableNode[] = []
    if (node.isOperand() || node.isOperator()) {
      result.push(node)
    }

    result = result.concat(...node.getChilds().map(row => this.extractOperandsAndOperators(row)))

    return result
  }

  private add(node: HalsteadCountableNode, operands: Map<string, number>, operators: Map<string, number>) {
    let map = operands
    if (node.isOperator()) {
      map = operators
    }

    map.set(node.getText(), (map.get(node.getText()) ?? 0) + 1)
  }
}
