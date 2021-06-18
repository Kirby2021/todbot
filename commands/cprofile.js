const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cprofile',
    description: 'Check casino user profile',
    execute(client, message, args) {
        if (!args[0]) return message.reply('You need to mention the user!')
		if (!isNaN(args[0])) return message.reply(`C'mon, you need mention the user`)
        const user = message.mentions.users.first().id;
	
		function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: user
                }).toArray();

                if (users[0] != undefined) {
                    const embed = new MessageEmbed()
                        .setColor('#00FF11')
                        .setTitle('CASINO: PROFILE')
                        .addFields({
                            name: 'User',
                            value: `<@${user}>`
                        }, {
                            name: 'Coins',
                            value: formatNumber(users[0].balance) + ` :coin:`
                        }, {
                            name: 'Total Win',
                            value: formatNumber(users[0].stats.totcoins.win) + ` :coin:`
                        }, {
                            name: 'Total Lose',
                            value: formatNumber(users[0].stats.totcoins.lose) + ` :coin:`
                        }, {
                            name: '\u200B',
                            value: '\u200B'
                        }, {
                            name: 'Coinflip (Solo)',
                            value: 'Win: `' + users[0].stats.coinflip.win + '`\nLose: `' + users[0].stats.coinflip.lose + '`',
                            inline: true
                        }, {
                            name: 'Coinflip (Duo)',
                            value: 'Win: `' + users[0].stats.coinflipd.win + '`\nLose: `' + users[0].stats.coinflipd.lose + '`',
                            inline: true
                        }, {
                            name: 'Dice (Solo)',
                            value: 'Win: `' + users[0].stats.dice.win + '`\nLose: `' + users[0].stats.dice.lose + '`\nSnake Eyes: `' + users[0].stats.dice.snakeeyes + '`',
                            inline: true
                        },{
                            name: 'Dice (Duo)',
                            value: 'Win: `' + users[0].stats.diced.win + '`\nLose: `' + users[0].stats.diced.lose + '`',
                            inline: true
                        },{
                            name: 'Slot',
                            value: 'Win: `' + users[0].stats.slot.win + '`\nLose: `' + users[0].stats.slot.lose + '`\nJackpot: `' + users[0].stats.slot.jackpot + '`',
                            inline: true
                        },{
                            name: 'Roullete',
                            value: 'Win: `' + users[0].stats.roullete.win + '`\nLose: `' + users[0].stats.roullete.lose + '`\nJackpot: `' + users[0].stats.roullete.jackpot + '`',
                            inline: true
                        },{
                            name: 'Crash',
                            value: 'Win: `' + users[0].stats.crash.win + '`\nLose: `' + users[0].stats.crash.lose + '`',
                            inline: true
                        },{
                            name: '\u200B',
                            value: '\u200B'
                        },{
                            name: 'Badge',
                            value: users[0].badge == "" ? '-' : users[0].badge,
                            inline: true
                        });
                    message.channel.send(embed);
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: PROFILE')
                        .addFields({
                            name: `Not Found`,
                            value: 'User that you tag is not registered.'
                        });
                    message.channel.send(embed);
                }
				client.close()
            })
        } catch (e) {
            console.log(e);
        }
    },
};