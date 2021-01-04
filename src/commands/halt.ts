import { Client, Message } from 'discord.js';
import { Permission, requirePermission } from '../permission';

export default {
    name: 'halt',
    shortDescription: 'stop the bot server',
    isHidden: true,
    description: `**USAGE**
> $halt

**DESCRIPTION**
> This command stops the bot server. Only the bot administrator can execute this command.`,
    func: async (client: Client, message: Message): Promise<void> => {
        requirePermission(Permission.ManageBot, message.member);
        await message.channel.send(':stop_sign: Stopping...');
        client.destroy();
        process.exit(0);
    }
};