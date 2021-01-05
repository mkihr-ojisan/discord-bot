import { Client, Message } from 'discord.js';

export default {
    name: 'お前はエビ',
    shortDescription: 'このボットがエビであることを主張します。',
    description: `**使用方法**
> $お前はエビ

**説明**
> このボットがエビであることを主張します。ボットは常にエビであることを否定します。`,
    func: async (_client: Client, message: Message): Promise<void> => {
        await message.channel.send('いいえ、私はザリガニ。');
    }
};