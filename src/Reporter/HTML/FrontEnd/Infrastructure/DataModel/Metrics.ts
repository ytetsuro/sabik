export interface Metrics {
  defineName: string;
  position: {
    start: number;
    end: number;
  };
  halstead: {
    operands: [string, number][];
    operators: [string, number][];
    volume: number;
    length: number;
    vocabulary: number;
    difficulty: number;
    effort: number;
    time: number;
    bugsDelivered: number;
  };
  cognitiveComplexity: {
    complexity: number;
    items: {
      complexity: number;
      deepCount: number;
    }[];
  };
  lineOfCode: {
    physical: number;
    logical: number;
  };
  maintainability: {
    maintainability: number;
  };
}
