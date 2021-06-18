const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cdice',
    description: 'Dice single player',
    execute(client, message, args) {
        var arr = ['high', 'low'];
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1] || !arr.includes(args[1].toLowerCase())) return message.reply('Wrong format! Example: `;cdice 100 low`');
        args[0] = parseInt(args[0]);
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    if (users[0].balance >= args[0]) {
                        var dice1 = Math.floor(Math.random() * 6) + 1;
                        var dice2 = Math.floor(Math.random() * 6) + 1;
                        var tot = dice1 + dice2;
                        while (tot == 6) {
                            dice1 = Math.floor(Math.random() * 6) + 1;
                            dice2 = Math.floor(Math.random() * 6) + 1;
                            tot = dice1 + dice2;
                        }

                        if (dice1 == 1 && dice2 == 1) {
                            bnow = users[0].balance + (args[0] * 10);
                            senow = users[0].stats.dice.snakeeyes + 1;
                            totcwnow = users[0].stats.totcoins.win + (args[0] * 10);
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    balance: bnow,
                                    "stats.dice.snakeeyes": senow,
                                    "stats.totcoins.win": totcwnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('CASINO: DICE')
                                .addFields({
                                    name: `Dice 1`,
                                    value: `${dice1}`
                                }, {
                                    name: `Dice 2`,
                                    value: `${dice2}`
                                }, {
                                    name: `What a Luck!`,
                                    value: 'You rolled snake eyes (1 and 1) and won `' + args[0] * 10 + '` coins'
                                });
                            message.channel.send(embed);
                        } else if (dice1 == dice2) {
                            bnow = users[0].balance + (args[0] * 2);
                            wnow = users[0].stats.dice.win + 1;
                            totcwnow = users[0].stats.totcoins.win + (args[0] * 2);
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    balance: bnow,
                                    "stats.dice.win": wnow,
                                    "stats.totcoins.win": totcwnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('CASINO: DICE')
                                .addFields({
                                    name: `Dice 1`,
                                    value: `${dice1}`
                                }, {
                                    name: `Dice 2`,
                                    value: `${dice2}`
                                }, {
                                    name: `Double!`,
                                    value: 'You rolled double and won `' + args[0] * 2 + '` coins'
                                });
                            message.channel.send(embed);
                        } else if (tot < 6 && args[1] == 'low') {
                            bnow = users[0].balance + args[0];
                            wnow = users[0].stats.dice.win + 1;
                            totcwnow = users[0].stats.totcoins.win + args[0];
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    balance: bnow,
                                    "stats.dice.win": wnow,
                                    "stats.totcoins.win": totcwnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('CASINO: DICE')
                                .addFields({
                                    name: `Dice 1`,
                                    value: `${dice1}`
                                }, {
                                    name: `Dice 2`,
                                    value: `${dice2}`
                                }, {
                                    name: `Low!`,
                                    value: 'You rolled `' + tot + '` and won `' + args[0] + '` coins'
                                });
                            message.channel.send(embed);
                        } else if (tot > 6 && args[1] == 'high') {
                            bnow = users[0].balance + args[0];
                            wnow = users[0].stats.dice.win + 1;
                            totcwnow = users[0].stats.totcoins.win + args[0];
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    balance: bnow,
                                    "stats.dice.win": wnow,
                                    "stats.totcoins.win": totcwnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('CASINO: DICE')
                                .addFields({
                                    name: `Dice 1`,
                                    value: `${dice1}`
                                }, {
                                    name: `Dice 2`,
                                    value: `${dice2}`
                                }, {
                                    name: `High!`,
                                    value: 'You rolled `' + tot + '` and won `' + args[0] + '` coins'
                                });
                            message.channel.send(embed);
                        } else {
                            bnow = users[0].balance - args[0];
                            lnow = users[0].stats.dice.lose + 1;
                            totclnow = users[0].stats.totcoins.lose + args[0];
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    balance: bnow,
                                    "stats.dice.lose": lnow,
                                    "stats.totcoins.lose": totclnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('CASINO: DICE')
                                .addFields({
                                    name: `Dice 1`,
                                    value: `${dice1}`
                                }, {
                                    name: `Dice 2`,
                                    value: `${dice2}`
                                }, {
                                    name: `Lose!`,
                                    value: 'You `' + tot + '` and lose `' + args[0] + '` coins'
                                });
                            message.channel.send(embed);
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: DICE')
                            .addFields({
                                name: `Failed`,
                                value: `You don't have enough coins.`
                            });
                        message.channel.send(embed);
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: DICE')
                        .addFields({
                            name: `Failed`,
                            value: 'You are not registered. Please type `;cregister` to register and start playing.'
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