const {
    MessageEmbed
} = require('discord.js');
const axios = require('axios');
const {
    cak,
    prefix
} = require('../json/config.json');

module.exports = {
    name: 'convert',
    description: 'Convert currency',
    args: true,
    execute: async function (client, message, args) {
            var query = args[1].toUpperCase() + '_' + args[2].toUpperCase()
            axios.get(`https://free.currconv.com/api/v7/convert?q=${query}&apiKey=${cak}`).then(response => {
                data = response.data
                var val = data.results[query].val
                var result = val * args[0]
                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle('CURRENCY CONVERSION')
                    .addFields({
                        name: `Conver currency from ${args[1].toUpperCase()} to ${args[2].toUpperCase()}`,
                        value: `:point_right: ${result}`
                    });
                message.channel.send(embed);
            }).catch((e) => {
                message.channel.send('**An error occured.**\nFeeling clueless? Type `' + prefix + 'help curreny` to see how to use this command.')
            });
    },
};