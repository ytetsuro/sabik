# Using sabik with GitHub Actions

This document explains how to use sabik in GitHub Actions to generate code metrics badges.

## Setup GitHub Actions

Create a workflow file:

.github/workflows/build.yml

## Run sabik

Run sabik to generate metrics.

./bin/run ./src -t JSON

## Generated Metrics

- LogicalLineOfCode
- CognitiveComplexity
- Maintainability

## Badge generation

Badges can be generated using dynamic-badges-action.
