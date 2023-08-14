// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const App = require('aircode-app');
const { parse } = require('node-html-parser');
const { build } = require('./deploy/build.js');

const deployTable = aircode.db.table('deploys');
const app = new App();

app.use(async (ctx) => {
  const debug = ctx.params.debug;
  const deployVersion = process.env.AC_DEPLOYMENT_VERSION;
  
  ctx.set('content-type', 'text/html');
  if(!debug && deployVersion !== '0') {
    const content = await deployTable.where({version: deployVersion}).findOne();
    if(content?.htmlContent) {
      ctx.body = content.htmlContent;
    } else {
      ctx.body = await build();
    }
  } else {
    const html = app.display('./index.html');
    const root = parse(html);
    root.querySelector('head').appendChild(parse(`  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      }
    }
    </script>`));
    ctx.body = root.toString();
  }
});

module.exports = app.run();
