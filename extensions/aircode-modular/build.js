import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: 'dist/aircode-modular.cjs',
});