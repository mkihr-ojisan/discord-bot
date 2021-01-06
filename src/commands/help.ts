import { Client, Message, MessageEmbed } from 'discord.js';
import { Command, commandAliases, commands, getCommandPrefix } from '../command';

export default {
    name: 'help',
    aliases: ['h'],
    shortDescription: 'コマンドの説明を表示します。',
    description: {
        usage: '[コマンド名]',
        sections: {
            description: '指定したコマンドの説明を表示します。コマンド名が与えられていない場合は、コマンドの短い説明の一覧を表示します。'
        }
    },
    func: async (_client: Client, message: Message, ...args: string[]): Promise<MessageEmbed> => {
        let outputMessage = new MessageEmbed();

        const commandPrefix = getCommandPrefix(message.guild);
        if (args.length === 0) {
            outputMessage.title = ':scroll: コマンド一覧';
            outputMessage.description = `:information_source: \`${commandPrefix}help [コマンド名]\` を実行するとより詳しい説明が表示されます。\n`;
            for (const command of commands.values()) {
                if (!command.isHidden) {
                    outputMessage.description += `\n\`${commandPrefix}${command.name}\` - ${command.shortDescription}`;
                }
            }
        } else {
            const commandName = args[0];
            const command = commands.get(commandName) ?? commandAliases.get(commandName);

            if (command) {
                outputMessage.title = `:scroll: ${commandPrefix}${command.name} コマンド`;

                outputMessage.addField('使用方法', genUsageText(command, commandPrefix));
                outputMessage.addField('説明', command.description?.sections?.description ?? command.shortDescription);
                if (command.description?.sections?.options)
                    outputMessage.addField('オプション', command.description.sections.options);
                if (command.description?.sections?.arguments)
                    outputMessage.addField('引数', command.description.sections.arguments);
            } else {
                throw Error('不明なコマンドです。');
            }
        }

        return outputMessage;
    }
};

function genUsageText(command: Command, commandPrefix: string): string {
    let usageText = '```\n';
    for (const commandName of [command.name, ...command.aliases ?? []]) {
        usageText += commandPrefix + commandName + ' ' + (command.description?.usage ?? '') + '\n';
    }
    return usageText + '```';
}