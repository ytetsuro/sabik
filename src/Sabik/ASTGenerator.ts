import {ASTNode} from '../Analyzer/Adapter/ASTNode'

export interface ASTGenerator {
    generate(filePath: string): ASTNode;
}
