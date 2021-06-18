const {
    notDeepEqual
} = require('assert');
const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cregister',
    description: 'Register to casino and start playing',
    execute(client, message, args) {
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const now = new Date();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: REGISTER')
                        .addFields({
                            name: `Failed`,
                            value: 'You already registered in the system.'
                        });
                    message.channel.send(embed);
                } else {
                    await db.collection("users").insertOne({
                        uid: message.author.id,
                        balance: 1000,
                        date: 0,
						badge: "",
                        stats: {
                            totcoins: {
                                win: 0,
                                lose: 0
                            },
                            coinflip: {
                                win: 0,
                                lose: 0
                            },
                            coinflipd: {
                                win: 0,
                                lose: 0
                            },
                            dice: {
                                win: 0,
                                lose: 0,
                                snakeeyes: 0
                            },
                            diced: {
                                win: 0,
                                lose: 0,
                                snakeeyes: 0
                            },
                            slot: {
                                win: 0,
                                lose: 0,
                                jackpot: 0
                            },
                            roullete: {
                                win: 0,
                                lose: 0,
                                jackpot: 0
                            },
                            crash: {
                                win: 0,
                                lose: 0
                            }
                        }
                    });

                    const embed = new MessageEmbed()
                        .setColor('#00FF11')
                        .setTitle('CASINO: REGISTER')
                        .addFields({
                            name: `Success`,
                            value: 'You are now registered on the system, have fun!'
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