import { Client, Message } from 'discord.js';
import { commandAliases, commands } from '../command';

export default {
    name: 'help',
    aliases: ['h'],
    shortDescription: 'display information about commands',
    description: `**USAGE**
> $help [command_name]
> $h [command_name]

**DESCRIPTION**
> This command prints the description of \`command_name\`. If \`command_name\` is not given, it prints a short description of all commands.`,
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        let output;

        if (args.length === 0) {
            output = ':white_check_mark: **Showing the list of commands.**\n\n';
            for (const command of commands.values()) {
                if (!command.isHidden) {
                    output += `\`${command.name}\` - ${command.shortDescription}\n`;
                }
            }
            output += '\n:information_source: **Run** `$help [command_name]` **for more details.**';
        } else {
            const commandName = args[0];
            const command = commands.get(commandName) ?? commandAliases.get(commandName);

            if (command) {
                output = `:white_check_mark: **Showing the description of** \`${commandName}\`.\n\n`;
                output += command.description ?? command.shortDescription;
            } else {
                output = `:x: **Unknown command \`${commandName}\`**`;
            }
        }

        await message.channel.send(output);
    }
};