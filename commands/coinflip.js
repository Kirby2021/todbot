const Discord = require('discord.js');
module.exports = {
    name: 'coinflip',
    description: 'Coinflip',
    execute(client, message, args) {
        const embed = new Discord.MessageEmbed();
        embed.setDescription('Tossing Coin');
        message.channel.send(embed).then(m => {
            var coinflip = ['Heads!', 'Tails!'];
            var result = coinflip[Math.floor(Math.random() * coinflip.length)]
            embed.setTitle('COINFLIP')
            embed.setColor(3066993)
            embed.setDescription(`Result: ${result}`)
            m.edit(embed);
        });
    },
};