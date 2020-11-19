import 'reflect-metadata';
import { Container } from 'inversify';
import { FileFinder } from './FileFinder/FileFinder';
import { Reporter as HTMLReporter } from '../Reporter/HTML/Reporter';
import { AnalyzerMap } from './AnalyzerMap';
import { Types } from '../types/Types';
import { ScriptBuilder } from '../Reporter/HTML/ScriptBuilder';
import { FileBuilder } from '../Reporter/HTML/FileBuilder/FileBuilder';
import { CSS } from '../Reporter/HTML/FileBuilder/CSS';
import { HTML } from '../Reporter/HTML/FileBuilder/HTML';
import { Event } from '../Reporter/HTML/FileBuilder/Event';
import { EntryPoint } from '../Reporter/HTML/FileBuilder/EntryPoint';
import { Writer } from '../Reporter/HTML/Writer';
import { Sabik } from './Sabik';
import { Reporter } from './Reporter';

const container = new Container();

container.bind<AnalyzerMap>(AnalyzerMap).toSelf();
container.bind<FileFinder>(FileFinder).toSelf();
container.bind<ScriptBuilder>(ScriptBuilder).toSelf();
container.bind<Writer>(Writer).toSelf();
container.bind<FileBuilder>(Types.outputFileBuilder).to(CSS);
container.bind<FileBuilder>(Types.outputFileBuilder).to(HTML);
container.bind<FileBuilder>(Types.outputFileBuilder).to(Event);
container.bind<FileBuilder>(Types.outputFileBuilder).to(EntryPoint);
container.bind<Reporter>(Types.reporter).to(HTMLReporter);
container.bind<Sabik>(Sabik).toSelf();

export { container };
