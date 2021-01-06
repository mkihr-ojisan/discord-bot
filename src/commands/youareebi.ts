import { Client, Message } from 'discord.js';

export default {
    name: 'お前はエビ',
    aliases: ['お前は🍤', 'お前は🦐'],
    shortDescription: 'このボットがエビであることを主張します。',
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