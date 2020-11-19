import { AnalyzerMap } from '../AnalyzerMap';
import { TypeScript } from './TypeScript';

export class AnalyzerMapCollectingParamter {
  static build(map: AnalyzerMap) {
    const languages = [new TypeScript()];

    languages.forEach((language) => {
      map.register(language.extensions, language);
    });

    return map;
  }
}
