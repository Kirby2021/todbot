const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cgive',
    description: 'Give mentioned user casino coins',
    execute(client, message, args) {
        if (!args[1] || !args[0] || isNaN(parseInt(args[0]))) return message.reply('Bad format! Example: `;cgive 1000 @KangOka`')
        args[0] = parseInt(args[0])
        const user = message.mentions.users.first().id;
        if (user == message.author.id) return message.reply('Seriously?')
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: user
                }).toArray();
                const userz = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    if (userz[0].balance >= args[0]) {
                        receiver = users[0].balance + args[0];
                        sender = userz[0].balance - args[0];
                        await db.collection("users").updateOne({
                            uid: user
                        }, {
                            $set: {
                                balance: receiver
                            }
                        });

                        await db.collection("users").updateOne({
                            uid: message.author.id
                        }, {
                            $set: {
                                balance: sender
                            }
                        });

                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('CASINO: GIVE COINS')
                            .addFields({
                                name: `Success`,
                                value: 'You gave <@' + user + '> `' + args[0] + '` coins'
                            });
                        message.channel.send(embed);
                    }
                    else{
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: GIVE COINS')
                            .addFields({
                                name: `Failed`,
                                value: `You don't have enough coins`
                            });
                        message.channel.send(embed);
                    }
                } else {
                    const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: GIVE COINS')
                            .addFields({
                                name: `Failed`,
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