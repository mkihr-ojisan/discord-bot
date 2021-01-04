import { Client, Message } from 'discord.js';

export default {
    name: 'amongus',
    aliases: ['a'],
    shortDescription: 'tools for Among Us',
    description: `**USAGE**
> $amongus subcommand
> $a subcommand

**SUBCOMMANDS**
> **m[ap]** {s[keld] | m[ira] | p[olus]}
> \tShow the map with the specified name.`,
    func: async (_client: Client, message: Message, ...args: string[]): Promise<void> => {
        if (args.length === 0) {
            await message.channel.send(':x: **Invalid argument.**');
            return;
        }

        switch (args[0]) {
            case 'map':
            case 'm':
                if (args.length === 2) {
                    await message.channel.send(':x: **Invalid argument.**');
                    return;
                }

                await map(message, args[1]);
                break;
            default:
                await message.channel.send(':x: **Unknown subcommand.**');
                break;
        }
    }
};

async function map(message: Message, arg: string): Promise<void> {
    switch (arg) {
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