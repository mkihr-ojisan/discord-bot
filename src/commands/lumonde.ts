import { Client, Message } from 'discord.js';

export default {
    name: 'lumonde',
    isHidden: true,
    shortDescription: 'show an image of lumonde',
    description: `**USAGE**
> $lumonde`,
    func: async (_client: Client, message: Message): Promise<void> => {
        await message.channel.send({ files: ['https://images-na.ssl-images-amazon.com/images/I/81g-0%2BsHOwL._AC_SL1500_.jpg'] });
    }
};