import { HalsteadCountableNode } from './Adapter/HalsteadCountableNode';
import { OperandAndOperator } from './OperandAndOperator';
import { HalsteadBugsDelivered } from './MetricsValue/HalsteadBugsDelivered';
import { HalsteadDifficulty } from './MetricsValue/HalsteadDifficulty';
import { HalsteadEffort } from './MetricsValue/HalsteadEffort';
import { HalsteadLength } from './MetricsValue/HalsteadLength';
import { HalsteadTime } from './MetricsValue/HalsteadTime';
import { HalsteadVocabulary } from './MetricsValue/HalsteadVocabulary';
import { HalsteadVolume } from './MetricsValue/HalsteadVolume';

export class Calculator {
  calculate(node: HalsteadCountableNode) {
    const operands = new Map<string, number>();
    const operators = new Map<string, number>();

    this.extractOperandsAndOperators(node).forEach((row) => {
      this.add(row, operands, operators);
    });

    const operandAndOperator = new OperandAndOperator(operands, operators);
    const length = new HalsteadLength(operandAndOperator);
    const vocabulary = new HalsteadVocabulary(operandAndOperator);
    const difficulty = new HalsteadDifficulty(operandAndOperator);
    const volume = new HalsteadVolume(length, vocabulary);
    const bugsDelivered = new HalsteadBugsDelivered(volume);
    const effort = new HalsteadEffort(volume, difficulty);
    const time = new HalsteadTime(effort);

    return [length, vocabulary, difficulty, volume, bugsDelivered, effort, time];
  }

  private extractOperandsAndOperators(node: HalsteadCountableNode) {
    let result: HalsteadCountableNode[] = [];
    if (node.isOperand() || node.isOperator()) {
      result.push(node);
    }

    result = result.concat(
      ...node.getChildren().map((row) => this.extractOperandsAndOperators(row))
    );

    return result;
  }

  private add(
    node: HalsteadCountableNode,
    operands: Map<string, number>,
    operators: Map<string, number>
  ) {
    let map = operands;
    if (node.isOperator()) {
      map = operators;
    }

    map.set(node.getText(), (map.get(node.getText()) ?? 0) + 1);
  }
}
