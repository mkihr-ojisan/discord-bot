import { exec } from 'child_process';
import { Client, MessageEmbed } from 'discord.js';
import { readFile } from 'fs/promises';
import { getConfig, saveConfig, saveConfigSync, setConfig } from '../config';

export default {
    name: 'stats',
    shortDescription: '統計を表示します。',
    func: async (client: Client): Promise<MessageEmbed> => {
        return new MessageEmbed().setTitle(':abacus: 統計').setDescription(`起動時間: ${getUptime()}
参加サーバー数: ${client.guilds.cache.keyArray().length}
実行したコマンド数: ${serverStats.commandCount}
失敗したコマンド数: ${serverStats.failedCommandCount}
受信したメッセージ数: ${serverStats.receivedMessageCount}
CPU温度: ${await getTemperature()}℃
Gitコミット数: ${await getGitCommitCount()}`);
    }
};

export const serverStats = {
    commandCount: getConfig<number>('stats.commandCount') ?? 0,
    failedCommandCount: getConfig<number>('stats.failedCommandCount') ?? 0,
    receivedMessageCount: getConfig<number>('stats.receivedMessageCount') ?? 0,
};

export function initServerStats(): void {
    setInterval(() => {
        for (const key of Object.keys(serverStats)) {
            setConfig('stats.' + key, (serverStats as Record<string, unknown>)[key], true);
        }
        saveConfig();
    }, 600000);
    process.on('exit', () => {
        for (const key of Object.keys(serverStats)) {
            setConfig('stats.' + key, (serverStats as Record<string, unknown>)[key], true);
        }
        saveConfigSync();
    });
}

function getUptime(): string {
    const uptime = process.uptime();
    if (uptime < 60) {
        return `${Math.floor(uptime * 10) / 10}秒`;
    } else if (uptime < 3600) {
        const minutes = Math.floor(uptime / 60);
        const seconds = Math.floor(uptime % 60);
        return `${minutes}分${seconds}秒`;
    } else if (uptime < 3600 * 24) {
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor(uptime % 3600 / 60);
        const seconds = Math.floor(uptime % 60);
        return `${hours}時間${minutes}分${seconds}秒`;
    } else {
        const days = Math.floor(uptime / 3600 / 24);
        const hours = Math.floor(uptime % (3600 * 24) / 3600);
        const minutes = Math.floor(uptime % 3600 / 60);
        const seconds = Math.floor(uptime % 60);
        return `${days}日${hours}時間${minutes}分${seconds}秒`;
    }
}

async function getTemperature(): Promise<number> {
    let temp = await readFile('/sys/class/thermal/thermal_zone0/temp', 'utf-8');
    return Math.floor(parseInt(temp) / 100) / 10;
}

async function getGitCommitCount(): Promise<number> {
    return new Promise(resolve => {
        exec('git rev-list --count main', (_, stdout) => resolve(parseInt(stdout)));
    });
}