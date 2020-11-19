import { MaintainabilityCountableNode } from './Adapter/MaintainabilityCountableNode';
import { Maintainability } from './Maintainability';

export class Calculator {
  public calculate(node: MaintainabilityCountableNode) {
    return new Maintainability(
      Math.max(
        0,
        ((171 -
          5.2 * Math.log(node.halstead.getVolume()) -
          0.23 * Number(node.complexity) -
          16.2 * Math.log(node.lineOfCode.logical)) *
          100) /
          171
      )
    );
  }
}
