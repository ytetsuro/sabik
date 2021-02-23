import { ASTNode } from "../../Analyzer/Adapter/ASTNode";
import { Converter } from "../../Analyzer/Adapter/Converter";

export class CountableNodeConverter<T> implements Converter<T> {
    constructor(private converterMap: Map<Function, Converter<T>>) {
    }

    convert(astNode: ASTNode): T {
        if (!this.converterMap.has(astNode.constructor)) {
            throw new Error('Not found countable node converter.');
        }

        return this.converterMap.get(astNode.constructor)!.convert(astNode);
    }
}