import { Client, Message } from 'discord.js';

export default {
    name: 'info',
    shortDescription: 'このボットの情報を表示します。',
    func: async (client: Client, message: Message): Promise<void> => {
        let lumonde;
        if (client.emojis.cache.has('lumonde')) {
            lumonde = ' :lumonde:';
        } else {
            lumonde = '';
        }

        message.channel.send(`__**:robot: 向原おじさんのBot${lumonde}**__

向原おじさんが作成したボットです。向原おじさんの自宅で常時稼働しているRaspberry Pi 3 Model B+上で動いています。機能追加やバグ修正のために時々サーバーを再起動するので、コマンドに反応できないことがありますが許してください。

**GitHub**: <https://github.com/mkihr-ojisan/discord-bot>
**Twitter**: <https://twitter.com/mkihr_ojisan>
        `);
    }
};