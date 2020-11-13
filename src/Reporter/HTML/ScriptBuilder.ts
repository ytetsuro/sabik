import {build, BuildOptions} from 'esbuild';
import { injectable } from 'inversify';
import {TextDecoder} from 'util';

@injectable()
export class ScriptBuilder {
  private esbuildOptions: BuildOptions = {
      outfile: 'analyze.js',
      bundle: true,
      write: false,
      minify: true,
      platform: 'browser',
      loader: {'.ts': 'ts'},
  };

  async build(entryPoint: string) {
      const buildConfig = {
          ...this.esbuildOptions,
          entryPoints: [entryPoint]
      }; 
      const {outputFiles} = await build(buildConfig);

      return (new TextDecoder("utf-8")).decode(outputFiles?.[0].contents);
  }
}