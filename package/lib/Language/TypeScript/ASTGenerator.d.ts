import { ASTGenerator as ASTGeneratorInterface } from '../../Analyzer/Adapter/ASTGenerator';
import { ASTNode } from './ASTNode';
import { File } from '../../Analyzer/Adapter/File';
export declare class ASTGenerator implements ASTGeneratorInterface {
    generate(file: File): ASTNode;
}
