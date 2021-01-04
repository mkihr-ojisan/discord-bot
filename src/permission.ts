import { GuildMember } from 'discord.js';
import { getConfig } from './config';

export enum Permission {
    Administrator,
    ManageBot,
}

export function hasPermission(permission: Permission, member: GuildMember): boolean {
    if (member.id === getConfig('admin.id'))
        return true;
    if (permission === Permission.Administrator)
        return false;
    if (member.roles.cache.some(r => r.name === Permission[permission]))
        return true;

    return false;
}

export function requirePermission(permission: Permission, member: GuildMember | null): void {
    if (!member || !hasPermission(permission, member)) {
        throw Error('you do not have permission to execute this command.');
    }
}
