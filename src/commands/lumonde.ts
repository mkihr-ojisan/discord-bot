import { Client, Message } from 'discord.js';

export default {
    name: 'lumonde',
    shortDescription: 'ルマンドの画像を表示します。',
    description: {
        sections: {
            description: 'ルマンドの画像を表示します。特に意味はない。'
        }
    },
    func: async (_client: Client, message: Message): Promise<void> => {
        await message.channel.send({ files: ['res/lumonde.jpg'] });
    }
};