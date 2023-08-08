# AirCode Adapter

Run express and koa apps in AirCode.

## Usage

💡 **To use this extension, we recommand you to set `EXPERIMENTAL_ROUTE=1` to enable router first.**

<img src="https://aircode-yvo.b-cdn.net/resource/1691471034457-wk7yuztkp1.jpg" width="300">


### Setup dependencies

<img src="https://aircode-yvo.b-cdn.net/resource/1691493426210-ucy8gnvy7hf.jpg" width="300">

### Run Express

```js
// test-express.js
const express = require('express');
const app = express();
const { runExpress } = require('aircode-adapter');

const router = express.Router();

router.post('/', function (req, res) {
  res.send({res: 'hello'});
});

app.use('/test-express', router);

module.exports = runExpress(app);
```

### Run Koa

```js
// test-koa.js
const Koa = require('koa')
const { runKoa } = require('aircode-adapter');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router({
  prefix: '/test-koa'
});

router.all('/users/:id', (ctx, next) => {
  // ctx.router available
  ctx.body = {
    params : ctx.params,
    url: ctx.url,
    router: ctx.router,
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = runKoa(app);
```
