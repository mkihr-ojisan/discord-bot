import { Client, Message, MessageEmbed } from 'discord.js';
import { Permission, requirePermission } from '../permission';

export default {
    name: 'halt',
    shortDescription: 'ボットサーバーを停止します。',
    isHidden: true,
    description: {
        sections: {
            description: 'ボットサーバーを停止します。このコマンドはボットサーバー管理者のみが実行できます。'
        }
    },
    func: async (client: Client, message: Message): Promise<MessageEmbed> => {
        requirePermission(Permission.ManageBot, message.member);
        await message.channel.send(
            new MessageEmbed()
                .setDescription(':stop_sign: ボットサーバーを停止します...')
                .setFooter(`${message.author.username}#${message.author.discriminator} が実行`, message.author.displayAvatarURL())
                .setColor('PURPLE')
        );
        client.destroy();
        process.exit(0);
    }
};