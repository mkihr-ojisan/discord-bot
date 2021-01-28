import { MessageEmbed } from 'discord.js';
import isReachable from 'is-reachable';

const MCSERVER_VANILLA_ADDRESS = '192.168.0.37:41836';
const MCSERVER_MOD_ADDRESS = '192.168.0.37:41837';

export default {
    name: 'ismcserverrunning',
    aliases: ['mcs'],
    shortDescription: 'マインクラフトサーバーが起動しているかどうか確認します。',
    func: async (): Promise<MessageEmbed> => {
        const isVanillaServerRunning = isReachable(MCSERVER_VANILLA_ADDRESS, { timeout: 500 });
        const isModServerRunning = isReachable(MCSERVER_MOD_ADDRESS, { timeout: 500 });

        const outputMessage = new MessageEmbed();

        if (await isVanillaServerRunning) {
            outputMessage.addField('バニラサーバー', ':white_check_mark: 起動しています。');
        } else {
            outputMessage.addField('バニラサーバー', ':no_entry: 起動していません。');
        }

        if (await isModServerRunning) {
            outputMessage.addField('MODサーバー', ':white_check_mark: 起動しています。');
        } else {
            outputMessage.addField('MODサーバー', ':no_entry: 起動していません。');
        }

        return outputMessage;
    }
};