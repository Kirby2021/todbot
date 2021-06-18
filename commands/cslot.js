const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cslot',
    description: 'Play a slot game',
    execute(client, message, args) {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[0]) return message.reply('Bad format! Example: `;cslot 100`');
        args[0] = parseInt(args[0]);

        var arr = [':gem:', ':first_place:', ':100:', ':moneybag:', ':dollar:']
        var lone = Math.floor(Math.random() * 5) + 1
        var ltwo = Math.floor(Math.random() * 5) + 1
        var lthree = Math.floor(Math.random() * 5) + 1
        var lfour = Math.floor(Math.random() * 5) + 1
        var lfive = Math.floor(Math.random() * 5) + 1
        var lsix = Math.floor(Math.random() * 5) + 1
        var lseven = Math.floor(Math.random() * 5) + 1
        var leight = Math.floor(Math.random() * 5) + 1
        var lnine = Math.floor(Math.random() * 5) + 1


        var winl = lfour == lfive
        var winh = lfour == lfive && lfour == lsix
        var jackpot = lfour == 1 && lfive == 1 && lsix == 1

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
                            .setTitle('CASINO: SLOT')
                            .setDescription(arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + '\n ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' \n' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1] + ' ' + arr[Math.floor(Math.random() * 5) + 1 - 1]);
                        message.channel.send(embed).then(async m => {
                            m.react('796132964039131176')
                            const filter = (reaction, userr) => {
                                return reaction.emoji.name === 'spin' && userr.id === message.author.id
                            };

                            m.awaitReactions(filter, {
                                    max: 1,
                                    time: 15000,
                                    errors: ['time'],
                                })
                                .then(async collected => {
                                    const embed = new MessageEmbed()
                                        .setColor('#0099FF')
                                        .setTitle('CASINO: SLOT')
                                        .setDescription('<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + '\n ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' \n' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>');
                                    m.edit(embed).then(async a => {
                                        await new Promise(r => setTimeout(r, 2000));
                                        const embed = new MessageEmbed()
                                            .setColor('#0099FF')
                                            .setTitle('CASINO: SLOT')
                                            .setDescription(arr[lone - 1] + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + '\n ' + arr[lfour - 1] + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>' + ' \n' + arr[lseven - 1] + ' ' + '<a:cycle:796132989045702716>' + ' ' + '<a:cycle:796132989045702716>');
                                        a.edit(embed).then(async me => {
                                            await new Promise(r => setTimeout(r, 2000));
                                            const embed = new MessageEmbed()
                                                .setColor('#0099FF')
                                                .setTitle('CASINO: SLOT')
                                                .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + '<a:cycle:796132989045702716>' + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + '<a:cycle:796132989045702716>' + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + '<a:cycle:796132989045702716>');
                                            me.edit(embed).then(async mes => {
                                                await new Promise(r => setTimeout(r, 2000));
                                                const embed = new MessageEmbed()
                                                    .setColor('#0099FF')
                                                    .setTitle('CASINO: SLOT')
                                                    .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1]);
                                                mes.edit(embed).then(async msg => {
                                                    if (jackpot) {
                                                        bnow = users[0].balance + (args[0] * 10);
                                                        sjnow = users[0].stats.slot.jackpot + 1;
                                                        totcwnow = users[0].stats.totcoins.win + (args[0] * 10);
                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                balance: bnow,
                                                                "stats.slot.jackpot": sjnow,
                                                                "stats.totcoins.win": totcwnow
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('CASINO: SLOT')
                                                            .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1])
                                                            .addFields({
                                                                name: `777`,
                                                                value: 'Jackpot! You won `' + args[0] * 10 + '` coins'
                                                            });
                                                        msg.edit(embed)
														client.close()

                                                    } else if (winh) {
                                                        bnow = users[0].balance + (args[0] * 3);
                                                        wnow = users[0].stats.slot.win + 1;
                                                        totcwnow = users[0].stats.totcoins.win + (args[0] * 3);
                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                balance: bnow,
                                                                "stats.slot.win": wnow,
                                                                "stats.totcoins.win": totcwnow
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('CASINO: SLOT')
                                                            .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1])
                                                            .addFields({
                                                                name: `Win!`,
                                                                value: 'You won `' + args[0] * 3 + '` coins'
                                                            });
                                                        msg.edit(embed)
														client.close()
                                                    } else if (winl) {
                                                        bnow = users[0].balance + args[0];
                                                        wnow = users[0].stats.slot.win + 1;
                                                        totcwnow = users[0].stats.totcoins.win + args[0];
                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                balance: bnow,
                                                                "stats.slot.win": wnow,
                                                                "stats.totcoins.win": totcwnow
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#00FF11')
                                                            .setTitle('CASINO: SLOT')
                                                            .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1])
                                                            .addFields({
                                                                name: `Win!`,
                                                                value: 'You won `' + args[0] + '` coins'
                                                            });
                                                        msg.edit(embed)
														client.close()
                                                    } else {
                                                        bnow = users[0].balance - args[0];
                                                        lnow = users[0].stats.slot.lose + 1;
                                                        totcwnow = users[0].stats.totcoins.lose + args[0];
                                                        await db.collection("users").updateOne({
                                                            uid: message.author.id
                                                        }, {
                                                            $set: {
                                                                balance: bnow,
                                                                "stats.slot.lose": lnow,
                                                                "stats.totcoins.lose": totcwnow
                                                            }
                                                        });

                                                        const embed = new MessageEmbed()
                                                            .setColor('#FF0009')
                                                            .setTitle('CASINO: SLOT')
                                                            .setDescription(arr[lone - 1] + ' ' + arr[ltwo - 1] + ' ' + arr[lthree - 1] + '\n ' + arr[lfour - 1] + ' ' + arr[lfive - 1] + ' ' + arr[lsix - 1] + ' \n' + arr[lseven - 1] + ' ' + arr[leight - 1] + ' ' + arr[lnine - 1])
                                                            .addFields({
                                                                name: `Lost!`,
                                                                value: 'You just lost `' + args[0] + '` coins'
                                                            });
                                                        msg.edit(embed)
														client.close()
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                                .catch(collected => {
                                    m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                    const embed = new MessageEmbed()
                                        .setColor('#FF0009')
                                        .setTitle('CASINO: SLOT')
                                        .addFields({
                                            name: `Game Abort`,
                                            value: `You didn't press the <:spin:796132964039131176> button`
                                        });
                                    m.edit(embed);
									client.close()
                                });

                        })
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: SLOT')
                            .addFields({
                                name: `Failed`,
                                value: `You don't have enough coins.`
                            });
                        message.channel.send(embed);
						client.close()
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: SLOT')
                        .addFields({
                            name: `Failed`,
                            value: 'You are not registered. Please type `;cregister` to register and start playing.'
                        });
                    m.edit(embed);
					client.close()
                }
            })
        } catch (e) {
            message.reply('An error occured. Please contact **KangOka**')
        }
    },
};