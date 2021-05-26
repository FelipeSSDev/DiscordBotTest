import {Message, MessageEmbed} from 'discord.js';
import axios from 'axios';
import generateRandomNumber from '../utils/randomNumber';

interface TypeInfo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export default (message: Message, args: string[]) => {
  const commands: {[key: string]: () => {}} = {
    ['get-random']: async () => {
      try {
        const randomNumber = generateRandomNumber(1, 152);
        const {data: response} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);

        const pokemonTypes = response.types.map((typeInfo: TypeInfo) => ({
          name: `Type ${typeInfo.slot}`,
          value: typeInfo.type.name,
          inline: true,
        }));

        const pokemonEmbed = new MessageEmbed()
          .setColor('#ee1515')
          .setTitle(response.name)
          .setThumbnail(response.sprites.other['official-artwork'].front_default)
          .addFields(...pokemonTypes, {name: 'Pokemon ID', value: response.id})
          .setTimestamp()
          .setFooter('Top 10 Rogers da Internet', 'https://avatars.githubusercontent.com/u/80218280?v=4');

        message.channel.send(pokemonEmbed);
      } catch (e) {
        console.log(e);
        message.channel.send('Não consegui encontrar um pokemon para você');
      }
    },
  };

  for (let key in commands) {
    if (args[0] !== key) continue;

    return commands[key]();
  }

  return message.channel.send('Argumento não suportado pelo comando');
};
