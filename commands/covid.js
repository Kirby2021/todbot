const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const {
	prefix
} = require('../json/config.json');

module.exports = {
	name: 'covid',
    description: 'COVID-19 DATA',
    args: true,
	execute: async function(client, message, args) {
		if(args[0] === "global"){
			var urlGlobal = "https://api.covid19api.com/world/total"
			axios.get(urlGlobal).then(response => {
				dataGlobal = response.data;
				const embed = new MessageEmbed()
				.setColor('#EFFF00')
				.setTitle('DATA COVID-19 ' + args[0])
				.addFields(
					{ name: 'Positif', value: "\:mask: " + dataGlobal.TotalConfirmed},
					{ name: 'Sembuh', value: "\:slight_smile: " + dataGlobal.TotalRecovered },
					{ name: 'Meninggal', value: "\:cry: " + dataGlobal.TotalDeaths }
				);
			message.channel.send(embed);
			}).catch((e) => {
					message.channel.send("**An error occured**")
			});
		}
		else{
			var url = "https://covid19.mathdro.id/api/countries/" + args[0];
		axios.get(url).then(response => {
			data = response.data;
			const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle('DATA COVID-19 ' + args[0])
            .addFields(
                { name: 'Positif', value: "\:mask: " + data.confirmed.value},
                { name: 'Sembuh', value: "\:slight_smile: " + data.recovered.value },
                { name: 'Meninggal', value: "\:cry: " + data.deaths.value }
            );

        message.channel.send(embed);
		}).catch((e) => {
			if (e.response.status == 404) {
				message.channel.send('Invalid country. ' + '`'+`${prefix}help covid`+'`'+' to see all commands')
			}
		});
		}
		
        
        
	},
};