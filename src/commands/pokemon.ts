import {Message} from 'discord.js';

export default (message: Message, args: string[]) => {
    const commands: {[key: string]: () => {}} = {
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
