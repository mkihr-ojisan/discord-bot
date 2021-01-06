import { MessageEmbed } from 'discord.js';

export default {
    name: 'info',
    shortDescription: 'このボットの情報を表示します。',
    func: async (): Promise<MessageEmbed> => {
        return new MessageEmbed()
            .setTitle(':robot: 向原おじさんのBot <:lumonde:789424914414829579>')
            .setDescription('向原おじさんが作成したボットです。向原おじさんの自宅で常時稼働しているRaspberry Pi 3 Model B+上で動いています。機能追加やバグ修正のために時々サーバーを再起動するので、コマンドに反応できないことがありますが許してください。')
            .addField('ソースコード', 'https://github.com/mkihr-ojisan/discord-bot');
    }
};