import { Client, Message } from 'discord.js';
import { commandAliases, commands } from '../command';

export default {
    name: 'help',
    aliases: ['h'],
    shortDescription: 'コマンドの説明を表示します。',
    description: `**使用方法**
> $help [コマンド名]
> $h [コマンド名]

**説明**
> 指定したコマンドの説明を表示します。コマンド名が与えられていない場合は、コマンドの短い説明の一覧を表示します。`,
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        let output;

        if (args.length === 0) {
            output = ':white_check_mark: **コマンドの一覧を表示します。**\n\n';
            for (const command of commands.values()) {
                if (!command.isHidden) {
                    output += `\`${command.name}\` - ${command.shortDescription}\n`;
                }
            }
            output += '\n:information_source: `$help [コマンド名]` **を実行するとより詳しい説明が表示されます。**';
        } else {
            const commandName = args[0];
            const command = commands.get(commandName) ?? commandAliases.get(commandName);

            if (command) {
                output = `:white_check_mark: \`${commandName}\` **コマンドの説明を表示します。**\n\n`;
                output += command.description ?? command.shortDescription;
            } else {
                output = ':x: **不明なコマンド名です。**';
            }
        }

        await message.channel.send(output);
    }
};