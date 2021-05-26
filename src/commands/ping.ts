import Command from '../models/Command';

export default ({message, subarguments}: Command) => {
    message.channel.send('pong');
};
