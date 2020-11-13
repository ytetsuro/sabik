export class OperandAndOperator {
    public readonly operands: Map<string, number>;

    public readonly operators: Map<string, number>;

    constructor(operands: Map<string, number>, operators: Map<string, number>) {
      this.operands = operands
      this.operators = operators
    }

    getUniqueOperatorCount() {
      return this.operators.size
    }

    getUniqueOperandCount() {
      return this.operands.size
    }

    getTotalOperatorCount() {
      return [...this.operators.values()].reduce((prev, next) => prev + next, 0)
    }

    getTotalOperandCount() {
      return [...this.operands.values()].reduce((prev, next) => prev + next, 0)
    }
}
