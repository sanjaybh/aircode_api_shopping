const { compile } = require('vue-simple-compiler');

module.exports = async function(source, filename) {
  let compiled = compile(source, {
    filename,
    autoImportCss: false,
    autoResolveImports: false,
    isProd: true,
  });

  const cssCode = compiled.css.map(s => s.code).join('\n');
  const cssInJS = `;(function(){const el = document.createElement('style');
el.innerHTML = \`${cssCode}\`;
document.body.appendChild(el);}());`;

  compiled = `${compiled.js.code}
${cssInJS}`;

  return compiled;
}