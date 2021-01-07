import { Client, Message, MessageEmbed } from 'discord.js';
import getopts from 'getopts';

export default {
    name: 'echo',
    shortDescription: '文字列を表示します。',
    description: {
        usage: '[options] [string]',
        sections: {
            description: 'このコマンドが呼び出されたテキストチャンネルに対して、指定した文字列を出力します。',
            options: `\`--color={#カラーコード | RED | GREEN | ...}\`
メッセージの色を設定します。デフォルト値は\`#d5a446\`。色名として使用できるものは→<https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable>
\`--title=タイトル\`
メッセージのタイトルを設定します。
\`--image=URL\`
メッセージの画像を設定します。\`http://\`または\`https://\`で始まる必要があります。URLは<>で囲むことができます。
\`--url=URL\`
メッセージのタイトルのリンク先を設定します。URLは<>で囲むことができます。`
        }
    },
    func: async (_client: Client, message: Message, ...args: string[]): Promise<MessageEmbed> => {
        const options = getopts(args, {
            string: ['color', 'title', 'image', 'url'],
            default: { color: null }
        });

        if (options.image && options.image.match(/^<.*>$/)) {
            options.image = options.image.slice(1, -1);
        }
        if (options.url && options.url.match(/^<.*>$/)) {
            options.url = options.url.slice(1, -1);
        }

        return new MessageEmbed()
            .setDescription(options._.join(' '))
            .setColor(options.color)
            .setTitle(options.title)
            .setImage(options.image)
            .setURL(options.url);
    }
};
