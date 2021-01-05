import { exec } from 'child_process';
import { Client, Message } from 'discord.js';
import { readFile } from 'fs/promises';

export default {
    name: 'stats',
    shortDescription: '統計を表示します。',
    description: `**使用方法**
> $stats

**説明**
> 統計を表示します。`,
    func: async (client: Client, message: Message): Promise<void> => {
        message.channel.send(`__**統計**__
> 起動時間: ${getUptime()}
> 参加サーバー数: ${client.guilds.cache.keyArray().length}
> 実行したコマンド数: ${serverStats.commandCount}
> 失敗したコマンド数: ${serverStats.failedCommandCount}
> 受信したメッセージ数: ${serverStats.receivedMessageCount}
> CPU温度: ${await getTemperature()}℃
> Gitコミット数: ${await getGitCommitCount()}`);
    }
};

export const serverStats = {
    commandCount: 0,
    failedCommandCount: 0,
    receivedMessageCount: 0,
};

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