export interface Calculator<T, K>
{
    calculate(node: T): K;
}
