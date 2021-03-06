import { Client } from 'discord.js';
import { getConfig, setConfig } from './config';
import readline from 'readline';
import { initCommands } from './command';
import { initGreeter } from './greet';
import { initServerStats } from './commands/stats';

(async () => {
    const client = new Client();
    const token = await getToken();

    await ensureAdminIdSet();
    initServerStats();

    initCommands(client);
    await client.login(token);
    initGreeter(client);
})();

async function getToken(): Promise<string> {
    const token = getConfig('discord.token');

    if (typeof token === 'string') {
        return token;
    } else {
        process.stdout.write('Token is not set. Enter token: ');

        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        const token = await new Promise((resolve) => {
            rl.on('line', resolve);
        }) as string;
        rl.close();

        setConfig('discord.token', token);
        return token;
    }
}

async function ensureAdminIdSet(): Promise<void> {
    if (typeof getConfig('admin.id') !== 'string') {
        process.stdout.write('Bot administrator id is not set. Enter your id: ');

        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        const id = await new Promise((resolve) => {
            rl.on('line', resolve);
        }) as string;
        rl.close();

        setConfig('admin.id', id);
    }
}

['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(signal => process.on(signal, () => {
    console.log(`Received ${signal}. Exiting...`);
    process.exit(0);
}));