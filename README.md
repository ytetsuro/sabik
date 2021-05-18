Sabik
===

This project is under development.

Please feel free to PullRequest and Issue.

---

![ci-build](https://github.com/ytetsuro/sabik/workflows/ci-build/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/ytetsuro/sabik/badge.svg)](https://snyk.io/test/github/ytetsuro/sabik)

Visualize source code complexity with Sabik.
This tool is to find the bad smell code.
I think your helpful refactoring.

<!-- toc -->
* [Basic Using](#basic-using)
* [Support Programming Language](#support-programming-language)
* [Feature Support Programming Language](#feature-support-programming-language)
<!-- tocstop -->

# Basic Using

```sh-session
$ npx sabik /target/path
```

## Local installation

If you felt sabik is slow, using local installation.

```sh-session
$ npm i -g sabik
```

### Using sabik with local installed

```sh-session
$ sabik /target/path
```

## Help

```sh-session
USAGE
  $ sabik [TARGET]

OPTIONS
  -h, --help                             show CLI help
  -o, --outputReportDir=outputReportDir  output report directory path. default: ./sabik_report
  -v, --version                          show CLI version
  --excludes=excludes                    exclude patterns is separated by a comma. example: .test.ts$,.spec.ts$
  --matches=matches                      match patterns. example: .ts$
```

# Support Programming Language

* TypeScript
* JavaScript
* PHP < 8.0

For now.

# What analyzable metrics?

Sabik analyzable metrics are following.

* Cognitive Complexity
* Halstead complexity measures
* Line of Code(Logical, Physical)
* Maintainability

For now.

## Cognitive Complexity

Cognitive Complexity is metrics for human readability.
Made SonarSource inc.
High is bad, low is good metrics.
Higher when your code has a deep nest.
It’s read very hard when over 8 scores. (In my experience)

If you want to know more about the detail, please see the following.

[CognitiveComplexity](https://www.sonarsource.com/docs/CognitiveComplexity.pdf)

## Halstead complexity measures

Halstead complexity measures are metrics for a difficulty to understand.
Made Maurice Howard Halstead.
High is bad, low is good metrics.
Higher when your code has many responsibilities.
These metrics are judge difficulty from vocabulary size, for example, the newspaper is difficult but, children's book is easy to understand.

If you want to know more about the detail, please see the following.

[Halstead complexity measures](http://www.virtualmachinery.com/sidebar2.htm)

## Line of Code(Logical, Physical)

Physical Line of Code is metrics for line count include comments.
Logical Line of Code is metrics for line count ignored comments.
High is bad, low is good metrics.

## Maintainability

Maintainability is metric for software maintainability.
Made Microsoft inc.
Low is bad, High is good metrics.
This metric ranges from 0 ~ 100.
It’s maintenance hard when under 60 scores. (In my experience)
This metrics is normally using the following, calculate.

* Line of Code
* Halstead metrics
* Cyclomatic Complexity

But in Sabik using following.

* Line of Code
* Halstead metrics
* Cognitive Complexity

If you want to know more about the detail, please see the following.

[Maintainability](https://docs.microsoft.com/en-us/visualstudio/code-quality/code-metrics-maintainability-index-range-and-meaning?view=vs-2019)

# License

Copyright (c) 2020 Tetsuro Yoshikawa Licensed under the MIT license.
