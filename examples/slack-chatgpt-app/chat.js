// Import dependencies from AirCode.io, including database and file storage methods
const aircode = require('aircode');

// Import axios for making http requests
const axios = require('axios');

// Import the OpenAI SDK
const openai = require("openai");

// Import the Slack SDK, related documentation https://slack.dev/node-slack-sdk/
const { WebClient } = require('@slack/web-api');

// Get the Slack bot Token from environment variables
const slackBotToken = process.env.SlackBotToken;
if (!slackBotToken) return { error: 'Please configure the Slack bot Token according to the tutorial.' };
const slackClient = new WebClient(slackBotToken);

// Get the OpenAI Secret from environment variables
const OpenAISecret = process.env.OpenAISecret;
let chatGPT = null;
if (OpenAISecret) {
  const configuration = new openai.Configuration({ apiKey: OpenAISecret });
  const client = new openai.OpenAIApi(configuration);

  // Method to chat with ChatGTP, pass in a string
  chatGPT = async (content) => {
    return await client.createChatCompletion({
      // Use the latest 3.5 model currently available from OpenAI, if GPT4 is released later, modify this parameter
      // OpenAI models parameter list https://platform.openai.com/docs/models
      model: 'gpt-3.5-turbo',
      // Set the role of ChatGPT as an assistant
      messages: [{ role: 'assistant', content }],
    });
  };
}

// Entry function for the Slack ChatGPT bot
module.exports = async function(params, context) {

  // All parameters for calling the current function can be obtained directly from params
  // For Slack event request validation, it is required to return directly when there is a challenge parameter
  if (params.challenge) return { challenge: params.challenge };
  
  // Slack bot will have a client_msg_id for every user message
  const msgId = params.event.client_msg_id;

  // You can easily write data to the database using the database
  // Instantiate a table called contents
  const contentsTable = aircode.db.table('contents');
  
  // Search the contents table for an entry with a msgId that matches the current one
  const contentObj = await contentsTable.where({ msgId }).findOne();

  // If contentObj has a value, it means this event has occurred before
  // Since the response time of ChatGPT is relatively long, this situation may be Slack retrying, return directly to prevent repeated calls
  // This does not take effect when the current environment is in DEBUG mode, which is convenient for debugging
  if (contentObj && context.trigger !== 'DEBUG') return;
  
  // Get the content of the message sent by the user to the bot, remove the at character part
  const message = params.event.text.replace(/<@.*?>\s*/,'');

  // Get the information of the person who sent the message
  const senderId = params.event.user;

  // The message to be returned to the user
  let replyContent = '';

  // Determine if there are other types of files (e.g., images), as ChatGPT currently only supports text content
  if (!params.event.files) {

    // By default, the content sent by the user is returned to the user, which is just a bot that directly returns the conversation
    replyContent = message;    

    // Store the message body information in the database for subsequent query history or context support
    await contentsTable.save({ msgId, senderId, message });

    // If the OpenAI Key is configured, let ChatGPT reply
    if (OpenAISecret) {

      // Send the user's specific message to ChatGPT
			try {
	      const result = await chatGPT(message);	

	      // Send the ChatGPT reply obtained to the user
	      replyContent = `${result.data.choices[0].message.content.trim()}`;    
			} catch (err) {
				err = err.toJSON();
				if (err.status === 429) return {
					error: 'You encounter a OpenAI ChatGPT 429 situation, need to go to OpenAI and pay for more quotas. ChatGPT Plus is only for web-based payments, the API is another channel that requires payment per token.' };
				return err.message;
			}
    }

  } else {
    replyContent = 'Sorry, we currently do not support other types of files.';
  }
  
  // Send the processed message to the user via the Slack bot
  await slackClient.chat.postMessage({
    channel: params.event.channel,
    text: `<@${senderId}> ${replyContent}`,
    thread_ts: params.event.ts,
    reply_broadcast: true,
  });

  // The entire function call is complete and needs to return
  return null;
};

