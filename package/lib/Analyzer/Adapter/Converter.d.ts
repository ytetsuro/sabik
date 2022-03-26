import { ASTNode } from './ASTNode';
export interface Converter<T> {
    convert(astNode: ASTNode): T;
}
