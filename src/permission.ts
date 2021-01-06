import { GuildMember } from 'discord.js';
import { getConfig } from './config';

export enum Permission {
    BotAdministrator,
    GuildAdministrator,
}

export function hasPermission(permission: Permission, member: GuildMember): boolean {
    if (member.id === getConfig('admin.id'))
        return true;
    else if (permission === Permission.BotAdministrator)
        return false;

    if (member.permissions.has('ADMINISTRATOR'))
        return true;
    else if (permission === Permission.GuildAdministrator)
        return false;

    if (member.roles.cache.some(r => r.name === Permission[permission]))
        return true;

    return false;
}

export function requirePermission(permission: Permission, member: GuildMember | null): void {
    if (!member || !hasPermission(permission, member)) {
        throw Error('あなたはこのコマンドを実行する権限を持っていません。');
    }
}
