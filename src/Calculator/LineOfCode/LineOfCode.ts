export class LineOfCode {
  public readonly physical: number;

  public readonly logical: number;

  constructor(physical: number, logical: number) {
    this.physical = physical;
    this.logical = logical;
  }

  valueOf() {
    return this.logical;
  }

  toJSON() {
    return { ...this };
  }
}
