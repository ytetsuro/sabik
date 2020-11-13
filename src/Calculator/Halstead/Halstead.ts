import {OperandAndOperator} from './OperandAndOperator'

export class Halstead {
    private readonly seed: OperandAndOperator;

    constructor(seed: OperandAndOperator) {
      this.seed = seed
    }

    get operands() {
      return new Map(this.seed.operands)
    }

    get operators() {
      return new Map(this.seed.operators)
    }

    getLength() {
      return this.seed.getTotalOperandCount() + this.seed.getTotalOperatorCount()
    }

    getVocabulary() {
      return this.seed.getUniqueOperandCount() + this.seed.getUniqueOperatorCount()
    }

    getVolume() {
      return (this.getLength()) * Math.log2(this.getVocabulary())
    }

    getDifficulty() {
      return (this.seed.getUniqueOperatorCount() / 2) * (this.seed.getTotalOperatorCount() / this.seed.getUniqueOperandCount())
    }

    getEffort() {
      return this.getVolume() * this.getDifficulty()
    }

    getTime() {
      return this.getEffort() / 18
    }

    getBugsDelivered() {
      return this.getVolume() / 3000
    }

    valueOf() {
      return this.getVolume()
    }

    toJSON() {
      return {
        operands: [...this.operands],
        operators: [...this.operators],
        volume: this.getVolume(),
        length: this.getLength(),
        vocabulary: this.getVocabulary(),
        difficulty: this.getDifficulty(),
        effort: this.getEffort(),
        time: this.getTime(),
        bugsDelivered: this.getBugsDelivered(),
      };
    }
}
