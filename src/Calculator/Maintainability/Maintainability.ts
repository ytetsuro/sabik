export class Maintainability {
    public readonly maintainability: number;

    constructor(maintainability: number) {
      this.maintainability = maintainability
    }

    valueOf() {
      return this.maintainability
    }

    toJSON() {
      return {...this};
    }
}
