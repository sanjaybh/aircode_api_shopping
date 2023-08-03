import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./src/client-iife.js'],
  bundle: true,
  platform: 'browser',
  outfile: 'public/aircode-pusher-client.js',
});

await esbuild.build({
  entryPoints: ['./src/client-iife.js'],
  bundle: true,
  platform: 'browser',
  outfile: 'dist/aircode-pusher-client.js',
});

await esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: 'dist/aircode-pusher.cjs',
});