import {Pusher} from '../src/index.js';

const pusher = new Pusher(Pusher.DEBUG_CONFIG);

pusher.channel('my-channel').subscribe('test-event', async ({event, data, channel}) => {
  await channel.trigger(event, {message: 'received', event, data, channel:channel.name});
});

pusher.channel('my-channel').subscribe('*', async ({event, data, channel}) => {
  console.log('received', {event, data, channel:channel.name});
});

pusher.channel('my-channel2').subscribe('test-event', async ({event, data, channel}) => {
  await channel.trigger(event, {message: 'received', event, data, channel:channel.name});
});

export default pusher.listen();
