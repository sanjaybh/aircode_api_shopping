# 实时通信 API

本文展示了 `aircode-pusher` 下的所有 API 说明及示例。

## 服务端 API

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

根据配置创建一个 `Pusher` 对象，你可以通过 [pusher.com](https://pusher.com) 平台创建应用，然后获取到相应的配置信息。

<img src="https://aircode-yvo.b-cdn.net/resource/1691047640890-843kgmoaqvy.jpg" alt="Get API Key" width="450">

如果你还没有 [pusher.com](https://pusher.com) 的账号，你也可以先使用 `Pusher.DEBUG_CONFIG` 临时配置进行开发。

> 注意⚠️： `Pusher.DEBUG_CONFIG` 仅用于开发调试，请勿直接用于线上服务。

### pusher.channel(name)

```js
const channel = pusher.channel('my-channel')
```

创建并返回一个频道（Channel 对象），可以通过它订阅事件。

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

Channel 对象通过 subscribe 订阅事件，名称为 eventName 的事件消息将被接收。可以通过 `*` 来接收任意名称的事件。

### channel.trigger(eventName, data, channel);

```js
channel.trigger('some-event', {data: 'somedata'});
channel.trigger('some-event', {data: 'somedata'}, 'other-channel');
```

Channel 对象通过 trigger 方法推送消息给客户端，evenName 是事件名，data 是数据，默认推送的 channel 是当前 channel，但也可以通过 channel 参数传别的 channel 名进行推送。

### channel.responseBody

```js
channel.subscribe('foobar', ({event, data, channel}) => {
  channel.responseBody = {status: 'success'};
});
```

Channel可以返回一个 JSON 对象，这个对象会作为客户端 send 的返回值，直接通过 HTTP 返回。

### pusher.listen()

```js
module.exports = pusher.listen();
```

`pusher.listen` 返回云函数，将它 export 出来，就完成服务端配置。

## 客户端 API

### new Pusher(apiUrl)

```js
const pusher = new Pusher('https://qzwyiigked.us.aircode.run/hello');
```

根据云函数创建客户端 Pusher 对象。

### pusher.connect()

```js
const channels = await pusher.connect();
```

异步函数，等待 Pusher 对象建立连接完毕，根据服务端定位频道返回对应的客户端 Channel 对象。

### channel.bind(eventName, data)

```js
const channel = channels[0];
channel.bind('foobar', (data) => {
  console.log('received', data);
});
```

监听对应的事件。

### channel.unbind(eventName, data)

```js
const channel = channels[0];
const handler = (data) => {
  console.log('received', data);
  channel.unbind('foobar', handler);
};

channel.bind('foobar', handler);
```

取消监听对应的事件。

### channel.bindOnce(eventName, data)

```js
const channel = channels[0];
channel.bindOnce('foobar', (data) => {
  console.log('received', data);
});
```

监听对应的事件，只监听一次。

### channel.send(eventName, data)

```js
const result = channel.send('foobar', {message: 'hello world'});
```

异步函数，将数据推送给服务端。
