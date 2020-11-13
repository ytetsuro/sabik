import { Metrics } from './Metrics';

export interface FileMetrics {
    fileName: string,
    lineOfCode: {
        physical: number,
        logical: number,
    },
    metrics: Metrics[]
}