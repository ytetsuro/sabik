import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';
export declare class ComplexityIncrement {
    readonly complexity: number;
    readonly nestDeepCount: number;
    constructor(complexityCountableNode: ComplexityCountableNode, nestDeepCount: number);
    valueOf(): number;
}
