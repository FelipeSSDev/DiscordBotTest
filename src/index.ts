import Discord from 'discord.js';
import commandsCallback from './commands/index';
import dotenv from 'dotenv';

const client = new Discord.Client();

dotenv.config();

client.on('ready', () => {
  if (client.user) console.log(`Logged in as ${client.user.tag}!`);
  else console.log(`Failed to login!`);
});

client.on('message', commandsCallback);

client.login(process.env.BOT_TOKEN);
