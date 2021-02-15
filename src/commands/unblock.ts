import { Client, GuildMember, Message, MessageEmbed } from 'discord.js';
import { unblockUser } from '../command';

export default {
    name: 'unblock',
    shortDescription: '指定したユーザーのブロックを解除します。',
    description: {
        usage: '[ ID | ニックネーム | ユーザー名 ] ...',
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
                    if (unblockUser(member.user.id))
                        outputMessage.description += `:white_check_mark: **${member.nickname ?? member.displayName}**のブロックを解除しました。\n`;
                    else
                        outputMessage.description += `:x: **${member.nickname ?? member.displayName}**はブロックされていません。\n`;
                }
            }
        }

        return outputMessage;
    }
};
