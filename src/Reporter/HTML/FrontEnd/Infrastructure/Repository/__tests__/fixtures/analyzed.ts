export const fixture = [
  {
    fileName: 'maxComplexity.ts',
    lineOfCode: {
      logical: 800,
      physical: 1000,
    },
    metrics: [
      {
        defineName: 'UnitTest',
        position: {
          start: 0,
          end: 1000,
        },
        halstead: {
          operands: [],
          operators: [],
          volume: 100,
          length: 200,
          vocabulary: 300,
          difficulty: 400,
          effort: 500,
          time: 600,
          bugsDelivered: 700,
        },
        cognitiveComplexity: {
          complexity: 800,
          items: [
            {
              complexity: 1,
              deepCount: 79,
            },
          ],
        },
        lineOfCode: {
          physical: 1000,
          logical: 800,
        },
        maintainability: {
          maintainability: 900,
        },
      },
    ],
  },
  {
    fileName: 'maxBugsDelivered.ts',
    lineOfCode: {
      logical: 800,
      physical: 1000,
    },
    metrics: [
      {
        defineName: 'UnitTest',
        position: {
          start: 0,
          end: 1000,
        },
        halstead: {
          operands: [],
          operators: [],
          volume: 100,
          length: 200,
          vocabulary: 300,
          difficulty: 400,
          effort: 500,
          time: 600,
          bugsDelivered: 7000,
        },
        cognitiveComplexity: {
          complexity: 80,
          items: [
            {
              complexity: 1,
              deepCount: 79,
            },
          ],
        },
        lineOfCode: {
          physical: 1000,
          logical: 800,
        },
        maintainability: {
          maintainability: 900,
        },
      },
    ],
  },
  {
    fileName: 'minMaintainability.ts',
    lineOfCode: {
      logical: 800,
      physical: 1000,
    },
    metrics: [
      {
        defineName: 'UnitTest',
        position: {
          start: 0,
          end: 1000,
        },
        halstead: {
          operands: [],
          operators: [],
          volume: 100,
          length: 200,
          vocabulary: 300,
          difficulty: 400,
          effort: 500,
          time: 600,
          bugsDelivered: 7000,
        },
        cognitiveComplexity: {
          complexity: 80,
          items: [
            {
              complexity: 1,
              deepCount: 79,
            },
          ],
        },
        lineOfCode: {
          physical: 1000,
          logical: 800,
        },
        maintainability: {
          maintainability: 9,
        },
      },
    ],
  },
];
