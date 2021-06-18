const { MessageEmbed } = require('discord.js');
const {
	prefix
} = require('../json/config.json');

module.exports = {
	name: 'help',
    description: 'Get generated random fake data',
    args: true,
	execute: async function(client, message, args) {
		if(args[0] === "faker"){
				const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}faker COMMAND USAGE`)
				.addFields(
					{ name: `${prefix}fake person`, value: 'Generate fake person data' },
					{ name: `${prefix}faker cc`, value: 'Generate fake credit card' }
                );
			message.channel.send(embed);
		}
		else if(args[0] === "covid"){
				const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(';covid COMMAND USAGE')
				.addFields(
					{ name: ';covid global', value: 'Get global Covid-19 cases' },
					{ name: ';covid <country>', value: 'Get Covid-19 cases by country name. Example: `;covid id` to get Covid-19 cases in Indonesia' }
                );
			message.channel.send(embed);
        }
        else if(args[0] === "commands"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle('ALL COMMANDS')
				.addFields(
                    { name: 'Moderation Commands (Admin)', 
                    value: '`;ban <@member>`, `;kick <@member>`, `;clear <amount>`' },
                    { name: 'Fun Commands', 
                    value: '`;lovecalc <firstname> <secondname>`' },
                    { name: 'Game Related Commands', 
                    value: '`;apex <platform> <identifier>` `;dota <args> <SteamVanityURL>`' },
                    { name: 'Information Commands', 
                    value: '`;covid <args>`, `;crypto <crypto>`, `;weather <city>`, `;ping`, `;invite`, `;serverinfo`, `;botinfo`, `;convert <amount> <from> <to>`, `;help <command>`' },
                    { name: 'Account Generator Commands', 
                    value: '`;gen <args>`'},
		    { name: 'NSFW Commands', 
                    value: '`;nsfw <args>`, `;phsearch <keyword>`'},
		    { name: 'Animu', 
                    value: '`;borutod <eps> <quality>`'},
					{ name: 'Casino Commands', 
                    value: '`;cregister`, `;cprofile <@user>`, `;cgive <amount> <@user>`, `;ccoinflip <bet> <heads/tails>` (Solo), `;cdice <bet> <low/high>` (Solo), `;cdiced <bet> <@user>` (Duo), `;ccoinflipd <bet> <@user>` (Duo), `;cslot <bet>`, `;ccrash <amount>`, `;cbadge`, `;croullete <coming soon>`'},
                    { name: 'Utilities Commands', 
                    value: '`;slink <link>`, `;r <args>`, `;cpoll`, `;faker <args>`, `;random <number> <number>`, `;coinflip`, `;wa <nama> <pesan> (MAINTENANCE)`'},
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Detailed Information', 
                    value: 'Still feeling lost or not sure how to use those commands? Type `;help <command>` for example `;help slink`' },
                );
			message.channel.send(embed);
        }
		else if(args[0] === "cregister"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}cregister COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}register`, value: 'Register to the casino system' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "cprofile"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}cprofile COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}cprofile`, value: 'Check a user casino profile. Example: `;cprofile @KangOka`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "ccoinflip"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}ccoinflip COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}ccoinflip`, value: 'Play a coinflip game (solo). Example: `;ccoinflip 1000 heads`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "cdice"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}cdice COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}cdice`, value: 'Play a dice game (solo). Example: `;cdice 1000`' },
                    { name: `Information`, value: 'Snake eyes: 1 and 1 win `10x bet`\nWin: dice 1 == dice 2 and win `2x` bet\nLow/High win' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "cgive"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}cgive COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}cgive`, value: 'Give a user amount of coins. Example: `;cgive 1000 @KangOka`' }
                );
			message.channel.send(embed);
        }
        else if(args[0] === "borutod"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}borutod COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}borutod <eps> <quality>`, value: 'Get streamable link for animu Boruto. Example: `${prefix}borutod 177 1080`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "dota"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle(`${prefix}dota COMMANDS USAGE (Profile need to be public and have ever play Dota 2)`)
                .addField(`Steam Vanity URL Example`, `steamcommunity.com/id/**okatampz**`)
				.addFields(
                    { name: `${prefix}dota player`, value: 'Get Dota 2 player lookup. Example: ' + '`'+`${prefix}dota player okatampz`+'`' },
                    { name: `${prefix}dota recentmatch`, value: 'Get recent match a player. Example: ' + '`'+`${prefix}dota recentmatch okatampz`+'`' }
                );
			message.channel.send(embed);
        }
        else if(args[0] === "gen"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle(`${prefix}gen COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}gen <account>`, value: 'Available commands: nord, vyper, hma, ipvanish, windscribe, origin, steam, uplay, minecraft, disneyplus, hulu, netflix, crunchyroll, pornhub, meganz' },
                    { name: `${prefix}gen stock`, value: 'Check accounts stock' }
                );
			message.channel.send(embed);
        }
	else if(args[0] === "nsfw"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle(`${prefix}nsfw COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}nsfw <args>`, value: 'Available args: boobs, butts, pussy, 4k, gif, hentai' }
                );
			message.channel.send(embed);
        }
        else if(args[0] === "apex"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}apex COMMANDS USAGE`)
				.addField('Note', `I can only fetch available data from banner, so if you wan't to get your data fetched, then make sure it's on your banner.`)
				.addFields(
                    { name: `${prefix}apex <platform> <identifier>`, value: 'Get Apex Legends player stats by given args. Example: ' + '`'+`${prefix}apex origin MKLWGimang`+'`'},
                );
			message.channel.send(embed);
        }
        else if(args[0] === "convert"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}convert COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}convert <amount> <from> <to>`, value: 'Convert from currency A to currency B. Example: ' + '`'+`${prefix}convert 2 USD IDR`+'`'},
                );
			message.channel.send(embed);
        }
        else if(args[0] === "lovecalc"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}lovecalc COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}lovecalc <firstname> <secondname>`, value: 'Get love percentage. Example: ' + '`'+`${prefix}lovecalc John Alice`+'`'},
                );
			message.channel.send(embed);
        }
        else if(args[0] === "weather"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}weather COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}weather <city>`, value: 'Get current <city> weather. Example: ' + '`'+`${prefix}weather Semarang`+'`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "slink"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}slink COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}slink <url>`, value: 'Shorten long url. Example: ' + '`'+`${prefix}slink http://google.com/`+'`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "random"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}random COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}random <number> <number>`, value: 'Get random number from given input number. Example: ' + '`'+`${prefix}random 1 10`+'`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "crypto"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}crypto COMMANDS USAGE`)
				.addFields(
                    { name: `${prefix}crypto <cryptocurrency>`, value: 'Get current cryptocurrency price. Example: ' + '`'+`${prefix}crypto btc`+'`'+' available cryptocurrency `btc` and `eth`' },
                );
			message.channel.send(embed);
        }
        else if(args[0] === "r"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(`${prefix}r COMMAND USAGE`)
				.addFields(
                    { name: `${prefix}r cat`, value: 'Get random cat images' },
                    { name: `${prefix}r dog`, value: 'Get random dog images' }
                );
			message.channel.send(embed);
        }
        else if(args[0] === "all"){
            const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle('FEELING LOST?')
				.addField(`${prefix}help commands`, 'Get all command list');
			message.channel.send(embed);
        }
        else{
            message.channel.send('I dunno wachu mean. Type ' + '`'+`${prefix}help commands`+'`'+' to see all commands')
        }

	},
};