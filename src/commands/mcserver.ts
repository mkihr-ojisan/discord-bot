import { MessageEmbed } from 'discord.js';
import isReachable from 'is-reachable';
import mc from 'minecraft-protocol';
import { promisify } from 'util';

const MCSERVER_VANILLA_HOST = '192.168.0.37';
const MCSERVER_VANILLA_PORT = 41836;
const MCSERVER_VANILLA_ADDRESS = MCSERVER_VANILLA_HOST + ':' + MCSERVER_VANILLA_PORT;
const MCSERVER_MOD_HOST = '192.168.0.37';
const MCSERVER_MOD_PORT = 41837;
const MCSERVER_MOD_ADDRESS = MCSERVER_MOD_HOST + ':' + MCSERVER_MOD_PORT;

export default {
    name: 'ismcserverrunning',
    aliases: ['mcs'],
    shortDescription: 'マインクラフトサーバーが起動しているかどうか確認します。',
    func: async (): Promise<MessageEmbed> => {
        const isVanillaServerRunning = isReachable(MCSERVER_VANILLA_ADDRESS, { timeout: 500 });
        const isModServerRunning = isReachable(MCSERVER_MOD_ADDRESS, { timeout: 500 });

        const outputMessage = new MessageEmbed();

        if (await isVanillaServerRunning) {
            const pingResult = await promisify(mc.ping)({ host: MCSERVER_VANILLA_HOST, port: MCSERVER_VANILLA_PORT });
            let players = '';
            if ('players' in pingResult) {
                if (pingResult.players.online > 0)
                    players = '\n参加者: ' + pingResult.players.sample.join(', ');
                else
                    players = '\n参加者: なし';
            }

            outputMessage.addField('バニラサーバー', ':white_check_mark: 起動しています。' + players);
        } else {
            outputMessage.addField('バニラサーバー', ':no_entry: 起動していません。');
        }

        if (await isModServerRunning) {
            const pingResult = await promisify(mc.ping)({ host: MCSERVER_MOD_HOST, port: MCSERVER_MOD_PORT });
            let players = '';
            if ('players' in pingResult) {
                if (pingResult.players.online > 0)
                    players = '\n参加者: ' + pingResult.players.sample.map(s => s.name).join(', ');
                else
                    players = '\n参加者: なし';
            }

            outputMessage.addField('MODサーバー', ':white_check_mark: 起動しています。' + players);
        } else {
            outputMessage.addField('MODサーバー', ':no_entry: 起動していません。');
        }

        return outputMessage;
    }
};