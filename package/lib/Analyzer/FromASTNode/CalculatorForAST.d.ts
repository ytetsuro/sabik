import { Metrics } from '../Metrics/Metrics';
import { ASTNodeSource } from './ASTNodeSource';
export interface CalculatorForAST {
    analyze(astNodeSources: ASTNodeSource[]): Metrics[];
}
