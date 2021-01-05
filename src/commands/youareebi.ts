import { Client, Message } from 'discord.js';

export default {
    name: 'お前はエビ',
    aliases: ['お前は🍤', 'お前は🦐'],
    shortDescription: 'このボットがエビであることを主張します。',
    description: `**使用方法**
> $お前はエビ
> $お前は🍤
> $お前は🦐

**説明**
> このボットがエビであることを主張します。ボットは常にエビであることを否定します。`,
    func: async (_client: Client, message: Message): Promise<void> => {
        let me;
        const random = Math.random();
        if (random < 0.99) {
            me = 'ザリガニ';
        } else if (random < 0.999) {
            me = 'ルーベラ';
        } else {
            me = '…エビ';
        }
        await message.channel.send(`いいえ、私は${me}。`);
    }
};