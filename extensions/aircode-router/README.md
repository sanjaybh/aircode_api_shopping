# AirCode Router

The official router for AirCode.

## Usage

💡 **To use this extension, you need to set `EXPERIMENTAL_ROUTE=1` to enable path router first.**

<img src="https://aircode-yvo.b-cdn.net/resource/1691464529285-2qz32tn5hyx.jpg" width="300">

Suppose your cloud function is named `hello`:

```js
const Router = require('aircode-router');

const router = new Router({
  prefix: '/hello',
});

router.all('/users/:id', (params, context, next) => {
  return {
    params,
  };
});

module.exports = router.routes();
```

Then if you visit: `/hello/users/yvo`, you will get the userId "yvo" in `params`.

```json
{
  "params": {
    "id": "yvo"
  }
}
```

For debugging purposes, you can set the x-mock-route request header to simulate the route's path.

<img src="https://aircode-yvo.b-cdn.net/resource/1691464785757-i148e25gg1m.jpg" width="300">

## Router API

This router extension is developed based on [@koa/router](https://github.com/koajs/router), and its API is fully compatible with @koa/router. The only exception is that the function parameters have been adjusted to comply with the AirCode cloud function specifications(with `params` as first parameter, and `context` as the second parameter).

You can find the API documentation here and seamlessly utilize most of the methods: [API Reference](https://github.com/koajs/router/blob/master/API.md)
