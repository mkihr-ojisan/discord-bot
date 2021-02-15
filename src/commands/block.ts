import { Client, GuildMember, Message, MessageEmbed } from 'discord.js';
import { blockUser } from '../command';

export default {
    name: 'block',
    shortDescription: '指定したユーザーをブロックします。',
    description: {
        usage: '[ ID | ニックネーム | ユーザー名 ] ...',
        sections: {
            description: '指定したユーザーをブロックします。ブロックされたユーザーはコマンドを実行できなくなります。'
        },
    },
    func: async (_client: Client, message: Message, ...args: string[]): Promise<MessageEmbed> => {
        const outputMessage = new MessageEmbed().setDescription('');

        if (!message.guild) {
            throw Error('このコマンドはサーバー内で実行する必要があります。');
        }

        for (const query of args) {
            let members: GuildMember[] = [];
            if (/[0-9]+/.test(query)) {
                members = [await message.guild.members.fetch({ user: query })];
            }
            if (members.length === 0) {
                members = Array.from((await message.guild.members.fetch({ query })).values());
            }

            if (members.length === 0) {
                outputMessage.description += `:x: ユーザー\`${query}\`が見つかりません。\n`;
            } else {
                for (const member of members) {
                    blockUser(member.user.id);
                    outputMessage.description += `:white_check_mark: **${member.nickname ?? member.displayName}**をブロックしました。\n`;
                }
            }
        }

        return outputMessage;
    }
};