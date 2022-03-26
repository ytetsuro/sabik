import * as PHPParser from 'php-parser';
import { ASTNode as ASTNodeInterface } from '../../Analyzer/Adapter/ASTNode';
import { ASTKind } from './ASTKind';
declare type Node = PHPParser.Program | PHPParser.Node | PHPParser.Block;
export declare class ASTNode implements ASTNodeInterface {
    readonly node: Node;
    readonly sourceFile: PHPParser.Program;
    readonly parentNode?: ASTNode | undefined;
    constructor(node: Node, sourceFile: PHPParser.Program, parentNode?: ASTNode | undefined);
    get kind(): ASTKind;
    get source(): string;
    get commentStripSource(): string;
    isClass(): boolean;
    isMethod(): boolean;
    getName(): string;
    private getFunctionName;
    private extractNameString;
    isFunction(): boolean;
    isFauxClass(): boolean;
    getStartLineNumber(): number;
    getEndLineNumber(): number;
    getStartOffset(): number;
    getEndOffset(): number;
    getChildren(): ASTNode[];
}
export {};
