import 'reflect-metadata';
import { Container } from 'inversify';
import { FileFinder } from './FileFinder/FileFinder';
import { Reporter as ReporterImp } from '../Reporter/Reporter';
import { JSON } from '../Reporter/JSON/FileBuilder/JSON';
import { Types } from '../types/Types';
import { ScriptBuilder } from '../Reporter/HTML/ScriptBuilder';
import { FileBuilder } from '../Reporter/FileBuilder';
import { CSS } from '../Reporter/HTML/FileBuilder/CSS';
import { HTML } from '../Reporter/HTML/FileBuilder/HTML';
import { Event } from '../Reporter/HTML/FileBuilder/Event';
import { EntryPoint } from '../Reporter/HTML/FileBuilder/EntryPoint';
import { Writer } from '../Reporter/HTML/Writer';
import { Sabik } from './Sabik';
import { Reporter } from './Reporter';
import { PHP } from './Language/PHP';
import { TypeScript } from './Language/TypeScript';
import { Analyzer } from './Analyzer/Analyzer';
import { ASTNodeExtractor } from '../Analyzer/ASTNodeExtractor';
import { Analyzer as MetricsAnalyzer } from '../Analyzer/Analyzer';
import { Calculator as CognitiveComplexityCalculator } from '../Analyzer/CodeMetricsCalculator/CognitiveComplexity/Calculator';
import { Calculator as HalsteadCalculator } from '../Analyzer/CodeMetricsCalculator/Halstead/Calculator';
import { Calculator as LineOfCodeCalculator } from '../Analyzer/CodeMetricsCalculator/LineOfCode/Calculator';
import { Calculator as MaintainabilityCalculator } from '../Analyzer/CodeMetricsCalculator/Maintainability/Calculator';
import { MethodAnalyzer } from '../Analyzer/FromASTNode/MethodAnalyzer';
import { Analyzer as ASTNodeAnalyzer } from '../Analyzer/FromASTNode/Analyzer';
import { FileAnalyzer } from '../Analyzer/FromASTNode/FileAnalyzer';
import { Converter } from '../Analyzer/Adapter/Converter';
import { LineOfCodeCountableNode } from '../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { LineOfCode as LineOfCodeConverterForPHP } from '../Language/PHP/Converter/LineOfCode';
import { Halstead as HalsteadConverterForPHP } from '../Language/PHP/Converter/Halstead';
import { Complexity as ComplexityConverterForPHP } from '../Language/PHP/Converter/Complexity';
import { ASTGenerator as ASTGeneratorForPHP } from '../Language/PHP/ASTGenerator';
import { ComplexityCountableNode } from '../Analyzer/CodeMetricsCalculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { HalsteadCountableNode } from '../Analyzer/CodeMetricsCalculator/Halstead/Adapter/HalsteadCountableNode';
import { LineOfCode as LineOfCodeConverterForTypeScript } from '../Language/TypeScript/Converter/LineOfCode';
import { Halstead as HalsteadConverterForTypeScript } from '../Language/TypeScript/Converter/Halstead';
import { Complexity as ComplexityConverterForTypeScript } from '../Language/TypeScript/Converter/Complexity';
import { ASTGenerator as ASTGeneratorForTypeScript } from '../Language/TypeScript/ASTGenerator';
import { CalculatorForAST } from '../Analyzer/FromASTNode/CalculatorForAST';
import { CalculatorForMetrics } from '../Analyzer/FromOtherMetrics/CalculatorForMetrics';
import { LanguageAnalyzer } from './Analyzer/LanguageAnalyzer';
import { ASTGenerator } from '../Analyzer/Adapter/ASTGenerator';

const container = new Container();

container.bind<FileFinder>(FileFinder).toSelf();
container.bind<ScriptBuilder>(ScriptBuilder).toSelf();
container.bind<Writer>(Writer).toSelf();
container.bind<FileBuilder>(Types.outputFileBuilder).to(CSS).whenAnyAncestorNamed('HTML');
container.bind<FileBuilder>(Types.outputFileBuilder).to(HTML).whenAnyAncestorNamed('HTML');
container.bind<FileBuilder>(Types.outputFileBuilder).to(Event).whenAnyAncestorNamed('HTML');
container.bind<FileBuilder>(Types.outputFileBuilder).to(EntryPoint).whenAnyAncestorNamed('HTML');
container.bind<FileBuilder>(Types.outputFileBuilder).to(JSON).whenAnyAncestorNamed('JSON');
container.bind<Reporter>(Types.reporter).to(ReporterImp);
container.bind<Sabik>(Sabik).toSelf();
container.bind<LanguageAnalyzer>(LanguageAnalyzer).to(PHP);
container.bind<LanguageAnalyzer>(LanguageAnalyzer).to(TypeScript);
container.bind<Analyzer>(Analyzer).toSelf();
container.bind<ASTNodeExtractor>(ASTNodeExtractor).toSelf().inSingletonScope();
container.bind<MetricsAnalyzer>(MetricsAnalyzer).toSelf();
container.bind<CalculatorForAST>(Types.codeMetricsCalculatorForAST).to(CognitiveComplexityCalculator);
container.bind<CalculatorForAST>(Types.codeMetricsCalculatorForAST).to(HalsteadCalculator);
container.bind<CalculatorForAST>(Types.codeMetricsCalculatorForAST).to(LineOfCodeCalculator);
container.bind<CalculatorForMetrics>(Types.codeMetricsCalculatorForMetrics).to(MaintainabilityCalculator);
container.bind<MethodAnalyzer>(MethodAnalyzer).toSelf();
container.bind<ASTNodeAnalyzer>(Types.analyzer).to(MethodAnalyzer);
container.bind<ASTNodeAnalyzer>(Types.analyzer).to(FileAnalyzer);
container
  .bind<Converter<LineOfCodeCountableNode>>(Types.lineOfCodeConverter)
  .to(LineOfCodeConverterForPHP)
  .whenAnyAncestorNamed('PHP');
container
  .bind<Converter<ComplexityCountableNode>>(Types.cognitiveComplexityConverter)
  .to(ComplexityConverterForPHP)
  .whenAnyAncestorNamed('PHP');
container
  .bind<Converter<HalsteadCountableNode>>(Types.halsteadConverter)
  .to(HalsteadConverterForPHP)
  .whenAnyAncestorNamed('PHP');
container.bind<ASTGenerator>(Types.astNodeGenerator).to(ASTGeneratorForPHP).whenAnyAncestorNamed('PHP');
container
  .bind<Converter<LineOfCodeCountableNode>>(Types.lineOfCodeConverter)
  .to(LineOfCodeConverterForTypeScript)
  .whenAnyAncestorNamed('TypeScript');
container
  .bind<Converter<ComplexityCountableNode>>(Types.cognitiveComplexityConverter)
  .to(ComplexityConverterForTypeScript)
  .whenAnyAncestorNamed('TypeScript');
container
  .bind<Converter<HalsteadCountableNode>>(Types.halsteadConverter)
  .to(HalsteadConverterForTypeScript)
  .whenAnyAncestorNamed('TypeScript');
container.bind<ASTGenerator>(Types.astNodeGenerator).to(ASTGeneratorForTypeScript).whenAnyAncestorNamed('TypeScript');

export { container };
