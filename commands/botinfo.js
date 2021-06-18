const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Get bot info',
    execute: async function (client, message) {
        let servers = client.guilds.cache.size
        let users = client.users.cache.size;

        const embed = new MessageEmbed()
            .setColor('#0099FF')
            .addField(`Total Servers`, `${servers}`, true)
            .addField(`Total Users`, `${users}`, true)
            .addField(`Creator`, `https://github.com/kangoka`, true)
        message.channel.send(embed);
    },
};