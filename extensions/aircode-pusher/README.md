# AirCode Pusher

AirCode combined with [Pusher](https://pusher.com/) offers a set of extremely simple and easy-to-use real-time communication services.

First, install the dependency package and import `aircode-pusher:

<img src="https://aircode-yvo.b-cdn.net/resource/1691045457929-7rhky4e0aws.jpg" alt="aircode-pusher" width="200">

Then, you can deploy a communication service through cloud functions with just a few lines of code:

```js
const {Pusher} = require('aircode-pusher');
const pusher = new Pusher(Pusher.DEBUG_CONFIG);

// Create a channel
const channel = pusher.channel('my-channel');

channel.subscribe('test-event', async ({event, data, channel}) => {
  // list the test-event from client, and push message to client through channel.trigger
  await channel.trigger(event, {
    message: 'welcome', 
    from: channel.name
  });
});

module.exports = pusher.listen();
```

To establish a connection, first, include the client-side JS in your web browser:

```html
<script src="https://unpkg.com/aircode-pusher"></script>
```

Next, use the cloud function URL to create a connection:

```js
const pusher = new Pusher('https://qzwyiigked.us.aircode.run/hello');
(async () => {
  // Establish a connection to the service and retrieve all the channels the server has subscribed to.
  const channels = await pusher.connect();
  // To listen for data
  channels[0].bind('test-event', (data) => {
    console.log(data);
  });
  // To send data
  channels[0].send('test-event', 'hello');
})();
```

## Quick Start

If you have never used AirCode to create real-time communication applications, we recommend starting with the [Getting Started with Real-Time Communication](docs/en/getting-started.md) guide.

## API Definition

[AirCode-Pusher-api](docs/en/pusher-api.md)