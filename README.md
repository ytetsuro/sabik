# Sabik

Sabik is a source code metrics tool.
It's a compass tool for warriors fighting a project that smells bad.
Find the refactoring target code of a project that has many bad smells.
It's not a tool for keeping clean code like Linter.

## Basic Using

```bash
$ npx sabik /target/path
```

### Options

|options|description|
|:--|:--|
| -h, --help | show CLI help |
| -o, --outputReportDir= | outputReportDir output report directory path. default: `./sabik_report` |
| -v, --version | show CLI version |
| --excludes=excludes | exclude patterns is separated by a comma.  example: `*.test.ts,*.spec.ts` |
| --matches=matches |  match patterns. example: `.ts$` |

## Support Programming Language

* TypeScript
* JavaScript

## Feature Support Programming Language

* C++
* Java
* PHP
* Python
