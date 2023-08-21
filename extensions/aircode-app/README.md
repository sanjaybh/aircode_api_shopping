# AirCode App

A simple webapp framework for [AirCode](https://aircode.io/).

## Usage

0. Install aircode-app as dependencies.

1. Entry js file:

```js
// @see https://docs.aircode.io/guide/functions/
const App = require('aircode-app');

const app = new App();

app.use(async (ctx, next) => {
  await next();
  console.log('foobar');
});

app.use(async (ctx, next) => {
  const {params} = ctx;
  ctx.set('content-type', 'text/html');
  ctx.body = app.display('./hello.html', {params});
});

module.exports = app.run();
```

2. HTML Templates & JS & CSS:

```html
<!-- hello.html -->
<!DOCTYPE html>
<html lang="en">
${app.display('./head.tpl')}
<body>
  <h1>${JSON.stringify(params)}</h1>
</body>
${app.display('./footer.tpl')}
</html>
```

```html
<!-- head.tpl -->
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" href="https://aircode.io/favicons/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="https://aircode.io/favicons/apple-touch-icon.png"></link>
  <link rel="icon" type="image/png" sizes="32x32" href="https://aircode.io/favicons/favicon-32x32.png"></link>
  <link rel="icon" type="image/png" sizes="16x16" href="https://aircode.io/favicons/favicon-16x16.png"></link>
  <meta name="keywords" content="AirCode,Nodejs,Node.js,JavaScript,TypeScript" />
  <meta name="description" content="Code, debug, deploy, operate, and share your APIs with zero-config, all in a single place." />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://aircode.io/" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="AirCode | Serverless Node.js stack for API development" />
  <meta property="og:description" content="Code, debug, deploy, operate, and share your APIs with zero-config, all in a single place." />
  <meta property="og:url" content="https://aircode.io/" />
  <meta property="og:site_name" content="AirCode" />
  <meta property="article:publisher" content="https://twitter.com/aircode_io" />
  <meta property="og:image" content="https://aircode.io/meta-image-20230808133206.png" />
  <meta property="article:modified_time" content="2023-07-21T15:09:45+00:00" /> 
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="675" />
  <meta property="og:image:type" content="image/png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@aircode_io" />
  <meta name="twitter:title" content="AirCode" />
  <meta name="twitter:description" content="Serverless Node.js stack for API development." />
  <meta name="twitter:image" content="https://aircode.io/meta-image-20230808133206.png" />

  <title>Document</title>
  <style>
${app.file('./style.css')}
  </style>
</head>
```

```html
<!-- footer.tpl -->
<script>
${app.file('./script.js')}
</script>
```

```css
/* style.css */
body {
  background-color: #000;
  color: #fff;
}
```

```js
// script.js
console.log('hello world');
```

**You may use this [template](https://aircode.cool/gkek5d5ctr) for startup.**

---

That's all.

Enjoy it!