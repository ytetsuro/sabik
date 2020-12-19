Sabik
===

![ci-build](https://github.com/ytetsuro/sabik/workflows/ci-build/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/ytetsuro/sabik/badge.svg)](https://snyk.io/test/github/ytetsuro/sabik)


Sabik is a source code metrics tool.
It's a compass tool for warriors fighting a project that smells bad.
Find the refactoring target code of a project that has many bad smells.
It's not a tool for keeping clean code like Linter.

<!-- toc -->
* [Basic Using](#basic-using)
* [Support Programming Language](#support-programming-language)
* [Feature Support Programming Language](#feature-support-programming-language)
<!-- tocstop -->

# Basic Using

```sh-session
$ npx sabik /target/path
```

## Help

```sh-session
USAGE
  $ sabik [TARGET]

OPTIONS
  -h, --help                             show CLI help
  -o, --outputReportDir=outputReportDir  output report directory path. default: ./sabik_report
  -v, --version                          show CLI version
  --excludes=excludes                    exclude patterns is separated by a comma. example: *.test.ts,*.spec.ts
  --matches=matches                      match patterns. example: .ts$
```

# Support Programming Language

* TypeScript
* JavaScript
* PHP < 8.0

# Feature Support Programming Language

* C++
* Java
* Python
