const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const {
	tgg,
} = require('../json/config.json');

module.exports = {
	name: 'apex',
    description: 'Get apex stat from a player',
    args: true,
	execute: async function(client, message, args) {
			axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${args[0]}/${args[1]}`, { headers: {
                "TRN-Api-Key": tgg 
                }
            }).then(response => {
				apex = response.data;

				var arr = JSON.parse(JSON.stringify(apex))
				//console.log(arr)

				function isFound(ini){
					if(typeof ini === 'undefined'){
						return "Can't fetch the data";
					}
					else{
						return ini.value;
					}
				}
				function isFoundS(s){
					if(typeof s === 'undefined'){
						return "Can't fetch the data";
					}
					else{
						return arr.data.platformInfo.platformSlug;
					}
				}
				function isFoundI(i){
					if(typeof i === 'undefined'){
						return "Can't fetch the data";
					}
					else{
						return arr.data.platformInfo.platformUserIdentifier;;
					}
				}
				function isFoundL(l){
					if(typeof l === 'undefined'){
						return "Can't find the data"
					}
					else{
						return arr.data.metadata.activeLegendName;
					}
				}
				//console.log(apex.data.segments[0].stats.pistolKills.value)

				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('APEX PLAYER STATS')
                .setThumbnail(`https://trackercdn.com/cdn/apex.tracker.gg/legends/${arr.data.metadata.activeLegendName.toLowerCase()}-tile.png`)
				.addFields(
					{ name: 'Platform', value: isFoundS(arr.data.platformInfo) },
					{ name: 'IGN', value: isFoundI(arr.data.platformInfo) },
					{ name: 'Main Legend', value: isFoundL(arr.data.metadata) },
					{ name: 'Level', value: isFound(arr.data.segments[0].stats.level) },
					{ name: 'Kills', value: isFound(arr.data.segments[0].stats.kills) },
                    { name: 'Damage', value: isFound(arr.data.segments[0].stats.damage) },
                    { name: 'Headshots', value: isFound(arr.data.segments[0].stats.headshots) },
					{ name: 'Pistol Kills', value: isFound(arr.data.segments[0].stats.pistolKills) }
                )
			message.channel.send(embed);
			}).catch((e) => {
				// if (e.response.data.errors[0].code === "CollectorResultStatus::NotFound") {
                //     message.channel.send(e.response.data.errors[0].message + " `;help apex` to see how to use.")
				// }
				//else{
					console.log(e)
					message.channel.send("An error occured. `;help apex` to see how to use.")
				//}
			});
	},
};