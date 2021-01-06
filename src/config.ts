import { promises as fsp } from 'fs';
import * as fs from 'fs';
import { homedir } from 'os';

const configPath = homedir() + '/.config/mkihr-oiisan-discord-bot';
const configFile = configPath + '/config.json';

let config: Record<string, unknown>;
if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
} else {
    fs.mkdirSync(configPath, { recursive: true });
    config = {};
}

export function getConfig<T>(key: string): T | undefined {
    return config[key] as T;
}
export function setConfig<T>(key: string, value: T, noSave?: boolean): void {
    config[key] = value;

    if (!noSave) saveConfig();
}

export async function saveConfig(): Promise<void> {
    await fsp.writeFile(configFile, JSON.stringify(config), 'utf-8');
}

export function saveConfigSync(): void {
    fs.writeFileSync(configFile, JSON.stringify(config), 'utf-8');
}