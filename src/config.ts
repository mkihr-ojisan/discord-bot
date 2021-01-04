import { promises as fsp } from 'fs';
import * as fs from 'fs';
import { homedir } from 'os';

const configPath = homedir() + '/.config/mkihr-oiisan-discord-bot';
const configFile = configPath + '/config.json';

let config: Record<string, unknown>;
if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
} else {
    fs.mkdirSync(configPath);
    config = {};
}

export function getConfig(key: string): unknown {
    return config[key];
}
export function setConfig(key: string, value: unknown): void {
    config[key] = value;

    saveConfig();
}

async function saveConfig() {
    await fsp.writeFile(configFile, JSON.stringify(config), 'utf-8');
}