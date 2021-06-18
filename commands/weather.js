const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const {
	ow
} = require('../json/config.json');

module.exports = {
	name: 'weather',
    description: 'Get current weather city',
    args: true,
	execute: async function(client, message, args) {
			axios.get("http://api.openweathermap.org/data/2.5/weather?q="+ args[0] +"&appid=" + ow).then(response => {
                weather = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('WEATHER INFO')
                .setThumbnail("http://openweathermap.org/img/wn/"+ weather.weather[0].icon +"@2x.png")
				.addFields(
					{ name: 'City', value: weather.name },
					{ name: 'Weather', value: weather.weather[0].main },
					{ name: 'Description', value: weather.weather[0].description }
                )
			message.channel.send(embed);
			}).catch((e) => {
				if (e.response.data.cod == 404) {
                    message.channel.send(e.response.data.message)
                }
			});
	},
};