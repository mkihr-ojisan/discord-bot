import { Client } from 'discord.js';

export function initGreeter(client: Client): void {
    client.on('guildCreate', guild => {
        guild.systemChannel?.send(':sunny: __***おはようございます！！！！！！***__\n`$help`でコマンド一覧を表示できます。');
    });
}