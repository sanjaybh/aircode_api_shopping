// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const path = require('node:path');
const fs = require('node:fs');
const mime = require('mime');
const compile = require('./lib/compile');

module.exports = async function (params, context) {
  const route = context.route;
  console.log(route);
  const filepath = path.join('src', route);

  if(!fs.existsSync(filepath)) {
    context.status(404);
    return {error: 'Not found.'};
  }

  const ext = path.extname(filepath);

  let source = fs.readFileSync(filepath, {encoding: 'utf-8'});
  let type = mime.getType(filepath);

  if(ext === '.vue') {
    source = await compile(source, path.basename(filepath));
    type = mime.getType('.js');
  }

  // if(type === 'application/javascript') {
  //   source =  source.replace(/(import\s+[^\n]*?\s+from\s+['"])\s*vue\s*(['"])/img, '$1https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js$2');
  // }

  context.set('content-type', type);
  
  return source;
};
