import { Analyzer } from "../Analyzer";
import { CodeMetrics } from '../CodeMetrics';
import { CodeStructureType } from '../CodeStructureType';
import { ASTNode } from '../../../TestHelpers/ASTNode';

describe('Analayze per code structure class', () => {
    let analyzer: Analyzer<number, CodeMetrics<number>[]>;
    beforeAll(() => {
        analyzer = new Analyzer({
            analyze: () => 1
        }, {
            create: (args) => args,
        });
    });
    describe('should analayze per code structure.', () => {
        it('should return has class structure metrics when two method in one class node.', () => {
            const dummyNode = new ASTNode(
                ':root:0:0',
                {
                    'C:DummyClass:0:20': {
                        'M:dummyMethod1:1:9': {}, 
                        'M:dummyMethod2:12:19': {}
                    }
                }
            );

            const actual = analyzer.analyze(dummyNode);
            expect(actual).toStrictEqual([
                new CodeMetrics([
                    { type: CodeStructureType.CLASS, name: 'DummyClass', startLineNumber: 0, endLineNumber: 20},
                    { type: CodeStructureType.METHOD, name: 'dummyMethod1', startLineNumber: 1, endLineNumber: 9 },
                ], 1),
                new CodeMetrics([
                    { type: CodeStructureType.CLASS, name: 'DummyClass', startLineNumber: 0, endLineNumber: 20},
                    { type: CodeStructureType.METHOD, name: 'dummyMethod2', startLineNumber: 12, endLineNumber: 19},
                ], 1),
            ]);
        });

        it('should return has faux class structure metrics when two method in one faux class node.', () => {
            const dummyNode = new ASTNode(
                ':root:0:0',
                {
                    'D:FauxClass:0:20': {
                        'F:dummyFauxMethod1:1:9': {}, 
                        'F:dummyFauxMethod2:10:19': {}
                    }
                }
            );

            const actual = analyzer.analyze(dummyNode);
            expect(actual).toStrictEqual([
                new CodeMetrics([
                    { type: CodeStructureType.FAUX_CLASS, name: 'FauxClass', startLineNumber: 0, endLineNumber: 20 },
                    { type: CodeStructureType.METHOD, name: 'dummyFauxMethod1', startLineNumber: 1, endLineNumber: 9},
                ], 1),
                new CodeMetrics([
                    { type: CodeStructureType.FAUX_CLASS, name: 'FauxClass', startLineNumber: 0, endLineNumber: 20},
                    { type: CodeStructureType.METHOD, name: 'dummyFauxMethod2', startLineNumber: 10, endLineNumber: 19},
                ], 1),
            ]);
        });

        it('should return has function structure metrics when two function node.', () => {
            const dummyNode = new ASTNode(
                ':root:0:0',
                {
                    'F:dummyFunction1:0:5': {}, 
                    'F:dummyFunction2:6:8': {}
                }
            );

            const actual = analyzer.analyze(dummyNode);
            expect(actual).toStrictEqual([
                new CodeMetrics([
                    { type: CodeStructureType.METHOD, name: 'dummyFunction1', startLineNumber: 0, endLineNumber: 5 },
                ], 1),
                new CodeMetrics([
                    { type: CodeStructureType.METHOD, name: 'dummyFunction2', startLineNumber: 6, endLineNumber: 8 },
                ], 1),
            ]);
        });
    });
});