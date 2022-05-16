import { existsSync, rmSync, mkdirSync } from 'fs';
import { run } from '../';

describe('Able to analyze source code metrics.', () => {
  const rootDirectory = `${__dirname}/fixtures`;
  const currentDirectory = process.cwd();

  beforeAll(() => {
    process.chdir(rootDirectory);
  });

  afterAll(() => {
    process.chdir(currentDirectory);
  });

  describe('Target source code can be narrowed down.', () => {
    afterEach(() => {
      rmSync(`${rootDirectory}/output`, { recursive: true, force: true });
    });

    it('Only not excludeing files will be considered, when using excludes option.', async () => {
      await run('test', [
        'node',
        './bin/run',
        `${rootDirectory}/target`,
        '--excludes',
        '.ts$',
        '-o',
        './output/excludes',
      ]);

      expect(existsSync(`${rootDirectory}/output/excludes`)).toBe(true);
      expect(existsSync(`${rootDirectory}/output/excludes/event/sourceCode/FizzBuzz.php.js`)).toBe(true);
      expect(existsSync(`${rootDirectory}/output/excludes/event/sourceCode/FizzBuzz.ts.js`)).toBe(false);
    });

    it('Only matching files will be considered, when using matches option.', async () => {
      await run('test', [
        'node',
        './bin/run',
        `${rootDirectory}/target`,
        '--matches',
        '.ts$',
        '-o',
        './output/matches',
      ]);

      expect(existsSync(`${rootDirectory}/output/matches`)).toBe(true);
      expect(existsSync(`${rootDirectory}/output/matches/event/sourceCode/FizzBuzz.php.js`)).toBe(false);
      expect(existsSync(`${rootDirectory}/output/matches/event/sourceCode/FizzBuzz.ts.js`)).toBe(true);
    });
  });

  describe('Analysis results can be output.', () => {
    beforeEach(() => {
      mkdirSync(`${rootDirectory}/output`);
    });

    afterEach(() => {
      rmSync(`${rootDirectory}/output`, { recursive: true, force: true });
    });

    it('Should export to HTML.', async () => {
      await run('test', ['node', './bin/run', `${rootDirectory}/target`, '--outputFormat', 'HTML', '-o', './output']);

      expect(existsSync(`${rootDirectory}/output/index.html`)).toBe(true);
    });

    it('Should export to JSON.', async () => {
      await run('test', [
        'node',
        './bin/run',
        `${rootDirectory}/target`,
        '--outputFormat',
        'HTML',
        '-o',
        './output/analyzed.json',
      ]);

      expect(existsSync(`${rootDirectory}/output/analyzed.json`)).toBe(true);
    });

    it('Should export to CSV.', async () => {
      await run('test', [
        'node',
        './bin/run',
        `${rootDirectory}/target`,
        '--outputFormat',
        'HTML',
        '-o',
        './output/analyzed.csv',
      ]);

      expect(existsSync(`${rootDirectory}/output/analyzed.csv`)).toBe(true);
    });
  });
});
