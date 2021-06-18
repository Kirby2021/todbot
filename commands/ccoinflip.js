const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'ccoinflip',
    description: 'Coinflip single player',
    execute(client, message, args) {
        var arr = ['heads', 'tails'];
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1] || !arr.includes(args[1].toLowerCase())) return message.reply('Bad format! Example: `;ccoinflip 100 heads`');
        args[0] = parseInt(args[0]);
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
                
                if (users[0] != undefined) {
                    if (users[0].balance >= args[0]) {
                        const embed = new MessageEmbed();
                        embed.setDescription('Tossing Coin');
                        message.channel.send(embed).then(async m => {
                            var coinflip = ['heads', 'tails'];
                            var result = coinflip[Math.floor(Math.random() * coinflip.length)]
                            if (result == args[1].toLowerCase()) {
                                bnow = users[0].balance + args[0];
                                wnow = users[0].stats.coinflip.win + 1;
                                totcwnow = users[0].stats.totcoins.win + args[0];
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        balance: bnow,
                                        "stats.coinflip.win": wnow,
                                        "stats.totcoins.win": totcwnow
                                    }
                                });
                                embed.setTitle('CASINO: COINFLIP')
                                embed.setColor('#00FF11')
                                embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\nYou won `' + args[0] + ' coins`')
                                m.edit(embed);
								client.close()
                            } else {
                                bnow = users[0].balance - args[0];
                                lnow = users[0].stats.coinflip.lose + 1;
                                totclnow = users[0].stats.totcoins.lose + args[0];
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        balance: bnow,
                                        "stats.coinflip.lose": lnow,
                                        "stats.totcoins.lose": totclnow
                                    }
                                });
                                embed.setTitle('CASINO: COINFLIP')
                                embed.setColor('#FF0009')
                                embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\nYou lose `' + args[0] + ' coins`')
                                m.edit(embed);
								client.close()
                            }
                        });
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: COINFLIP')
                            .addFields({
                                name: `Failed`,
                                value: `You don't have enough coins.`
                            })
                        message.channel.send(embed);
						client.close()
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: COINFLIP')
                        .addFields({
                            name: `Failed`,
                            value: 'You are not registered. Please type `;cregister` to register and start playing.'
                        })
                    message.channel.send(embed);
					client.close()
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    },
};