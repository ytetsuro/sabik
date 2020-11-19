import m from 'mithril';
import { Dashboard } from './Component/Page/Dashboard';
import { Detail } from './Component/Page/Detail';
import { FileMetrics } from './Infrastructure/Converter/FileMetrics';
import { Metrics } from './Infrastructure/Converter/Metrics';
import { Analyzed } from './Infrastructure/Repository/Analyzed';
import { SourceCode } from './Infrastructure/Repository/SourceCode';
import { ResourceLoader } from './Infrastructure/ResourceLoader';

const resourceLoader = new ResourceLoader(document);
const analyzed = new Analyzed(resourceLoader, new FileMetrics(new Metrics()));
const sourceCode = new SourceCode(resourceLoader);

document.addEventListener('DOMContentLoaded', async () => {
  m.route(document.body, '/', {
    '/': new Dashboard(analyzed),
    '/detail': new Detail(analyzed, sourceCode),
  });
});
