import { Client, Message } from 'discord.js';

export default {
    name: 'amongusmap',
    aliases: ['m'],
    shortDescription: 'show the specified map for Among Us',
    description: `**USAGE**
> $amongusmap {s[keld] | m[ira] | p[olus]}
> $m {s[keld] | m[ira] | p[olus]}

**DESCRIPTION**
> Displays the specified map for Among Us.`,
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        if (args.length !== 1) {
            await message.channel.send(':x: **Invalid argument.**');
            return;
        }

        switch (args[0]) {
            case 'skeld':
            case 's':
                await message.channel.send(':rocket: **THE SKELD MAP**');
                await message.channel.send({ files: ['res/maps/skeld.png'] });
                break;
            case 'mira':
            case 'm':
                await message.channel.send(':cityscape: **MIRA HQ MAP**');
                await message.channel.send({ files: ['res/maps/mira.png'] });
                break;
            case 'polus':
            case 'p':
                await message.channel.send(':star_and_crescent: **POLUS MAP**');
                await message.channel.send({ files: ['res/maps/polus.png'] });
                break;
            default:
                await message.channel.send(':x: **Unknown map name**');
                break;
        }
    }
};