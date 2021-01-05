import { Client, Message } from 'discord.js';

export default {
    name: 'echo',
    shortDescription: '文字列を表示します。',
    description: `**使用方法**
> $echo [string]

**説明**
> このコマンドが呼び出されたテキストチャンネルに対して、指定した文字列を出力します。DiscordのAPI的に空のメッセージを送ることはできないため、指定した文字列が空の場合は"(empty)"と出力します。`,
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        await message.channel.send(args.join(' ') || '(empty)');
    }
};