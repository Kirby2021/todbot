const Discord = require('discord.js');
module.exports = {
    name: 'random',
    description: 'Get a random number from given input',
    args: true,
    execute(client, message, args) {
        const embed = new Discord.MessageEmbed();
            embed.setDescription('Random Shuffle');
            message.channel.send(embed).then(m => {
                    args1 = Math.ceil(args[0])
                    args2 = Math.floor(args[1])
                    number = Math.floor(Math.random() * (args2 - args1)) + args1
                    embed.setTitle('RANDOM NUMBER')
                    embed.setColor(3066993)
                    embed.setDescription(`Result: ${number}`)
                    m.edit(embed);
            });
    },
};