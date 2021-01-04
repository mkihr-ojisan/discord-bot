import { Client, Message } from 'discord.js';

export default {
    name: 'echo',
    shortDescription: 'display a line of text',
    description: `**USAGE**
> $echo [string]

**DESCRIPTION**
> This command echoes \`string\` to the text channel where the command was called. It will output "(empty)" if the string is empty, since it is not allowed to send an empty message on Discord. 
    `,
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        await message.channel.send(args.join(' ') || '(empty)');
    }
};