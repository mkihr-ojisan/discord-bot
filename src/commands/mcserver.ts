import { Client, Message, MessageEmbed } from 'discord.js';
import mc from 'minecraft-protocol';
import { promisify } from 'util';

interface Server {
    name: string,
    host: string,
    port: number,
}
const defaultServers: Server[] = [
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
    description: {
        usage: '[アドレス ...]',
    },
    func: async (_client: Client, _message: Message, ...args: string[]): Promise<MessageEmbed> => {
        const outputMessage = new MessageEmbed();

        let servers: Server[];
        if (args.length > 0) {
            servers = args.map(arg => {
                const [host, port] = arg.split(':');
                return {
                    name: arg,
                    host: host,
                    port: parseInt(port) || 25565,
                };
            });
        } else {
            servers = defaultServers;
        }

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
    const host = server.host === 'mki.hrl.cl' ? '192.168.0.37' : server.host;
    try {
        const pingResult = await timeout(promisify(mc.ping)({ host, port: server.port }), 500);
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
    } catch {
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

function timeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(Error('timed out'));
        }, timeout);

        promise.then(result => {
            clearTimeout(timeoutId);
            resolve(result);
        }).catch(error => {
            clearTimeout(timeoutId);
            reject(error);
        });
    });
}
