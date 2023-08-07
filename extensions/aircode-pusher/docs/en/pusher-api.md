# Real-Time Communication API

This document showcases all the API specifications and examples for `aircode-pusher`.

## Server-Side API

### new Pusher({appId, key, secret, cluster, useTLS = true})

```js
const pusher = new Pusher({
  appId: 'xxxxxx',
  key: 'xxxxxx',
  secret: 'xxxxxx',
  cluster: 'mt1',
  useTLS: true,
});
```

If you don't have an account on [pusher.com](https://pusher.com) yet, you can also use `Pusher.DEBUG_CONFIG` for temporary development configuration.

> Warning⚠️: `Pusher.DEBUG_CONFIG` is only intended for development debugging purposes and should **NOT** be used directly in production services.

### pusher.channel(name)

```js
const channel = pusher.channel('my-channel')
```

Create and return a channel (Channel object) that allows you to subscribe to events.

### channel.subscribe(eventName, callback)

```js
channel.subscribe('foobar', async ({event, data, channel}) => {
  // subscribe foobar event
  console.log('data received', data, 'from', channel.name);
  channel.trigger(event, {ACK: 'ACK message'});
});

channel.subscribe('*', ({event, data, channel}) => {
  // subscribe all events
});
```

Channel objects subscribe to events, and event messages with the specified eventName will be received. You can use `*` to receive event messages with any eventName.

### channel.trigger(eventName, data, channel);

```js
channel.trigger('some-event', {data: 'somedata'});
channel.trigger('some-event', {data: 'somedata'}, 'other-channel');
```

The Channel object pushes messages to the client using the `trigger` method. `eventName` is the name of the event, and `data` is the payload. By default, the message is pushed to the current channel, but you can also specify a different channel name using the `channel` parameter for broadcasting to other channels.

### channel.responseBody

```js
channel.subscribe('foobar', ({event, data, channel}) => {
  channel.responseBody = {status: 'success'};
});
```

The Channel can return a JSON object, which will be used as the return value for the client's `send` function and can be directly returned through HTTP.

### pusher.listen()

```js
module.exports = pusher.listen();
```

`pusher.listen` returns a cloud function. By exporting it, you complete the server-side configuration.

## Client-Side API

### new Pusher(apiUrl)

```js
const pusher = new Pusher('https://qzwyiigked.us.aircode.run/hello');
```

Create a client-side Pusher object based on the cloud function.

### pusher.connect()

```js
const channels = await pusher.connect();
```

An asynchronous function that waits for the Pusher object to establish a connection and returns the corresponding client-side Channel object based on the server-side channel.

### channel.bind(eventName, data)

```js
const channel = channels[0];
channel.bind('foobar', (data) => {
  console.log('received', data);
});
```

Listening to the corresponding events on the client-side Channel object.

### channel.unbind(eventName, data)

```js
const channel = channels[0];
const handler = (data) => {
  console.log('received', data);
  channel.unbind('foobar', handler);
};

channel.bind('foobar', handler);
```

To cancel or remove a previously attached event listener from the client-side Channel object, you can use the `unbind` method. 

### channel.bindOnce(eventName, data)

```js
const channel = channels[0];
channel.bindOnce('foobar', (data) => {
  console.log('received', data);
});
```

To listen to a specific event only once, you can use the `bindOnce` method on the client-side Channel object. 

### channel.send(eventName, data)

```js
const result = channel.send('foobar', {message: 'hello world'});
```

An asynchronous function to push data to the server.
