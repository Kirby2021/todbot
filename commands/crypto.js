const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const {
	prefix
} = require('../json/config.json');

module.exports = {
	name: 'crypto',
    description: 'Get cryptocurrency price',
    args: true,
	execute: async function(client, message, args) {
		if(args[0] === "btc"){
			axios.get("https://api.coinlore.net/api/ticker/?id=90").then(response => {
				crypto = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('BITCOIN PRICE')
                .setThumbnail('https://www.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitoin_btc_coin_crypto-512.png')
				.addFields(
					{ name: 'Cryptocurrency', value: crypto[0].name },
					{ name: 'Price USD', value: crypto[0].price_usd}
                );
			message.channel.send(embed);
			}).catch((e) => {
				message.channel.send("**An error occured**")
			});
		}
		else if(args[0] === "eth"){
			axios.get("https://api.coinlore.net/api/ticker/?id=80").then(response => {
				crypto = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('ETHEREUM PRICE')
                .setThumbnail('https://icons-for-free.com/iconfiles/png/512/eth+ethcoin+etherium+icon-1320162857971241492.png')
				.addFields(
					{ name: 'Cryptocurrency', value: crypto[0].name },
					{ name: 'Price USD', value: crypto[0].price_usd}
                );
			message.channel.send(embed);
			}).catch((e) => {
				message.channel.send("**An error occured**")

			});
        }
        else{
            message.channel.send('I dunno wachu mean. ' + '`'+`${prefix}help crypto`+'`'+' to see all commands')
        }
		
        
        
	},
};