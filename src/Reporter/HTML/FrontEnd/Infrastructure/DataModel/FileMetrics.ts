import { Metrics } from './Metrics';

export interface FileMetrics {
  fileName: string,
  name: string,
  codePointType: number,
  startLineNumber: number,
  endLineNumber: number,
  metricsList: Metrics[];
}
