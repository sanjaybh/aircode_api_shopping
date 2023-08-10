# AirCode Modular

Compile cloud functions to ES Modules.

## Usage

```js
// index.mjs
import {getContext, modular} from 'aircode-modular';

function add(x, y) {
  return x + y;
}

function getUrl(context) {
  const {url} = context;
  return url;
}

export default modular({
  add,
  getUrl,
});
```

Assuming the deployed cloud function URL is: `https://au215ybu51.us.aircode.run/index`

You can write client-side code in the following way:

```js
import {add, getUrl} from 'https://au215ybu51.us.aircode.run/index';

console.log(await add(1, 2)); // => 3
console.log(await getUrl()); // => /index
```
