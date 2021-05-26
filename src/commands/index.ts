import {readdirSync} from 'fs';
import {Message} from 'discord.js';
import Command from '../models/Command';

export default (message: Message) => {
  const command = new Command(message);

  if (!command.startsWithPrefix()) return;

  const files = readdirSync(__dirname)
    .filter((fileName) => fileName !== 'index.ts')
    .map((fileName) => fileName.slice(0, -3));

  const commandExists = files.some((file) => {
    if (command.argument === file) {
      const {default: commandFunction} = require(`./${file}.ts`);

      commandFunction(command);

      return true;
    }
  });

  if (!commandExists) return message.channel.send('Comando inválido');
};
