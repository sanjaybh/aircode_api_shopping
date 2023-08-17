# Extensions

The official team and the open-source community have contributed a series of extension features to AirCode.

## Router

AirCode defaults to file-mapped routing, where JS files correspond to cloud functions. The path and filename serve as the routing rules.

However, if you wish to utilize advanced custom routing, AirCode offers extensions to assist you in achieving that.

Firstly, you need to set an environment variable named `EXPERIMENTAL_ROUTE` and set its value to `1`.

<img src="https://aircode-yvo.b-cdn.net/resource/1692253982139-1lhlz51e5bb.jpg" width="350">

This setting informs AirCode runtime to use the extended routing rules.

Now you can install the `aircode-router` NPM package.

<img src="https://aircode-yvo.b-cdn.net/resource/1692255131343-z5ssmxg54mg.jpg" width="300">

Next, modify the content of your project's hello.js file as follows:

```js
const { Router } = require('aircode-router');

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

Then, configure the debug data:

<img src="https://aircode-yvo.b-cdn.net/resource/1692255265622-wgfazwnsag.jpg" width="300">

You can set the `x-mock-route` request header for simulation debugging.

Finally, run the Debug, and you will receive the following result:

```json
{
  "params": {
    "id": "yvo"
  }
}
```

If you deploy the code online, you can obtain the same result by accessing the path `/hello/users/yvo`.

For more details, please refer to [aircode-router](aircode-router).

## Web App

While AirCode is commonly used for developing and deploying APIs, it can actually be utilized for creating simple web applications as well. You can even deploy all frontend pages on AirCode.

The AirCode community offers a simple application framework that you can use to render your view pages.

The usage is quite straightforward. You can take a look [here](aircode-app) for more details.

We've also prepared a small example of a [to-do list](../examples/web-app-todolist) for you. It can help you quickly grasp the usage of aircode-app.

