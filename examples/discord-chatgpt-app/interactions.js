// @see https://docs.aircode.io/guide/functions/
const axios = require('axios');
const nacl = require('tweetnacl');
const { Configuration, OpenAIApi } = require('openai');

const { EmbedBuilder } = require('discord.js');

const {
  verifyKey,
  InteractionType,
  InteractionResponseType,
} = require('discord-interactions');

const apiKey = process.env.OPENAI_KEY;

const discordToken = process.env.DISCORD_BOT_TOKEN;

// Your public key can be found on your application in the Developer Portal
const discordPublicKey = process.env.DISCORD_PUBLIC_KEY;

// Slash command's name you use tointeract with bots on Discord after typing /
const slashCommandName = 'chatgpt';

// Use openAI API to fetch ChatGPT completion
const getOpenAIChatCompletion = async (question) => {
  try {
    const configuration = new Configuration({
      apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      // OpenAI models https://platform.openai.com/docs/models
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'assistant', content: question }],
    });

    console.log(
      'ChatGPT completion data:',
      completion.data.choices[0].message.content.trim()
    );
    return {
      code: 0,
      data: completion.data.choices[0].message.content.trim(),
    };
  } catch (error) {
    console.error(`OpenAI api error: ${error.message}`);
    return {
      code: 1,
      message: `OpenAI api error: ${error.message}`,
    };
  }
};

// Build an Embed (rich embed) object for replied message
const createResponseEmbed = (response) => {
  const embed = new EmbedBuilder().setColor('#37393E').setDescription(response);

  return { embeds: [embed] };
};

module.exports = async function (params, context) {
  console.log('params context', params);

  // Get signature and timestamp from headers
  const signature = context.headers['X-Signature-Ed25519'];
  const timestamp = context.headers['X-Signature-Timestamp'];
  // Get rawBody content
  const body = context.rawBody;

  // Verify whether the request from discord
  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(discordPublicKey, 'hex')
  );

  if (!isVerified) {
    context.status(401);
    return 'Invalid request signature';
  }

  // Interaction type and data
  const { type, id, data, token } = params;

  console.log('params', params);
  // Handle verification requests reply with PONG
  if (type === InteractionType.PING) {
    return { type: InteractionResponseType.PONG };
  }

  // Handle the user registered interaction command
  if (
    type === InteractionType.APPLICATION_COMMAND &&
    data.name === slashCommandName
  ) {
    const userInput = data.options[0].value;

    // Immediately acknowledge the interaction
    try {
      await axios.post(
        `https://discord.com/api/v9/interactions/${id}/${token}/callback`,
        {
          type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        }
      );
    } catch (error) {
      console.error('Error acknowledging the interaction:', error);
      return;
    }

    const response = await getOpenAIChatCompletion(userInput);
    console.log('response form OpenAI ChatCompletion: ', response);

    // Patch message
    if (response.code === 0) {
      try {
        await axios.patch(
          `https://discord.com/api/v9/webhooks/${process.env.DISCORD_APP_ID}/${token}/messages/@original`,
          {
            content: `> ${userInput} \n ${response.data}`,
          }
        );
      } catch (error) {
        console.error('Error editing the original response:', error.message);
        return;
      }
    }
  }
};
