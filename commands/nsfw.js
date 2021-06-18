const {
    MessageEmbed
} = require('discord.js');
const {prefix} = require('../json/config.json');
const axios = require('axios');

module.exports = {
    name: 'nsfw',
    description: 'NSFW content',
    args: true,
    execute: async function (client, message, args) {
        if (!message.channel.nsfw) {
            message.react('??');
            return message.reply("This is not an NSFW channel, you horny dumbass")
                .then(msg => {
                    msg.delete({
                        timeout: 3000
                    })
                })
        }

        if(args[0] == "boobs"){
            axios.get(`http://api.oboobs.ru/boobs/0/1/random`).then(response => {
                data = response.data
                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('BOOBS')
                    .addFields({
                        name: `Model`,
                        value: data[0].model
                    },{
                        name: `ID`,
                        value: data[0].id
                    },{
                        name: `Rank`,
                        value: data[0].rank
                    })
                    .setImage('http://media.oboobs.ru/' + data[0].preview)
                message.channel.send(embed);
                
            }).catch((e) => {
                console.log(e);
                message.channel.send('**An error occured.**')
            });
        }
        else if(args[0] == "butts"){
            axios.get(`http://api.obutts.ru/butts/0/1/random`).then(response => {
                data = response.data
                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('BUTT')
                    .addFields({
                        name: `Model`,
                        value: data[0].model
                    },{
                        name: `ID`,
                        value: data[0].id
                    },{
                        name: `Rank`,
                        value: data[0].rank
                    })
                    .setImage('http://media.obutts.ru/' + data[0].preview)
                message.channel.send(embed);
                
            }).catch((e) => {
                console.log(e);
                message.channel.send('**An error occured.**')
            });
        }
        else if(args[0] == "4k"){
            axios.get(`https://nekobot.xyz/api/image?type=4k`).then(response => {
                data = response.data
                message.channel.send(data.message);
                
            }).catch((e) => {
                console.log(e);
                message.channel.send('**An error occured.**')
            });
        }
        else if(args[0] == "gif"){
            axios.get(`https://nekobot.xyz/api/image?type=pgif`).then(response => {
                data = response.data
                message.channel.send(data.message);
                
            }).catch((e) => {
                console.log(e);
                message.channel.send('**An error occured.**')
            });
        }
        else if(args[0] == "pussy"){
            axios.get(`https://nekobot.xyz/api/image?type=pussy`).then(response => {
                data = response.data
                message.channel.send(data.message);
                
            }).catch((e) => {
                console.log(e);
                message.channel.send('**An error occured.**')
            });
        }
        else if(args[0] == "hentai"){
            axios.get(`https://nekobot.xyz/api/image?type=hentai`).then(response => {
                data = response.data
                message.channel.send(data.message);
                
            }).catch((e) => {
                console.log(e);
                message.channel.send('**An error occured.**')
            });
        }
        else{
            message.channel.send("Don't know how to use? Try `" + prefix + "help commands` to see the commands");
        }
        
    },
};