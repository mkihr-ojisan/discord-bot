import { Client, Message, MessageEmbed } from 'discord.js';
import { getConfig } from '../config';
import { Permission, requirePermission } from '../permission';

export default {
    name: 'getconfig',
    shortDescription: 'Config値を取得します。',
    description: {
        usage: 'key',
        sections: {
            description: 'Config値を取得します。このコマンドはボット管理者のみが使用できます。',
        }
    },
    func: async (_client: Client, message: Message, ...args: string[]): Promise<MessageEmbed> => {
        requirePermission(Permission.BotAdministrator, message.member);

        const key = args[0];
        if (!key) throw Error('keyを指定してください。');

        const value = getConfig(key);
        if (value == undefined) {
            return new MessageEmbed().setDescription(`:warning: キー\`${key}\`は設定されていません。`);
        } else {
            return new MessageEmbed().setDescription(`:white_check_mark:\nkey: \`${key}\`\nvalue: \`${value}\``);
        }
    }
};
