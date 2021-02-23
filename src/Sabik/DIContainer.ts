import 'reflect-metadata';
import { Container } from 'inversify';
import { FileFinder } from './FileFinder/FileFinder';
import { Reporter as HTMLReporter } from '../Reporter/HTML/Reporter';
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
import { LanguageConfig } from './Language/LanguageConfig';
import { PHP } from './Language/PHP';
import { TypeScript } from './Language/TypeScript';
import { Language } from './Language/Language';

const container = new Container();

container.bind<FileFinder>(FileFinder).toSelf();
container.bind<ScriptBuilder>(ScriptBuilder).toSelf();
container.bind<Writer>(Writer).toSelf();
container.bind<FileBuilder>(Types.outputFileBuilder).to(CSS);
container.bind<FileBuilder>(Types.outputFileBuilder).to(HTML);
container.bind<FileBuilder>(Types.outputFileBuilder).to(Event);
container.bind<FileBuilder>(Types.outputFileBuilder).to(EntryPoint);
container.bind<Reporter>(Types.reporter).to(HTMLReporter);
container.bind<Sabik>(Sabik).toSelf();
container.bind<LanguageConfig>(Types.languageConfig).to(PHP);
container.bind<LanguageConfig>(Types.languageConfig).to(TypeScript);
container.bind<Language>(Language).toSelf();

export { container };
