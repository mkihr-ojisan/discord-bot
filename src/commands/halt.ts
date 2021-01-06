import { Client, Message, MessageEmbed } from 'discord.js';
import { Permission, requirePermission } from '../permission';

export default {
    name: 'halt',
    shortDescription: 'ボットを停止します。',
    description: {
        sections: {
            description: 'ボットを停止します。このコマンドはボット管理者のみが実行できます。'
        }
    },
    func: async (client: Client, message: Message): Promise<MessageEmbed> => {
        requirePermission(Permission.BotAdministrator, message.member);
        await message.channel.send(
            new MessageEmbed()
                .setDescription(':stop_sign: ボットサーバーを停止します...Dockerが再起動してくれるまでちょっと待ってね<:yoshi:796391488178356254>')
                .setFooter(`${message.author.username}#${message.author.discriminator} が実行`, message.author.displayAvatarURL())
                .setColor('#d5a446')
                .setTimestamp(message.createdTimestamp)
        );
        client.destroy();
        process.exit(0);
    }
};