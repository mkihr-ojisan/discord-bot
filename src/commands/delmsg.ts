import { Client, DMChannel, Message, MessageEmbed, NewsChannel, TextChannel } from 'discord.js';
import getopts from 'getopts';
import { Permission, requirePermission } from '../permission';

export default {
    name: 'delmsg',
    shortDescription: 'メッセージを削除します。',
    description: {
        usage: '[options] [message_id]',
        sections: {
            description: '指定したIDのメッセージを削除します。このコマンドはボット管理者またはサーバー管理者のみが実行できます。ボットが`MANAGE_MESSAGES`を持たない場合、他のユーザーのメッセージを削除することはできません。',
            options: `\`--quiet, -q\`
削除成功時にメッセージを表示しません。
\`--channel=ID, -c ID\`
削除するメッセージを含むチャンネルのIDを指定します。指定しない場合は、コマンドと同じチャンネルでメッセージを探します。
\`--all, -a\`
チャンネル中のボットが作成したメッセージを全て削除します。
\`--limit=number, -l=number
\`--all\`を指定したときに、遡るメッセージ数を100単位で指定します。ボット管理者のみが使用できます。デフォルト値は100。`
        }
    },
    func: async (client: Client, commandMessage: Message, ...args: string[]): Promise<MessageEmbed | null> => {
        requirePermission(Permission.GuildAdministrator, commandMessage.member);

        const options = getopts(args, {
            boolean: ['quiet', 'all'],
            string: ['channel'],
            alias: {
                quiet: 'q',
                channel: 'c',
                all: 'a',
            },
            default: {
                limit: 100,
            }
        });

        if (options.limit)
            requirePermission(Permission.BotAdministrator, commandMessage.member);

        let channel: TextChannel | DMChannel | NewsChannel = commandMessage.channel;
        if (options.channel) {
            let c = await client.channels.fetch(options.channel);
            if (!c) throw Error('チャンネルが見つかりません。');
            if (!(channel instanceof TextChannel) && !(channel instanceof DMChannel) && !(channel instanceof NewsChannel))
                throw Error('`TextChannel`、`DMChannel`、`NewsChannel`のいずれかである必要があります。');
            channel = c as TextChannel | DMChannel | NewsChannel;
        }

        if (options.all) {
            const limit = parseInt(options.limit);
            if (isNaN(limit)) throw Error('`--limit`には数値を指定してください。');

            let lastMessageId = commandMessage.id;
            let deleteCount = 0;

            for (let i = 0; i < options.limit / 100; i++) {
                const messages = await channel.messages.fetch({ limit: 100, before: lastMessageId });
                for (const [, message] of messages) {
                    if (message.author.id === client.user?.id) {
                        if (!message.deletable) throw Error('メッセージを削除できません。おそらくボットにメッセージを削除する権限が与えられていません。');
                        await message.delete();
                        deleteCount++;
                    }
                }
            }

            if (options.quiet) {
                return null;
            } else {
                return new MessageEmbed().setDescription(`:white_check_mark: ${deleteCount}個のメッセージを削除しました。`);
            }
        } else {
            const messageId = options._[0];
            if (!messageId) throw Error('メッセージIDを指定してください。');

            const message = await channel.messages.fetch(messageId);
            if (!message) throw Error('メッセージが見つかりません。');

            if (!message.deletable) throw Error('メッセージを削除できません。おそらくボットにメッセージを削除する権限が与えられていません。');
            await message.delete();

            if (options.quiet) {
                return null;
            } else {
                return new MessageEmbed().setDescription(`:white_check_mark: チャンネル\`${channel.id}\`から\`メッセージ\`${messageId}\`を削除しました。`);
            }
        }
    }
};