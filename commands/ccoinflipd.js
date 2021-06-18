const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'ccoinflipd',
    description: 'Coinflip multi player',
    execute(client, message, args) {
        if (isNaN(parseInt(args[0])) || parseInt(args[0]) <= 0 || !args[1]) return message.reply('Bad format! Example: `;ccoinflipd 100 @KangOka`');
        const user = message.mentions.users.first().id;
        const usert = message.author.id;
        if (user == message.author.id) return message.reply('Seriously?')
        args[0] = parseInt(args[0]);
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: user
                }).toArray();
                const userz = await db.collection("users").find({
                    uid: usert
                }).toArray();
                
                if (users[0] != undefined && userz[0] != undefined) {
                    if (users[0].balance >= args[0] && userz[0].balance >= args[0]) {
                        
                        const embed = new MessageEmbed()
                        embed.setColor('#0099FF')
                        embed.setTitle('CASINO: COINFLIP DUO')
                        embed.setDescription('<@' + user + '>, do you want to accept the game?');
                        message.channel.send(embed).then(async m => {
                            m.react('394330939523858454').then(() => m.react('394331039218008064')).catch(() => console.error('One of the emojis failed to react.'));
                            const filter = (reaction, userr) => {
                                return (reaction.emoji.name === 'yea' && userr.id === user) || (reaction.emoji.name === 'nay' && userr.id === user);
                            };

                            m.awaitReactions(filter, {
                                    max: 1,
                                    time: 15000,
                                    errors: ['time']
                                })
                                .then(collected => {
                                    if (collected.first()._emoji.name == 'yea') {
                                        embed.setTitle('CASINO: COINFLIP DUO')
                                        embed.setColor('#0099FF')
                                        embed.setDescription('Randomize the player who choose tails or heads')
                                        m.edit(embed).then(async msg => {
                                            msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                            await new Promise(r => setTimeout(r, 3000));
                                            var pleyer = [user, userz[0].uid];
                                            const resultt = pleyer[Math.floor(Math.random() * pleyer.length)]
                                            embed.setTitle('CASINO: COINFLIP DUO')
                                            embed.setColor('#0099FF')
                                            embed.setDescription(`<@${resultt}>, choose heads or tails`)
                                            msg.edit(embed).then(async meseg => {
                                                meseg.react('795406980365156403').then(() => m.react('795406981765529620')).catch(() => console.error('One of the emojis failed to react.'));
                                                const filter = (reaction, userrr) => {
                                                    return (reaction.emoji.name === 'heads' && userrr.id === resultt) || (reaction.emoji.name === 'tails' && userrr.id === resultt);
                                                };

                                                meseg.awaitReactions(filter, {
                                                        max: 1,
                                                        time: 15000,
                                                        errors: ['time']
                                                    })
                                                    .then(collected => {
                                                        embed.setTitle('CASINO: COINFLIP DUO')
                                                        embed.setColor('#0099FF')
                                                        embed.setDescription('Tossing Coin')
                                                        meseg.edit(embed).then(async mesege => {
                                                            var coinflip = ['heads', 'tails'];
                                                            var result = coinflip[Math.floor(Math.random() * coinflip.length)]
                                                            if (collected.first().users.cache.get(resultt) != undefined){
                                                                var p = resultt
                                                            }
                                                            else{
                                                                var p = resultt
                                                            }
                                                            if (result == collected.first()._emoji.name) {
                                                                if (p == user){
                                                                    var win = user
                                                                    var lose = usert                                                                }
                                                                else{
                                                                    var win = usert
                                                                    var lose = user
                                                                }
                                                                const winner = await db.collection("users").find({
                                                                    uid: win
                                                                }).toArray();

                                                                const loser = await db.collection("users").find({
                                                                    uid: lose
                                                                }).toArray();

                                                                bnow = winner[0].balance + args[0];
                                                                wnow = winner[0].stats.coinflipd.win + 1;
                                                                totcwnow = winner[0].stats.totcoins.win + args[0];
                                                                await db.collection("users").updateOne({
                                                                    uid: win
                                                                }, {
                                                                    $set: {
                                                                        balance: bnow,
                                                                        "stats.coinflipd.win": wnow,
                                                                        "stats.totcoins.win": totcwnow
                                                                    }
                                                                });

                                                                bnow = loser[0].balance - args[0];
                                                                lnow = loser[0].stats.coinflipd.lose + 1;
                                                                totcwnow = loser[0].stats.totcoins.lose + args[0];
                                                                await db.collection("users").updateOne({
                                                                    uid: lose
                                                                }, {
                                                                    $set: {
                                                                        balance: bnow,
                                                                        "stats.coinflipd.lose": lnow,
                                                                        "stats.totcoins.lose": totcwnow
                                                                    }
                                                                });

                                                                embed.setTitle('CASINO: COINFLIP DUO')
                                                                embed.setColor('#00FF11')
                                                                embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\n<@' + win + '> won `' + args[0] + ' coins`\n<@' + lose + '> lose `' + args[0] + ' coins`')
                                                                mesege.edit(embed);
																client.close()
                                                            }
                                                            else{
                                                                if (p == user){
                                                                    var win = usert
                                                                    var lose = user
                                                                }
                                                                else{
                                                                    var win = user
                                                                    var lose = usert
                                                                }
                                                                const winner = await db.collection("users").find({
                                                                    uid: win
                                                                }).toArray();

                                                                const loser = await db.collection("users").find({
                                                                    uid: lose
                                                                }).toArray();

                                                                bnow = winner[0].balance + args[0];
                                                                wnow = winner[0].stats.coinflipd.win + 1;
                                                                totcwnow = winner[0].stats.totcoins.win + args[0];
                                                                await db.collection("users").updateOne({
                                                                    uid: win
                                                                }, {
                                                                    $set: {
                                                                        balance: bnow,
                                                                        "stats.coinflipd.win": wnow,
                                                                        "stats.totcoins.win": totcwnow
                                                                    }
                                                                });

                                                                bnow = loser[0].balance - args[0];
                                                                lnow = loser[0].stats.coinflipd.lose + 1;
                                                                totcwnow = loser[0].stats.totcoins.lose + args[0];
                                                                await db.collection("users").updateOne({
                                                                    uid: lose
                                                                }, {
                                                                    $set: {
                                                                        balance: bnow,
                                                                        "stats.coinflipd.lose": lnow,
                                                                        "stats.totcoins.lose": totcwnow
                                                                    }
                                                                });

                                                                embed.setTitle('CASINO: COINFLIP DUO')
                                                                embed.setColor('#00FF11')
                                                                embed.setDescription('Result: ' + result.charAt(0).toUpperCase() + result.slice(1) + '\n<@' + win + '> won `' + args[0] + '` coins\n<@' + lose + '> lose `' + args[0] + '` coins')
                                                                mesege.edit(embed);
																client.close()
                                                            }
                                                        })
                                                    })
                                                    .catch(collected => {
                                                        embed.setTitle('CASINO: COINFLIP DUO')
                                                        embed.setColor('#FF0009')
                                                        embed.setDescription(`<@${resultt}> isn't here, game abort.`)
                                                        meseg.edit(embed)
														client.close()
                                                    });
                                            })
                                        })
                                    } else if (collected.first()._emoji.name == 'nay') {
                                        embed.setTitle('CASINO: COINFLIP DUO')
                                        embed.setColor('#FF0009')
                                        embed.setDescription(`<@${user}> didn't accept the game`)
                                        m.edit(embed);
										client.close()
                                    }
                                })
                                .catch(collected => {
                                    embed.setTitle('CASINO: COINFLIP DUO')
                                    embed.setColor('#FF0009')
                                    embed.setDescription(`<@${user}> didn't accept the game`)
                                    m.edit(embed);
									client.close()
                                });
                        })
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: COINFLIP DUO')
                            .addFields({
                                name: `Failed`,
                                value: `You or <@${user}> don't have enough coins`
                            });
                        message.channel.send(embed);
						client.close()
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: GIVE COINS')
                        .addFields({
                            name: `Failed`,
                            value: 'Both player need to registered on the system to play.'
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