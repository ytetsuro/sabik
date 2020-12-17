import { AnalyzerMap } from '../AnalyzerMap';
import { TypeScript } from './TypeScript';
import { PHP } from './PHP';

export class AnalyzerMapCollectingParamter {
  static build(map: AnalyzerMap) {
    const languages = [new TypeScript(), new PHP()];

    languages.forEach((language) => {
      map.register(language.extensions, language);
    });

    return map;
  }
}
