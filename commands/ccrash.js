const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'ccrash',
    description: 'Crash single player',
    execute(client, message, args) {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) < 10 || !args[0]) return message.reply('Bad format! Example: `;ccrash 100`.\nNote: Min bet `10 coins`');
        args[0] = parseInt(args[0])
        let multiplier = 1.0
        let profit = 0.0
        let crash = (Math.random() * (1.0 - 5.0) + 5.0).toFixed(1)
        let increment = 1.0
        let cond = true
        let l = false
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    if (users[0].balance >= args[0]) {
                        const embed = new MessageEmbed()
                            .setColor('#0099FF')
                            .setTitle('CASINO: CRASH')
                            //.setDescription('**Multiplier**\n' + (multiplier).toFixed(1) + 'x\n\n**Profit**\n' + profit + ' coins\n\nNote: Current max crash is `5.0`. React below if would like to stop')
                            .addFields({
                                name: 'Multiplier',
                                value: (multiplier).toFixed(1) + 'x',
                                inline: true
                            }, {
                                name: 'Profit',
                                value: profit + ' coins',
                                inline: true
                            }, {
                                name: 'Note',
                                value: 'Current max crash is `5.0`. React below if would like to stop'
                            });
                        return message.channel.send(embed).then(async m => {
                            m.react('795938898769084416')
                            const filter = (reaction, userr) => {
                                return reaction.emoji.name === 'stop' && userr.id === message.author.id
                            };

                            m.awaitReactions(filter, {
                                    max: 1,
                                    time: 67000,
                                    errors: ['time'],
                                })
                                .then(async collected => {
                                    if (collected.first()._emoji.name == 'stop') {
                                        if (!l) {
                                            cond = false
                                            await new Promise(r => setTimeout(r, 2000));

                                            bnow = users[0].balance + Math.round(profit);
                                            cnow = users[0].stats.crash.win + 1;
                                            totcwnow = users[0].stats.totcoins.win + Math.round(profit);
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    "stats.crash.win": cnow,
                                                    "stats.totcoins.win": totcwnow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: CRASH')
                                            //embed.setDescription('**Stopped at**\n' + (multiplier).toFixed(1) + 'x\n\n**Profit**\n' + profit + ' coins')
                                            embed.fields = []
                                            embed.addFields({
                                                name: 'Stopped at',
                                                value: (multiplier).toFixed(1) + 'x',
                                                inline: true
                                            }, {
                                                name: 'Profit',
                                                value: Math.round(profit) + ' coins',
                                                inline: true
                                            });
                                            m.edit(embed)
                                            client.close()
                                        }
                                    }
                                })
                                .catch(collected => {
                                    client.close()
                                });

                            await new Promise(r => setTimeout(r, 3000));
                            while (cond) {
                                await new Promise(r => setTimeout(r, 1400));
                                increment += 0.1
                                multiplier += 0.1
                                profit += args[0] * 0.1
                                if (parseFloat((increment).toFixed(1)) >= parseFloat(crash)) {
                                    cond = false
                                    l = true
                                }
                                embed.setColor('#0099FF')
                                embed.setTitle('CASINO: CRASH')
                                //embed.setDescription('**Multiplier**\n' + (multiplier).toFixed(1) + 'x\n\n**Profit**\n' + profit + ' coins\n\nNote: Current max crash is `5.0`. React below if would like to stop')
                                embed.fields = []
                                embed.addFields({
                                    name: 'Multiplier',
                                    value: (multiplier).toFixed(1) + 'x',
                                    inline: true
                                }, {
                                    name: 'Profit',
                                    value: Math.round(profit) + ' coins',
                                    inline: true
                                }, {
                                    name: 'Note',
                                    value: 'Current max crash is `5.0`. React below if would like to stop'
                                });
                                m.edit(embed)
                            }

                            if (l) {
                                bnow = users[0].balance - args[0];
                                cnow = users[0].stats.crash.lose + 1;
                                totcwnow = users[0].stats.totcoins.lose + args[0];
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        balance: bnow,
                                        "stats.crash.lose": cnow,
                                        "stats.totcoins.lose": totcwnow
                                    }
                                });

                                embed.setColor('#FF0009')
                                embed.setTitle('CASINO: CRASH')
                                //embed.setDescription('**Crashed at**\n' + (multiplier).toFixed(1) + 'x\n\n**Lost**\n' + args[0] + ' coins')
                                embed.fields = []
                                embed.addFields({
                                    name: 'Crashed at',
                                    value: (multiplier).toFixed(1) + 'x',
                                    inline: true
                                }, {
                                    name: 'Profit',
                                    value: '-' + args[0] + ' coins',
                                    inline: true
                                });
                                m.edit(embed)
                                client.close()
                            }

                        })
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: CRASH')
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
                        .setTitle('CASINO: CRASH')
                        .addFields({
                            name: `Failed`,
                            value: 'You are not registered. Please type `;cregister` to register and start playing.'
                        });
                    message.channel.send(embed);
                    client.close()
                }
            })
        } catch (e) {
            console.log(e);
        }
    },
};