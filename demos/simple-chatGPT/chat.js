const lark = require('./larkSDK');

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
  const message = params.event.message;
  const content = JSON.parse(message.content).text.replace('@_user_1 ', '');
  const sender = params.event.sender;
  console.log('-------------------------------');
  console.log(content);
  const result = await chatGPT(content);
  const replyContent = `${result.data.choices[0].message.content.trim()}`;
  console.log(replyContent);
  console.log('-------------------------------');
  await lark.reply({
    msgId: message.message_id, 
    openId: sender.sender_id.open_id,
    content: replyContent,
  });
  return { challenge: params.challenge };
}
