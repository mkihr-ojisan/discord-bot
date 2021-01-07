import { Client, Message, MessageEmbed } from 'discord.js';

export default {
    name: 'emojilookup',
    shortDescription: '絵文字の情報を表示します。',
    description: {
        usage: '{ID | 名前}'
    },
    func: async (client: Client, message: Message, ...args: string[]): Promise<MessageEmbed> => {
        const outputMessage = new MessageEmbed();

        if (args.length === 0)
            throw Error('絵文字のIDまたは名前を指定してください。');

        const nameOrId = args[0];

        let emoji = client.emojis.cache.find(e => e.name === nameOrId) ?? client.emojis.resolve(nameOrId);

        if (!emoji)
            throw Error('指定した絵文字が見つかりません。');

        const emojiStr = `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;

        outputMessage.title = `絵文字 ${emojiStr}`;
        outputMessage.description = `animated: \`${emoji.animated}\`
createdAt: \`${emoji.createdAt}\`
deleted: \`${emoji.deleted}\`
id: \`${emoji.id}\`
identifier: \`${emoji.identifier}\`
name: \`${emoji.name}\`
url: ${emoji.url}`;

        return outputMessage;
    }
};