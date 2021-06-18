const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: 'Get server info',
    execute(client, message, args) {
            let inline = true
            let sicon = message.guild.iconURL;
            let serverembed = new MessageEmbed()
            .setColor(3066993)
            .setThumbnail(sicon)
            .setAuthor(message.guild.name)
            .addField("Name", message.guild.name, inline)
            .addField("ID", message.guild.id, inline)
            .addField("Owner", message.guild.owner, inline)
            .addField("Region", message.guild.region, inline)
            .addField("Verification Level", message.guild.verificationLevel,inline)
            .addField("Members", message.guild.memberCount, inline)
            .addField("You Joined", message.member.joinedAt)
            .addField("Created", message.guild.createdAt);
        
            message.channel.send(serverembed);
    },
};