import { Client, Message } from 'discord.js';
import { commands } from '../command';

export default {
    name: 'aliases',
    shortDescription: 'コマンドの別名の一覧を表示します。',
    description: `**使用方法**
> $aliases

**説明**
> コマンドの別名の一覧を表示します。`,
    func: async (_client: Client, message: Message): Promise<void> => {
        const outputs = [];
        for (const [, command] of commands) {
            if (command.aliases) {
                outputs.push(`\`$${command.name}\` - ${command.aliases.map(a => `\`$${a}\``).join(', ')}`);
            }
        }
        message.channel.send(outputs.join('\n'));
    }
};