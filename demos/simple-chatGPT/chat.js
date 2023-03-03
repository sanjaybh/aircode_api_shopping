const lark = require('./larkSDK');
const aircode = require('aircode');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OpenAISecret });
const openai = new OpenAIApi(configuration);

const chatGPT = async (content) => {
  return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'assistant', content }],
  });
};

module.exports = async function(params, context) {
  const eventId = params.header.event_id;
  const contentsTable = aircode.db.table('contents');
  const contentObj = await contentsTable.where({ eventId }).findOne();

  // 飞书重复调用直接返回
  if (contentObj) return;
  
  const message = params.event.message;
  const content = JSON.parse(message.content).text.replace('@_user_1 ', '');
  const sender = params.event.sender;
  await contentsTable.save({ 
    eventId: params.header.event_id,    
    msgId: message.message_id, 
    openId: sender.sender_id.open_id,
    content,
  });
  const result = await chatGPT(content);
  const replyContent = `${result.data.choices[0].message.content.trim()}`;
  await lark.reply({
    msgId: message.message_id, 
    openId: sender.sender_id.open_id,
    content: replyContent,
  });
  return { challenge: params.challenge };
}
