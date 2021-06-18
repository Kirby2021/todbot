const {
    MessageEmbed
} = require('discord.js');
const mongodb = require('mongodb');
const {
	connectionString,
} = require('../json/config.json');

const connstr = connectionString;

module.exports = {
    name: 'cdaily',
    description: 'Get daily balance for betting',
    execute(client, message, args) {
        try {
            mongodb.connect(connstr, async function (err, client) {
                const db = client.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
                const now = new Date();
    
                if (users[0] != undefined) {
                    const then = new Date(users[0].date);
                    const diff = now.getTime() - then.getTime();
                    const diffHours = Math.round(diff / (1000 * 60 * 60));
    
                    if (diffHours <= 24) {
                        const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CASINO: DAILY COINS')
                        .addFields({
                            name: `Failed`,
                            value: 'You can claim daily coins in `' + (24 - diffHours) + ' hours`.'
                        });
                    message.channel.send(embed);
                    } else {
                        bnow = users[0].balance + 1000000;
                        await db.collection("users").updateOne({
                            uid: message.author.id
                        }, {
                            $set: {
                                balance: bnow,
                                date: now.getTime()
                            }
                        });
                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('CASINO: DAILY COINS')
                            .addFields({
                                name: `Success`,
                                value: 'You claimed `' + 1000000 + '` coins'
                            });
                        message.channel.send(embed);
                    }
                } else {
                    const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CASINO: DAILY COINS')
                            .addFields({
                                name: `Failed`,
                                value: 'You are not registered. Please type `;cregister` to register and start playing.'
                            });
                        message.channel.send(embed);
                }
				client.close()
            })
        }
        catch(e) {
            console.log(e);
        }
    },
};