export interface Complexity {
    readonly complexity: number;
    readonly nestDeepCount: number;

    valueOf(): number;
}

type ComplexityJSON = {
    complexity: number,
    items: {complexity: number, nestDeepCount: number}[],
};

export interface ComplexityStore {
    getAll(): Complexity[];
    valueOf(): number;
    toJSON(): ComplexityJSON;
}

type HalsteadJSON = {
    operands: [string, number][],
    operators: [string, number][],
    volume: number,
    length: number,
    vocabulary: number,
    difficulty: number,
    effort: number,
    time: number,
    bugsDelivered: number,
};

export interface Halstead {
    readonly operands: Map<string, number>;
    readonly operators: Map<string, number>;
    getVolume(): number;
    getLength(): number;
    getVocabulary(): number;
    getDifficulty(): number;
    getEffort(): number;
    getTime(): number;
    getBugsDelivered(): number;
    valueOf(): number;
    toJSON(): HalsteadJSON;
}

type LineOfCodeJSON = {
    physical: number;
    logical: number;
};

export interface LineOfCode
{
    readonly physical: number;
    readonly logical: number;
    valueOf(): number;
    toJSON(): LineOfCodeJSON;
}

type MaintainabilityJSON = {
    maintainability: number;
};

export interface Maintainability
{
    readonly maintainability: number;
    valueOf(): number;
    toJSON(): MaintainabilityJSON;
}

type MetricsJSON = { 
    defineName: string,
    position: {
        start: number|undefined,
        end: number|undefined,
    },
    halstead: Halstead,
    congnitiveComplexity: ComplexityStore,
    lineOfCode: LineOfCode,
    maintainability: Maintainability,
};

export interface Metrics {
    readonly congnitiveComplexity: ComplexityStore;
    readonly halstead: Halstead;
    readonly lineOfCode: LineOfCode;
    readonly maintainability: Maintainability;
}

export interface FileMetrics {
    readonly filePath: string;
}
