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