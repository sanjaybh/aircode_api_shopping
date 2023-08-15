const {db} = require('aircode');
const {Pusher} = require('aircode-pusher');
const pusher = new Pusher(Pusher.DEBUG_CONFIG);

const historyTable = db.table('messages');
const channel = pusher.channel('chat-channel');

channel.subscribe('chat', async ({event, data}) => {
  await historyTable.save(data);
  await channel.trigger(event, data);
});

channel.subscribe('get-history', async ({event, data, channel}) => {
  // Get history messages
  const count = data.count || 10;

  const messages = await historyTable.where()
    .sort({createdAt: -1})
    .projection({user: true, message: true, datetime: true})
    .limit(10).find();

  channel.responseBody = {messages};
  // await channel.trigger(event, {messages});
});

module.exports = pusher.listen();
