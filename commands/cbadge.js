const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cbadge',
    description: 'Buy badge',
    execute(client, message, args) {
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    const embed = new MessageEmbed()
                    embed.setColor('#0099FF')
                    embed.setTitle('CASINO: BADGE')
                    embed.setDescription('<:dolla:798106593174093835> **Dolla** `' + formatNumber(10000000000000000) + '`\n<:gempink:798106593400455168> **Gem Pink** `' + formatNumber(100000000000000) + '`\n:gem: **Gem** `' + formatNumber(10000000000000) + '`\n<:goldcoin:798084565503442976> **Gold Coins** `' + formatNumber(1000000000000) + '`\n<:silvercoin:798084565951316009> **Silver Coins** `' + formatNumber(100000000000) + '`\n<:gambler:798084567889608724> **Gambler** `' + formatNumber(1000000000) + '`');
                    message.channel.send(embed).then(async m => {
                        Promise.all([
                                m.react('798106593174093835'),
								m.react('798106593400455168'),
								m.react('💎'),
                                m.react('798084565503442976'),
                                m.react('798084565951316009'),
                                m.react('798084567889608724'),
                            ])
                            .catch(() => console.error('One of the emojis failed to react.'));
                        const filter = (reaction, userrr) => {
                            return (reaction.emoji.name === '💎' || reaction.emoji.name === 'goldcoin' || reaction.emoji.name === 'silvercoin' || reaction.emoji.name === 'gambler' || reaction.emoji.name === 'gempink' || reaction.emoji.name === 'dolla') && userrr.id === message.author.id
                        };

                        m.awaitReactions(filter, {
                                max: 1,
                                time: 15000,
                                errors: ['time']
                            })
                            .then(collected => {
                                embed.setTitle('CASINO: BADGE')
                                embed.setColor('#0099FF')
                                embed.setDescription('Proccessing')
                                m.edit(embed).then(async mesege => {
                                    await new Promise(r => setTimeout(r, 3000));
                                    if (collected.first()._emoji.name === '💎') {
                                        if (users[0].balance >= 10000000000000) {
                                            bnow = users[0].balance - 10000000000000;
                                            badgenow = users[0].badge + ':gem:';
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    badge: badgenow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('Success!');
                                            mesege.edit(embed)
                                        } else {
                                            embed.setColor('#FF0009')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('You don\'t have enough coins!');
                                            mesege.edit(embed)
                                        }
                                    } else if (collected.first()._emoji.name === 'goldcoin') {
                                        if (users[0].balance >= 1000000000000) {
                                            bnow = users[0].balance - 1000000000000;
                                            badgenow = users[0].badge + '<:goldcoin:798084565503442976>';
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    badge: badgenow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('Success!');
                                            mesege.edit(embed)
                                        } else {
                                            embed.setColor('#FF0009')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('You don\'t have enough coins!');
                                            mesege.edit(embed)
                                        }
                                    } else if (collected.first()._emoji.name === 'silvercoin') {
                                        if (users[0].balance >= 100000000000) {
                                            bnow = users[0].balance - 100000000000;
                                            badgenow = users[0].badge + '<:silvercoin:798084565951316009>';
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    badge: badgenow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('Success!');
                                            mesege.edit(embed)
                                        } else {
                                            embed.setColor('#FF0009')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('You don\'t have enough coins!');
                                            mesege.edit(embed)
                                        }
                                    } else if (collected.first()._emoji.name === 'gambler') {
                                        if (users[0].balance >= 1000000000) {
                                            bnow = users[0].balance - 1000000000;
                                            badgenow = users[0].badge + '<:gambler:798084567889608724>';
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    badge: badgenow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('Success!');
                                            mesege.edit(embed)
                                        } else {
                                            embed.setColor('#FF0009')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('You don\'t have enough coins!');
                                            mesege.edit(embed)
                                        }
                                    }
									else if (collected.first()._emoji.name === 'dolla') {
                                        if (users[0].balance >= 1000000000000000) {
                                            bnow = users[0].balance - 1000000000000000;
                                            badgenow = users[0].badge + '<:dolla:798106593174093835>';
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    badge: badgenow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('Success!');
                                            mesege.edit(embed)
                                        } else {
                                            embed.setColor('#FF0009')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('You don\'t have enough coins!');
                                            mesege.edit(embed)
                                        }
                                    }
									else if (collected.first()._emoji.name === 'gempink') {
                                        if (users[0].balance >= 1000000000000000) {
                                            bnow = users[0].balance - 1000000000000000;
                                            badgenow = users[0].badge + '<:gempink:798106593400455168>';
                                            await db.collection("users").updateOne({
                                                uid: message.author.id
                                            }, {
                                                $set: {
                                                    balance: bnow,
                                                    badge: badgenow
                                                }
                                            });

                                            embed.setColor('#00FF11')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('Success!');
                                            mesege.edit(embed)
                                        } else {
                                            embed.setColor('#FF0009')
                                            embed.setTitle('CASINO: BADGE')
                                            embed.setDescription('You don\'t have enough coins!');
                                            mesege.edit(embed)
                                        }
                                    }
                                })
                            }).catch(collected => {
                                embed.setTitle('CASINO: BADGE')
                                embed.setColor('#FF0009')
                                embed.setDescription('You didn\'t react to the message')
                                m.edit(embed)
                                client.close()
                            });
                    })
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: BADGE')
                        .addFields({
                            name: `Failed`,
                            value: 'You are not registered on the system'
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