import { MessageEmbed } from 'discord.js';

export default {
    name: 'お前はエビ',
    aliases: ['お前は🍤', 'お前は🦐', 'ebi', 'お前は'],
    shortDescription: 'このボットがエビであることを主張します。',
    description: {
        usage: '[任意の文字列]'
    },
    func: async (): Promise<MessageEmbed> => {
        const random = Math.random();
        const outputMessage = new MessageEmbed();
        if (random < 0.99) {
            outputMessage.setDescription(':x: **いいえ、私はザリガニ。**<:zarigani:796346537307144212>');
        } else if (random < 0.999) {
            outputMessage.setDescription(':x: **いいえ、私はルーベラ。**<:lubera:796345091651928095>');
        } else if (random < 0.9999) {
            outputMessage.setDescription(':woozy_face: **いいえ、私はエビ。**:shrimp:');
        } else {
            outputMessage.setDescription(':x: **いいえ、お前がエビ。**:middle_finger:');
        }

        return outputMessage;
    }
};