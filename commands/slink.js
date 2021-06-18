const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const {
	bly
} = require('../json/config.json');

module.exports = {
	name: 'slink',
    description: 'Short link',
    args: true,
	execute: async function(client, message, args) {
            message.delete()
            var headers = {
                'Authorization': 'Bearer ' + bly,
                'Content-Type': 'application/json'
            };
            
            var dataString = `{ "long_url": "${args[0]}", "domain": "bit.ly" }`;
            
            var options = {
                headers: headers,
                body: dataString
            };
			axios.post("https://api-ssl.bitly.com/v4/shorten", dataString, options).then(response => {
                slink = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('SHORT LINK')
				.addFields(
					{ name: 'Your Link', value: args[0] },
					{ name: 'Shorten Link', value: slink.link },
                );
            message.channel.send(embed);
			}).catch((e) => {
                if(e.response.data.message === "INVALID_ARG_LONG_URL"){
                    message.channel.send("You need to provide link starts with `http://` or `https://`")
                }
			});
	},
};