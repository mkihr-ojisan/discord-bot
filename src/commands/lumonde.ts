import { MessageEmbed } from 'discord.js';

export default {
    name: 'lumonde',
    shortDescription: 'ルマンドの画像を表示します。',
    description: {
        sections: {
            description: 'ルマンドの画像を表示します。特に意味はない。'
        }
    },
    func: async (): Promise<MessageEmbed> => {
        return new MessageEmbed().setImage('https://raw.githubusercontent.com/mkihr-ojisan/discord-bot/main/res/lumonde.jpg');
    }
};