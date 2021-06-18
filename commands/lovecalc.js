const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const {
	lovecalc
} = require('../json/config.json');

module.exports = {
	name: 'lovecalc',
    description: 'Love calculator',
    args: true,
	execute: async function(client, message, args) {
        axios({
            "method":"GET",
            "url":"https://love-calculator.p.rapidapi.com/getPercentage",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"love-calculator.p.rapidapi.com",
            "x-rapidapi-key": lovecalc,
            "useQueryString":true
            },"params":{
            "fname":`${args[0]}`,
            "sname":`${args[1]}`
            }
            })
            .then((response)=>{
              result = response.data
              const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('LOVE CALCULATOR')
				.addFields(
					{ name: 'First Name', value: result.fname },
					{ name: 'Second Name', value: result.sname},
					{ name: 'Percentage', value: result.percentage + '%'},
					{ name: 'Result', value: result.result}
                );
			message.channel.send(embed);
            })
            .catch((error)=>{
              console.log(error)
            })
	},
};