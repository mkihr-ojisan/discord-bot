import { Client, Message, MessageEmbed } from 'discord.js';

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
    func: async (_client: Client, message: Message, ...args: string[]): Promise<MessageEmbed> => {
        if (args.length === 0) {
            throw Error('マップ名を指定してください。');
        }

        const outputMessage = new MessageEmbed();

        switch (args[0]) {
            case 'skeld':
            case 's':
                outputMessage.title = ':rocket: THE SKELD のマップ';
                outputMessage.setImage('https://raw.githubusercontent.com/mkihr-ojisan/discord-bot/main/res/maps/skeld.png');
                break;
            case 'mira':
            case 'm':
                outputMessage.title = ':cityscape: MIRA HQ のマップ';
                outputMessage.setImage('https://raw.githubusercontent.com/mkihr-ojisan/discord-bot/main/res/maps/mira.png');
                break;
            case 'polus':
            case 'p':
                outputMessage.title = ':star_and_crescent: POLUS のマップ';
                outputMessage.setImage('https://raw.githubusercontent.com/mkihr-ojisan/discord-bot/main/res/maps/polus.png');
                break;
            default:
                throw Error('不明なマップ名です。');
        }

        return outputMessage;
    }
};