import {Calculator} from '../Adapter/Calculator'
import {Converter} from '../Adapter/Converter'
import {ASTNode} from '../Adapter/ASTNode'
import {Analyzer as AnalyzerInterface} from '../Adapter/Analyzer'

export class Analyzer<T, K> implements AnalyzerInterface<K> {
    private calculator: Calculator<T, K>;

    private converter: Converter<T>;

    constructor(calculator: Calculator<T, K>, converter: Converter<T>) {
      this.calculator = calculator
      this.converter = converter
    }

    analyze(ASTNode: ASTNode) {
      return this.calculator.calculate(this.converter.convert(ASTNode))
    }
}
