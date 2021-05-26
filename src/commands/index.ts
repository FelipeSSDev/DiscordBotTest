import {readdirSync} from 'fs';
import {Message} from 'discord.js';
const PREFIX = '::';

export default (message: Message) => {
  const files = readdirSync(__dirname)
    .filter((fileName) => fileName !== 'index.ts')
    .map((fileName) => fileName.slice(0, -3));

  if (!message.content.startsWith(PREFIX)) return;
  const [command, ...args] = message.content.slice(PREFIX.length).split(' ');

  const commandExists = files.some(async (file) => {
    if (command === file) {
      const {default: commandHandler} = require(`./${file}.ts`);

      commandHandler(message, args);

      return true;
    }
  });

  if (!commandExists) return message.channel.send('Comando inválido');
};
