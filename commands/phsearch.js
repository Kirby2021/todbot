const {
    MessageEmbed
} = require('discord.js');
const PornHub = require('pornhub.js')
const pornhub = new PornHub()

module.exports = {
    name: 'phsearch',
    description: 'Porn Hub Search',
    args: true,
    execute: async function (client, message, args) {
	if (!message.channel.nsfw) {
            message.react('??');
            return message.reply("This is not an NSFW channel, you horny dumbass")
                .then(msg => {
                    msg.delete({
                        timeout: 3000
                    })
                })
        }

        var i = 0
        pornhub.search('Video', `${args[0]}`).then(res => {
            res.data.forEach(item => {
                if (i == 5) {
                    return;
                }
                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle(`${item.title}`)
                    .setURL(`${item.url}`)
                    .addFields({
                        name: `Duration`,
                        value: `${item.duration}`
                    }, {
                        name: `HD`,
                        value: `${item.hd}`
                    }, {
                        name: `Premium`,
                        value: `${item.premium}`
                    })
                    .setImage(`${item.preview}`);
                message.channel.send(embed);
                i++;
            })
        })
    },
};