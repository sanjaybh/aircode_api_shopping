// @see https://docs.aircode.io/guide/functions/
const App = require('aircode-app');

const app = new App();

app.mount = function(src) {
  const content = app.file(src);
  return content.replace(/(import\s+[^\n]*?\s+from\s+['"])\s*vue\s*(['"])/img, '$1https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js$2').replace(/(import\s+[^\n]*?\s+from\s+['"])\s*\.\/((?:\w|\/|\.)+)\s*(['"])/img, '$1/lib/loader?sfc=$2$3');
}

app.use(async (ctx) => {
  ctx.set('content-type', 'text/html');
  ctx.body = app.display('./index.html');
});

module.exports = app.run();
