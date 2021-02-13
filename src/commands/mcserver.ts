import { MessageEmbed } from 'discord.js';
import isReachable from 'is-reachable';
import mc from 'minecraft-protocol';
import { promisify } from 'util';

interface Server {
    name: string,
    host: string,
    port: number,
}
const servers: Server[] = [
    {
        name: 'バニラサーバー',
        host: '192.168.0.37',
        port: 41836,
    },
    {
        name: 'MODサーバー',
        host: '192.168.0.37',
        port: 41837,
    }
];

type ServerStatus =
    { server: Server, isRunning: false; } |
    { server: Server, isRunning: true; } |
    { server: Server, isRunning: true, onlinePlayerCount: number; } |
    { server: Server, isRunning: true, onlinePlayerNames: string[]; };

export default {
    name: 'ismcserverrunning',
    aliases: ['mcs'],
    shortDescription: 'マインクラフトサーバーが起動しているかどうか確認します。',
    func: async (): Promise<MessageEmbed> => {
        const outputMessage = new MessageEmbed();

        const statuses = await Promise.all(servers.map(getServerStatus));
        outputMessage.addFields(statuses.map(status => {
            return {
                name: status.server.name,
                value: serverStatusToMessageString(status),
            };
        }));

        return outputMessage;
    }
};

async function getServerStatus(server: Server): Promise<ServerStatus> {
    const isRunning = await isReachable(server.host + ':' + server.port, { timeout: 500 });
    if (isRunning) {
        const pingResult = await promisify(mc.ping)({ host: server.host, port: server.port });
        if ('players' in pingResult) {
            if (pingResult.players.sample) {
                return {
                    isRunning: true,
                    onlinePlayerNames: pingResult.players.sample.map(s => s.name),
                    server,
                };
            } else {
                return {
                    isRunning: true,
                    onlinePlayerCount: pingResult.players.online,
                    server,
                };
            }
        } else {
            return { isRunning: true, server };
        }
    } else {
        return { isRunning: false, server };
    }
}

function serverStatusToMessageString(status: ServerStatus): string {
    let message;
    if (status.isRunning) {
        message = ':white_check_mark: 起動しています。';
        if ('onlinePlayerCount' in status) {
            message += '\nプレイヤー数: ' + status.onlinePlayerCount;
        } else if ('onlinePlayerNames' in status) {
            message += '\nプレイヤー: ' + status.onlinePlayerNames.join(', ');
        }
    } else {
        message = ':no_entry: 起動していません。';
    }

    return message;
}
