import { Client, Message } from 'discord.js';
import echo from './commands/echo';
import help from './commands/help';
import halt from './commands/halt';
import { getConfig } from './config';
import lumonde from './commands/lumonde';
import amongusmap from './commands/amongusmap';
import youareebi from './commands/youareebi';
import AsyncLock from 'async-lock';

let commandPrefix = getConfig('commands.prefix') as string | undefined ?? '$';

export interface Command {
    name: string,
    aliases?: string[],
    description?: string,
    shortDescription: string,
    isHidden?: boolean,
    func: (client: Client, message: Message, ...args: string[]) => Promise<void>,
}

export const commands: Map<string, Command> = new Map();
export const commandAliases: Map<string, Command> = new Map();
function registerCommand(command: Command) {
    commands.set(command.name, command);
    if (command.aliases) {
        for (const alias of command.aliases) {
            commandAliases.set(alias, command);
        }
    }
}

[echo, help, halt, lumonde, amongusmap, youareebi].forEach(registerCommand);

const lock = new AsyncLock();

export function initCommands(client: Client): void {
    client.on('message', async (message) => {
        if (!message.author.bot && message.content.startsWith(commandPrefix)) {
            lock.acquire(message.channel.id, async () => {
                const [commandName, ...args] = message.content.slice(1).split(/\s/).filter(s => s !== '');

                const command = commands.get(commandName) ?? commandAliases.get(commandName);
                if (command) {
                    try {
                        await command.func(client, message, ...args);
                    } catch (ex) {
                        message.channel.send(`:x: **コマンドの実行中にエラーが発生しました: **: ${ex.message}`);
                    }
                } else {
                    message.channel.send(`:x: **不明なコマンド名です: ** \`${commandName}\``);
                }
            });
        }
    });
}