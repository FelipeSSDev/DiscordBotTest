module.exports = (message, args) => {
  const commands = {
    getRandom: async () => {
      message.channel.send('salve random');
    },
    getPikachu: async () => {
      message.channel.send('salve pikachu');
    },
  };

  for (let key in commands) {
    if (args[0] !== key) continue;

    return commands[key]();
  }

  return message.channel.send('Argumento não suportado pelo comando');
};
