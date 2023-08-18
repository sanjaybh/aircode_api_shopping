const App = require('aircode-app');

const app = new App();

app.use(ctx => {
  const lang = ctx.params.lang || 'en-US';
  const spkid = ctx.params.spkid || 7;
  if(spkid > 14 || spkid < 7) spkid = 7;
  ctx.set('content-type', 'text/html');
  ctx.body = app.display('./views/index.html', {lang, spkid});
});

module.exports = app.run();