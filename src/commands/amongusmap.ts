import { Client, Message } from 'discord.js';

export default {
    name: 'amongusmap',
    aliases: ['m'],
    shortDescription: 'Among Usのマップを表示します。',
    description: {
        usage: '{s[keld] | m[ira] | p[olus]}',
        sections: {
            description: '指定した名前のAmong Usのマップを表示します。'
        }
    },
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        if (args.length === 0) {
            await message.channel.send(':x: **マップ名を指定してください。**');
            return;
        }

        switch (args[0]) {
            case 'skeld':
            case 's':
                await message.channel.send(':rocket: **THE SKELD のマップ**');
                await message.channel.send({ files: ['res/maps/skeld.png'] });
                break;
            case 'mira':
            case 'm':
                await message.channel.send(':cityscape: **MIRA HQ のマップ**');
                await message.channel.send({ files: ['res/maps/mira.png'] });
                break;
            case 'polus':
            case 'p':
                await message.channel.send(':star_and_crescent: **POLUS のマップ**');
                await message.channel.send({ files: ['res/maps/polus.png'] });
                break;
            default:
                await message.channel.send(':x: **不明なマップ名です。**');
                break;
        }
    }
};