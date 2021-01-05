import { Client, Message } from 'discord.js';
import { Permission, requirePermission } from '../permission';

export default {
    name: 'halt',
    shortDescription: 'ボットサーバーを停止します。',
    isHidden: true,
    description: `**使用方法**
> $halt

**説明**
> ボットサーバーを停止します。このコマンドはボットサーバー管理者のみが実行できます。`,
    func: async (client: Client, message: Message): Promise<void> => {
        requirePermission(Permission.ManageBot, message.member);
        await message.channel.send(':stop_sign: ボットサーバーを停止します...');
        client.destroy();
        process.exit(0);
    }
};