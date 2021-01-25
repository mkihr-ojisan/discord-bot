import { Client, Guild, Message, MessageEmbed } from 'discord.js';
import echo from './commands/echo';
import help from './commands/help';
import halt from './commands/halt';
import { getGuildConfig } from './config';
import lumonde from './commands/lumonde';
import amongusmap from './commands/amongusmap';
import youareebi from './commands/youareebi';
import AsyncLock from 'async-lock';
import aliases from './commands/aliases';
import stats, { serverStats } from './commands/stats';
import info from './commands/info';
import delmsg from './commands/delmsg';
import getconfig from './commands/getconfig';
import emojilookup from './commands/emojilookup';

export const DEFAULT_MESSAGE_EMBED_COLOR = '#d5a446';

export interface Command {
    name: string,
    aliases?: string[],
    description?: CommandDescription,
    shortDescription: string,
    isHidden?: boolean,
    func: (client: Client, message: Message, ...args: string[]) => Promise<MessageEmbed | null>,
}
export interface CommandDescription {
    usage?: string,
    sections?: {
        description?: string,
        options?: string,
        arguments?: string,
    };
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

[
    echo,
    help,
    halt,
    lumonde,
    amongusmap,
    youareebi,
    aliases,
    stats,
    info,
    delmsg,
    getconfig,
    emojilookup,
].forEach(registerCommand);

const lock = new AsyncLock();

export function initCommands(client: Client): void {
    client.on('message', async (message) => {
        serverStats.receivedMessageCount++;

        const commandPrefix = getCommandPrefix(message.guild);
        if (!message.author.bot && message.content.startsWith(commandPrefix)) {
            lock.acquire(message.channel.id, async () => {
                const [commandName, ...args] = message.content.slice(1).split(/\s/).filter(s => s !== '');

                let outputMessage;

                if (commandName) {
                    const command = commands.get(commandName) ?? commandAliases.get(commandName);
                    if (command) {
                        try {
                            outputMessage = await command.func(client, message, ...args);

                            serverStats.commandCount++;
                        } catch (ex) {
                            outputMessage = new MessageEmbed().setDescription(`:x: **コマンドの実行中にエラーが発生しました**: ${ex.message}`);

                            serverStats.failedCommandCount++;
                        }
                    } else {
                        outputMessage = new MessageEmbed().setDescription(`:x: **不明なコマンドです**: \`${commandName}\``);

                        serverStats.failedCommandCount++;
                    }
                } else {
                    outputMessage = new MessageEmbed().setDescription(':x: **コマンド名を指定してください。**');
                }

                if (outputMessage) {
                    outputMessage
                        .setFooter(`${message.author.username}#${message.author.discriminator} が実行`, message.author.displayAvatarURL())
                        .setColor(outputMessage.color ?? DEFAULT_MESSAGE_EMBED_COLOR)
                        .setTimestamp(message.createdTimestamp);
                    message.channel.send(outputMessage);
                }
            });
        }
    });
}

export function getCommandPrefix(guild: Guild | null): string {
    return (guild && getGuildConfig<string>(guild, 'commands.prefix')) ?? '$';
} 