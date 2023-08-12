const {db} = require('aircode');
const {Pusher} = require('aircode-pusher');
const pusher = new Pusher(Pusher.DEBUG_CONFIG);

const historyTable = db.table('messages');
const usersTable = db.table('users');

const chatChannel = pusher.channel('chat-channel');
const gameChannel = pusher.channel('game-channel');

chatChannel.subscribe('chat', async ({event, data, channel}) => {
  await historyTable.save(data);
  // brocast
  channel.responseBody = await channel.trigger(event, data);
});

chatChannel.subscribe('get-history', async ({event, data, channel}) => {
  // Get history messages
  const count = data.count || 10;

  const messages = await historyTable.where()
    .sort({createdAt: -1})
    .projection({user: true, message: true, datetime: true})
    .limit(10).find();

  channel.responseBody = {messages};
});

gameChannel.subscribe('join', async ({event, data, channel}) => {
  const startTime = Date.now();
  const record = {...data, startTime};
  await channel.trigger(event, record);
  const users = await usersTable.where({update: db.gte(startTime - 3000)}).find();

  await usersTable.save({...record, update: startTime});

  channel.responseBody = {time: startTime, users};
});

gameChannel.subscribe('heart', async ({event, data, channel}) => {
  const {user} = data;
  const update = Date.now();
  await usersTable.where({user}).set({update}).save();
  const lostUsers = await usersTable.where({update: db.lt(update - 3000)}).find();
  await usersTable.delete(lostUsers);

  channel.responseBody = lostUsers;
});

gameChannel.subscribe('moving', async ({event, data, channel}) => {
  channel.responseBody = await channel.trigger(event, data);
});

module.exports = pusher.listen();