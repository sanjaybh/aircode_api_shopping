// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const path = require('node:path');
const fs = require('node:fs');
const { fileURLToPath } = require('node:url');
const { build:viteBuild } = require('vite');

// const __dirname = fileURLToPath(new URL('.', import.meta.url));

const deployTable = aircode.db.table('deploys');
const fileTable = aircode.db.table('_files');

async function build() {
  const root = path.resolve(__dirname, '..');
  await viteBuild({
    root,
  });

  const indexFile = path.join(root, 'dist', 'index.html');
  let htmlContent = fs.readFileSync(indexFile, {encoding: 'utf-8'});

  const assetsPath = path.join(root, 'dist', 'assets');
  const assetsFileName = fs.readdirSync(assetsPath);

  const assets = assetsFileName.map(async (asset) => {
    const file = path.join(assetsPath, asset);
    const content = fs.readFileSync(file);

    await fileTable.where().delete();
    const res = await aircode.files.upload(
      content,
      asset,
    );
    htmlContent = htmlContent.replace(new RegExp(`/assets/${res.name}`, 'mg'), res.url);
    return res;
  });

  await Promise.all(assets);

  await deployTable.where().delete();
  await deployTable.save({htmlContent, version: process.env.AC_DEPLOYMENT_VERSION});
  
  return htmlContent;
};

module.exports = { build };
