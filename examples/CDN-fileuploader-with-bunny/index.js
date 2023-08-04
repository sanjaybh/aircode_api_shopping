// @see https://docs.aircode.io/guide/functions/
const App = require('aircode-app');

const app = new App();

app.use((ctx, next) => {
	ctx.set('content-type', 'text/html');
	ctx.body = app.display('./upload.tpl');
});

module.exports = app.run();
