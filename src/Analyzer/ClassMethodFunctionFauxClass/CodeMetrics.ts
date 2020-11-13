import {CodeStructure} from './CodeStructure'
import {CodeStructureType} from './CodeStructureType'

export class CodeMetrics<T> {
    readonly hasClass: boolean;

    constructor(
        readonly codeStructures: CodeStructure[],
        readonly metrics: T
    ) {
      const classCount = codeStructures.filter(row => row.type.isClass()).length

      if (codeStructures.filter(row => row.type === CodeStructureType.METHOD).length !== 1) {
        throw new Error('Not Found Function.')
      }

      this.hasClass = classCount > 0
    }

    getClassCodeStructure() {
      return this.codeStructures.find(row => row.type.isClass())
    }

    getMethodCodeStructure() {
      return this.codeStructures.find(row => row.type === CodeStructureType.METHOD)
    }

    toJSON() {
      return {
        defineName: this.codeStructures.map(({name}) => name).join('.'),
        position: {
            start: this.getMethodCodeStructure()?.startLineNumber,
            end: this.getMethodCodeStructure()?.endLineNumber,
        },
        ...this.metrics,
      };
    }
}
