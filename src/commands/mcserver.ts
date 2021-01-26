import { MessageEmbed } from 'discord.js';
import isReachable from 'is-reachable';

const MCSERVER_HOSTNAME_GLOBAL = 'mki.hrl.cl';
const MCSERVER_HOST = '192.168.0.37';
const MCSERVER_PORT = '41836';

export default {
    name: 'ismcserverrunning',
    aliases: ['mcs'],
    shortDescription: 'マインクラフトサーバーが起動しているかどうか確認します。',
    func: async (): Promise<MessageEmbed> => {
        const isRunning = isReachable(`${MCSERVER_HOST}:${MCSERVER_PORT}`, { timeout: 500 });

        const outputMessage = new MessageEmbed();
        if (isRunning) {
            outputMessage.setDescription(':o: **マインクラフトサーバーは起動しています。**');
        } else {
            outputMessage.setDescription(':x: **マインクラフトサーバーは起動していません。**');
        }
        outputMessage.addField('サーバーアドレス', `${MCSERVER_HOSTNAME_GLOBAL}:${MCSERVER_PORT}`);

        return outputMessage;
    }
};