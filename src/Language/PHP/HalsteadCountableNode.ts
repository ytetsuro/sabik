import Engine from 'php-parser';
import { HalsteadCountableNode as HalsteadCountableNodeInterface } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTNode } from './ASTNode';

type Token = {
  token: string,
  source: string,
};

export class HalsteadCountableNode implements HalsteadCountableNodeInterface {
  private readonly token: Token;
  private readonly tokenChildren: Token[] = [];

  private static readonly operands = [
    'T_VARIABLE', 'T_VAR', 'T_LNUMBER',
    'T_DNUMBER', 'T_ARRAY', 'T_CONST',
    'T_STRING', 'T_NUM_STRING', 'T_INT_CAST',
    'T_ARRAY_CAST', 'T_BOOL_CAST', 'T_DOUBLE_CAST',
    'T_OBJECT_CAST', 'T_STRING_CAST', 'T_UNSET_CAST',
    'T_STRING_VARNAME', 
  ];

  private static readonly operators = [
    'T_IS_EQUAL', 'T_AND_EQUAL', 'T_CONCAT_EQUAL',
    'T_DIV_EQUAL', 'T_MINUS_EQUAL', 'T_MOD_EQUAL',
    'T_MUL_EQUAL', 'T_OR_EQUAL', 'T_PLUS_EQUAL',
    'T_SL_EQUAL', 'T_SR_EQUAL', 'T_XOR_EQUAL',
    'T_IS_GREATER_OR_EQUAL', 'T_IS_SMALLER_OR_EQUAL', 'T_IS_NOT_EQUAL',
    'T_IS_IDENTICAL', 'T_BOOLEAN_AND', 'T_BOOLEAN_AND',
    'T_INC', 'T_OBJECT_OPERATOR', 'T_DOUBLE_COLON',
    'T_PAAMAYIM_NEKUDOTAYIM', 'T_STATIC', 'T_ABSTRACT',
    'T_FINAL', 'T_CONST', 'T_BREAK', 'T_CASE',
    'T_CONTINUE', 'T_DEFAULT', 'T_DO',
    'T_IF', 'T_ELSE', 'T_ELSEIF',
    'T_FOR', 'T_FOREACH', 'T_GOTO',
    'T_NEW', 'T_RETURN', 'T_SWITCH',
    'T_WHILE', 'T_HALT_COMPILER', 'T_YIELD_FROM',
    'T_YIELD', 'T_FINALLY', 'T_CLASS',
    'T_CATCH', 'T_TRY', 'T_TRAIT',
    'T_FUNCTION', 'T_FN', 'T_FILE',
    'T_GLOBAL', 'T_GOTO', 'T_ISSET',
    'T_LIST', 'T_FUNC_C', 'T_INCLUDE',
    'T_INCLUDE_ONCE', 'T_INSTANCEOF', 'T_INSTEADOF',
    'T_INTERFACE', 'T_METHOD_C', 'T_NS_C',
    'T_NULLSAFE_OBJECT_OPERATOR', 'T_PRINT', 'T_PRIVATE',
    'T_PROTECTED', 'T_PUBLIC', 'T_REQUIRE',
    'T_REQUIRE_ONCE', 'T_SL', 'T_SPACESHIP',
    'T_SR', 'T_START_HEREDOC', 'T_STATIC',
    'T_TRAIT_C', 'T_UNSET', 'T_USE',
    'T_DECLARE', 'T_DEC', 'X_OPERATOR_STRING'
  ];

  private static readonly operatorStrings = [
    '+', '/', '*', '-', '%',
    '&', '|', '^', '~',
    '@',
    '`',
    '!',
    '.', ','
  ];

  constructor(nodeOrToken: ASTNode|Token) {
    if (!(nodeOrToken instanceof ASTNode)) {
      this.token = nodeOrToken;
      return;
    }

    if (!nodeOrToken.isFunction() && !nodeOrToken.isMethod()) {
      throw new Error('Not parsable astNode.');
    }

    const tokens = this.getTokens(nodeOrToken);

    this.token = tokens.shift()!;
    this.tokenChildren = tokens;
  }

  isOperand(): boolean {
    return HalsteadCountableNode.operands.includes(this.token.token);
  }

  isOperator(): boolean {
    return HalsteadCountableNode.operators.includes(this.token.token);
  }

  getText(): string {
    return this.token.source;
  }

  getChildren() {
    return this.tokenChildren.slice()
      .map(row => new HalsteadCountableNode(row));
  }

  private getTokens(astNode: ASTNode) {
    const engine = new Engine({
      parser: {
        extractDoc: true,
      },
      lexer: {
        all_tokens: true
      }
    });
    let source = astNode.source;

    if (astNode.isMethod()) {
      source = `new class {${source}};`;
    }

    const tokens = engine.tokenGetAll(`<?php ${source}`)
      .filter(row => Array.isArray(row) || HalsteadCountableNode.operatorStrings.includes(row))
      .map(row => ({
        token: typeof row === 'string' ? 'X_OPERATOR_STRING' : String(row[0]),
        source: typeof row === 'string' ? row : String(row[1])
      }));
    
    return astNode.isMethod() ? tokens.slice(5) : tokens ;
  }
}
