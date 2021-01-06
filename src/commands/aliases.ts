import { Client, Message, MessageEmbed } from 'discord.js';
import { commands, getCommandPrefix } from '../command';

export default {
    name: 'aliases',
    shortDescription: 'コマンドの別名の一覧を表示します。',
    func: async (_client: Client, message: Message): Promise<MessageEmbed> => {
        const outputMessage = new MessageEmbed();
        const commandPrefix = getCommandPrefix(message.guild);

        outputMessage.title = ':scroll: コマンドの別名の一覧';
        outputMessage.description = '';
        for (const [, command] of commands) {
            if (command.aliases) {
                outputMessage.description += (`\`${commandPrefix}${command.name}\` - ${command.aliases.map(a => `\`${commandPrefix}${a}\``).join(', ')}`);
            }
        }

        return outputMessage;
    }
};