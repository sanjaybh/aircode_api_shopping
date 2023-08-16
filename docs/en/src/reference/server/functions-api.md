# Function API {#intro}

[[toc]]

## Function Template {#template}

Every cloud function needs `module.exports` an `async` function, this function contains two variables: `params` and `context`. E.g:

```js
module.exports = async function(params, context) {
  return {
    message: 'Hi, AirCode.',
  };
}
```

## `params`

The request data when accessing functions. It may represent different data depending on the request method.

### POST Parameters {#post-params}

`{Object | string | Buffer}`：When initializing a POST，`params` represents the content in the Request Body，and the concrete type is decided by Content Type：

| Content Type | Params Data Type |
| :---- | :---- |
| `application/json` | `Object` |
| `multipart/form-data` | `Object` |
| `text/plain` | `string` |
| `application/x-www-form-urlencoded` | `Object` |
| Others（e.g. `application/octet-stream`）| `Buffer` |

**Guide**

[Retrieve POST Parameters](/guide/functions/post-params)

### GET Parameters {#get-params}

`{Object}`：When initializing a GET，`params` is a key-value object converted by Query String.

::: tip Tips
The value in the object is of `string` or `Array<string>` type, for example `params.a === '1'` when `?a=1`.
:::

**Guide**

[Retrieve GET Parameters](/guide/functions/get-params)

## `context`

The context of the request, also contains some helper methods.

### `context.headers`

```js
const contentType = context.headers['content-type'];
const myCustomHeader = context.headers['x-my-header'];
```

`{Object}`：Get the headers of the HTTP request in the form of key-value pairs.

::: tip Tips
The keys in the object are all lowercase, for example, it should be `context.headers['content-type']`, not `context.headers['Content-Type']`.
:::

### `context.method`

`{string}`：Get the method of the HTTP request, the value is all uppercase, for example `'POST'`、`'GET'`。

### `context.request`

`{Request}`：Node.js request object.

### `context.req`

Abbreviation for `context.request`.

### `context.response`

`{Response}`：Node.js response object.

### `context.res`

Abbreviation for `context.response`.

### `context.path`

```js
// /hello?hi=aircode
const path = context.path;
// => /hello
```

`{string}` Get the complete path of the HTTP request.

### `context.url`

```js
// /hello?hi=aircode
const url = context.url;
// => /hello?hi=aircode
```

`{string}` Get the complete URL of the HTTP request, including the path and query string.

### `context.protocol`

`{string}` Get the protocol of the HTTP request, which is `https` in AirCode.

### `context.query`

```js
// ?hello=world&abc=xyz&abc=123
const hello = context.query.hello;
// => 'world'
const abc = context.query.abc;
// => [ 'xyz', '123' ] 
```

`{Object}`: Get the query String converted key-value object from the HTTP request, same as `params` in GET request.

::: tip Tips
The value in the object is of `string` or `Array<string>` type, for example `context.query.a === '1'` when `?a=1`.
:::

### `context.cookies`

`{Object}`: Get the cookies of the HTTP request in the form of key-value pairs.

::: tip Tips
The value in the object is of `string` type, you should parse JSON string if client stored a stringify string in the cookie.
:::

### `context.trigger`

`{string}`: Obtain the source of the function call, can be one of the following values:

| Value | Trigger | Guide |
| ---- | ---- | ---- |
| `'HTTP'` | via HTTP/HTTPS | [Invoke Functions](/guide/functions/invoke) |
| `'SCHEDULE'` | via scheduled tasks | [Scheduled Tasks](/guide/functions/scheduled-tasks) |
| `'DEBUG'` | via online debugging | [Debug Online](/guide/functions/debug) |

### `context.set(field, value)`

```js
context.set('content-type', 'application/json');
context.set('x-abc-header', 'hello world');
```

Set the returned HTTP Response Headers.

**Parameter**

- `{string} field`: the key of the Response Header to set
- `{string} value`: The value of the Response Header to set

### `context.remove(field)`

```js
context.remove('x-abc-header');
```

Delete the HTTP Response Header corresponding to the `field`.

**Parameter**

- `{string} field`: the key of the Response Header to delete

### `context.setCookie(name, value[, options])`

```js
context.setCookie('token', 'aircode', { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });
```

Sets a cookie named `name` with the `value` value.

**Parameter**

- `{string} name`: The name of the cookie to be set.
- `{string} value`: The value to be set for the cookie.
- `{object} options`: Cookie options.

For specific `options` details, please refer to [express response cookie](https://expressjs.com/en/5x/api.html#res.cookie).

### `context.clearCookie(name[, options])`

```js
context.clearCookie('token', { path: '/admin' });
```

Clears the cookie value of the cookie named `name`.

**Parameter**

- `{string} name`: The name of the cookie to be cleared.
- `{object} options`: Cookie options.

### `context.redirect(url[, code])`

```js
context.redirect('https://aircode.io');
```

Forces a redirection to the specified URL with the status `code`, defaulting to `302`.

**Parameter**

- `{string} url`: The URL to redirect to.
- `{number} code`: The HTTP Status Code to use for the redirect, with a default value of `302`.

### `context.status(code)`

```js
context.status(201);
```

::: tip Tips
By default, the Status Code returned by the function is `200` for successful execution and `500` for failed execution.
:::

Used to set the returned HTTP Status Code.

**Parameter**

- `{number} code`: The HTTP Status Code to set. You can find all codes at [Wikipedia - List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
