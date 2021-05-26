const {readdirSync} = require('fs');
const PREFIX = '::';

module.exports = (message) => {
  const files = readdirSync(__dirname)
    .filter((fileName) => fileName !== 'index.js')
    .map((fileName) => fileName.slice(0, -3));

  if (!message.content.startsWith(PREFIX)) return;
  const [command, ...args] = message.content.slice(PREFIX.length).split(' ');

  const commandExists = files.some((file) => {
    if (command === file) {
      const commandHandler = require(`./${file}.js`);

      commandHandler(message, args);

      return true;
    }
  });

  if (!commandExists) return message.channel.send('Comando inválido');
};
