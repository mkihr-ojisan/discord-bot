import { Client, Message } from 'discord.js';

export default {
    name: 'lumonde',
    isHidden: true,
    shortDescription: 'ルマンドの画像を表示します。',
    description: `**使用方法**
> $lumonde

**説明**
> ルマンドの画像を表示します。意味はない。`,
    func: async (_client: Client, message: Message): Promise<void> => {
        await message.channel.send({ files: ['res/lumonde.jpg'] });
    }
};