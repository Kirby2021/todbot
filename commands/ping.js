const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, message, args) {
        const embed = new Discord.MessageEmbed();
            embed.setDescription('Pinging...');
            message.channel.send(embed).then(m => {
                var ping = m.createdTimestamp - message.createdTimestamp;
                if (ping >= 0 && ping <= 80) {
                    embed.setTitle('PING')
                    embed.setColor(3066993)
                    embed.setDescription(ping + ' ms')
                    m.edit(embed);
                } else if (ping > 80 && ping <= 170) {
                    embed.setTitle('PING');
                    embed.setColor(15105570);
                    embed.setDescription(ping + ' ms');
                    m.edit(embed);
                } else {
                    embed.setTitle('PING');
                    embed.setColor(15158332);
                    embed.setDescription(ping + ' ms');
                    m.edit(embed);
                }
            });
    },
};