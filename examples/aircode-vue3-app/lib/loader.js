// @see https://docs.aircode.io/guide/functions/
const {db} = require('aircode');
const fs = require('fs');
const { compile } = require('vue-simple-compiler');

module.exports = async function (params, context) {
  const {sfc} = params;
  
  if(sfc) {
    const version = process.env.AC_DEPLOYMENT_VERSION;
    if(process.env.AC_DEPLOYMENT_VERSION != 0) {
      const ret = await db.table('vue_sfc').where({sfc, version}).findOne();
      if(ret) {
        context.set('content-type', 'text/javascript');
        return ret.source;
      }
    }
    try {
      let source = fs.readFileSync(`./src/${sfc.replace('@', 'components')}`, 'utf-8');
      source = source.replace(/(import\s+[^\n]*?\s+from\s+['"])\s*@\/((?:\w|\/|\.)+)\s*(['"])/img, '$1/lib/loader?sfc=components/$2$3');

      let compiled = compile(source, {
        filename: sfc.replace(/^.*\//, ''),
        autoImportCss: false,
        autoResolveImports: false,
        isProd: true
      });

      const cssCode = compiled.css.map(s => s.code).join('\n');
      const cssInJS = `;(function(){const el = document.createElement('style');
el.innerHTML = \`${cssCode}\`;
document.body.appendChild(el);}());`;

      compiled = `${compiled.js.code}
${cssInJS}`;

      context.set('content-type', 'text/javascript');
      source =  compiled.replace(/(import\s+[^\n]*?\s+from\s+['"])\s*vue\s*(['"])/img, '$1https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js$2');
      if(process.env.AC_DEPLOYMENT_VERSION != 0) await db.table('vue_sfc').save({sfc, version, source});
      return source;
    } catch(ex) {
      console.error(ex);
    }
  }
  context.status(404);
  return {error: 'not found'};
};
