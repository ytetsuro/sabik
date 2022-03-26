"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const FileFinder_1 = require("./FileFinder/FileFinder");
const Reporter_1 = require("../Reporter/Reporter");
const JSON_1 = require("../Reporter/JSON/FileBuilder/JSON");
const Types_1 = require("../types/Types");
const ScriptBuilder_1 = require("../Reporter/HTML/ScriptBuilder");
const CSS_1 = require("../Reporter/HTML/FileBuilder/CSS");
const HTML_1 = require("../Reporter/HTML/FileBuilder/HTML");
const Event_1 = require("../Reporter/HTML/FileBuilder/Event");
const EntryPoint_1 = require("../Reporter/HTML/FileBuilder/EntryPoint");
const Writer_1 = require("../Reporter/HTML/Writer");
const Sabik_1 = require("./Sabik");
const PHP_1 = require("./Language/PHP");
const TypeScript_1 = require("./Language/TypeScript");
const Analyzer_1 = require("./Analyzer/Analyzer");
const ASTNodeExtractor_1 = require("../Analyzer/ASTNodeExtractor");
const Analyzer_2 = require("../Analyzer/Analyzer");
const Calculator_1 = require("../Analyzer/CodeMetricsCalculator/CognitiveComplexity/Calculator");
const Calculator_2 = require("../Analyzer/CodeMetricsCalculator/Halstead/Calculator");
const Calculator_3 = require("../Analyzer/CodeMetricsCalculator/LineOfCode/Calculator");
const Calculator_4 = require("../Analyzer/CodeMetricsCalculator/Maintainability/Calculator");
const MethodAnalyzer_1 = require("../Analyzer/FromASTNode/MethodAnalyzer");
const FileAnalyzer_1 = require("../Analyzer/FromASTNode/FileAnalyzer");
const LineOfCode_1 = require("../Language/PHP/Converter/LineOfCode");
const Halstead_1 = require("../Language/PHP/Converter/Halstead");
const Complexity_1 = require("../Language/PHP/Converter/Complexity");
const ASTGenerator_1 = require("../Language/PHP/ASTGenerator");
const LineOfCode_2 = require("../Language/TypeScript/Converter/LineOfCode");
const Halstead_2 = require("../Language/TypeScript/Converter/Halstead");
const Complexity_2 = require("../Language/TypeScript/Converter/Complexity");
const ASTGenerator_2 = require("../Language/TypeScript/ASTGenerator");
const LanguageAnalyzer_1 = require("./Analyzer/LanguageAnalyzer");
const container = new inversify_1.Container();
exports.container = container;
container.bind(FileFinder_1.FileFinder).toSelf();
container.bind(ScriptBuilder_1.ScriptBuilder).toSelf();
container.bind(Writer_1.Writer).toSelf();
container.bind(Types_1.Types.outputFileBuilder).to(CSS_1.CSS).whenAnyAncestorNamed('HTML');
container.bind(Types_1.Types.outputFileBuilder).to(HTML_1.HTML).whenAnyAncestorNamed('HTML');
container.bind(Types_1.Types.outputFileBuilder).to(Event_1.Event).whenAnyAncestorNamed('HTML');
container.bind(Types_1.Types.outputFileBuilder).to(EntryPoint_1.EntryPoint).whenAnyAncestorNamed('HTML');
container.bind(Types_1.Types.outputFileBuilder).to(JSON_1.JSON).whenAnyAncestorNamed('JSON');
container.bind(Types_1.Types.reporter).to(Reporter_1.Reporter);
container.bind(Sabik_1.Sabik).toSelf();
container.bind(LanguageAnalyzer_1.LanguageAnalyzer).to(PHP_1.PHP);
container.bind(LanguageAnalyzer_1.LanguageAnalyzer).to(TypeScript_1.TypeScript);
container.bind(Analyzer_1.Analyzer).toSelf();
container.bind(ASTNodeExtractor_1.ASTNodeExtractor).toSelf().inSingletonScope();
container.bind(Analyzer_2.Analyzer).toSelf();
container.bind(Types_1.Types.codeMetricsCalculatorForAST).to(Calculator_1.Calculator);
container.bind(Types_1.Types.codeMetricsCalculatorForAST).to(Calculator_2.Calculator);
container.bind(Types_1.Types.codeMetricsCalculatorForAST).to(Calculator_3.Calculator);
container.bind(Types_1.Types.codeMetricsCalculatorForMetrics).to(Calculator_4.Calculator);
container.bind(MethodAnalyzer_1.MethodAnalyzer).toSelf();
container.bind(Types_1.Types.analyzer).to(MethodAnalyzer_1.MethodAnalyzer);
container.bind(Types_1.Types.analyzer).to(FileAnalyzer_1.FileAnalyzer);
container
    .bind(Types_1.Types.lineOfCodeConverter)
    .to(LineOfCode_1.LineOfCode)
    .whenAnyAncestorNamed('PHP');
container
    .bind(Types_1.Types.cognitiveComplexityConverter)
    .to(Complexity_1.Complexity)
    .whenAnyAncestorNamed('PHP');
container
    .bind(Types_1.Types.halsteadConverter)
    .to(Halstead_1.Halstead)
    .whenAnyAncestorNamed('PHP');
container.bind(Types_1.Types.astNodeGenerator).to(ASTGenerator_1.ASTGenerator).whenAnyAncestorNamed('PHP');
container
    .bind(Types_1.Types.lineOfCodeConverter)
    .to(LineOfCode_2.LineOfCode)
    .whenAnyAncestorNamed('TypeScript');
container
    .bind(Types_1.Types.cognitiveComplexityConverter)
    .to(Complexity_2.Complexity)
    .whenAnyAncestorNamed('TypeScript');
container
    .bind(Types_1.Types.halsteadConverter)
    .to(Halstead_2.Halstead)
    .whenAnyAncestorNamed('TypeScript');
container.bind(Types_1.Types.astNodeGenerator).to(ASTGenerator_2.ASTGenerator).whenAnyAncestorNamed('TypeScript');
