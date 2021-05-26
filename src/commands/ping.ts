import {Message} from 'discord.js';

export default (message: Message, args: string[]) => {
    message.channel.send('pong');
};
