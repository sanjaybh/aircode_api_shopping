// @see https://docs.aircode.io/guide/functions/
const axios = require('axios');
const Discord = require('discord.js');

async function registerCommands(appId, commands) {
	const { DISCORD_BOT_TOKEN } = process.env;

  try {
    // Use discord sdk register chatgpt command
    const rest = new Discord.REST({ version: '10' }).setToken(
      DISCORD_BOT_TOKEN
    );
    const data = await rest.put(Discord.Routes.applicationCommands(appId), {
      body: commands,
    });

    console.log('Command register response:', data);

    if (data) {
      return {
        success: true,
        message: `WOW, slash command ${data
          .map((command) => `/${command.name}`)
          .join(' ')} registered`,
      };
    }
  } catch (err) {
    console.error('Error from registering commands:', err);
  }
}

module.exports = async function (params, context) {
  console.log('Received params:', params);
  const slashCommandName = 'chatgpt';

  const ChatGPTCommand = {
    name: slashCommandName,
    description: 'Interact with ChatGPT',
    options: [
      {
        name: 'prompt',
        type: 3,
        description: 'The message sending to ChatGPT',
        required: true,
      },
    ],
  };

  const commands = [ChatGPTCommand];
  // Register ChatGPT command
  const res = await registerCommands(process.env.DISCORD_APP_ID, commands);

  return res;
};
