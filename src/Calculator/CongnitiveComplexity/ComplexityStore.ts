import {Complexity} from './Complexity'

export class ComplexityStore {
    private readonly complexities: Complexity[];

    constructor(complexities: Complexity[]) {
      this.complexities = complexities
    }

    getAll(): Complexity[] {
      return this.complexities.slice()
    }

    valueOf(): number {
      return this.complexities.reduce((prev, next) => Number(prev) + Number(next), 0)
    }

    toJSON() {
      return {
        complexity: this.valueOf(),
        items: this.getAll().map(row => ({...row}))
      };
    }
}
