export const Types = {
  rootPath: Symbol.for('rootPath'),
  outputPath: Symbol.for('outputPath'),
  fileMatches: Symbol.for('fileMatches'),
  fileExcludes: Symbol.for('fileExcludes'),
  outputFileBuilder: Symbol.for('outputFileBuilder'),
  reporter: Symbol.for('reporter'),
  languageConfig: Symbol.for('languageConfig'),
  astNode: Symbol.for('ASTNode'),
  astNodeGenerator: Symbol.for('ASTNodeGenerator'),
  analyzer: Symbol.for('Analyzer'),
  lineOfCodeConverter: Symbol.for('LineOfCodeConverter'),
  cognitiveComplexityConverter: Symbol.for('CognitiveComplexityConverter'),
  cyclomaticComplexityConverter: Symbol.for('CyclomaticComplexityConverter'),
  halsteadConverter: Symbol.for('HalsteadConverter'),
  codeMetricsCalculatorForAST: Symbol.for('CodeMetricsCalculatorForAST'),
  codeMetricsCalculatorForMetrics: Symbol.for('CodeMetricsCalculatorForMetrics'),
};
