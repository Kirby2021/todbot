const request = require('request');
const cheerio = require('cheerio');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'borutod',
    description: 'Borutod',
    args: true,
    execute: async function (client, message, args) {
        if (isNaN(args[0])) return message.reply('You need to input the episode in format number! Type `;help borutod` to see how to use.')
        if (parseInt(args[0]) <= 0) return message.reply("Are you stupid or what? Don't input negative number! Type `;help borutod` to see how to use.")
        if (args[1] == undefined || isNaN(args[1])) return message.reply('You need to input the video quality in format number! Type `;help borutod` to see how to use.')

        let url = '';
		if (parseInt(args[0]) > 0 && parseInt(args[0]) < 68){
			const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle(`BORUTOD EPISODE ${args[0]}`)
                    .addFields({
                        name: `Error`,
                        value: 'true'
                    }, {
                        name: `Error Message`,
                        value: `I can't scrape episode below than 68 cuz the website is messy`
                    }, {
                        name: `Source`,
                        value: 'Neonime'
                    })
                message.channel.send(embed)
		}
		
        if (parseInt(args[0]) > 0 && parseInt(args[0]) < 84) {
            url = `https://neonime.vip/episode/Boruto-1x${args[0]}/`
        } else if (parseInt(args[0]) > 83 && parseInt(args[0]) < 100) {
            url = `https://neonime.vip/episode/boruto-1x${args[0]}-2/`
        } else {
            url = `https://neonime.vip/episode/boruto-1x${args[0]}-subtitle-indonesia/`;
        }
        request(url, function (err, res, body) {
            if (err && res.statusCode !== 200) {
                const werror = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle(`BORUTOD EPISODE ${args[0]}`)
                    .addFields({
                        name: `Error`,
                        value: 'true'
                    }, {
                        name: `Error Message`,
                        value: `I can't access the website, prolly down.`
                    }, {
                        name: `Source`,
                        value: 'Neonime'
                    })
                message.channel.send(werror)
            }
            let $ = cheerio.load(body);
            var arr = ['\u200B'];
            var i = 21;
            var gdrive = 0;
            while (i < 218) {
                if (i == 30) {
                    i = 210;
                }
                if ($(`#player${i} > span`)[0] != undefined && $(`#player${i} > p > iframe`)[0] != undefined && $(`#player${i} > span.tit`).text().toLowerCase().includes(`${args[1]}`) && gdrive == 0) {
                    if ($(`#player${i} > p > iframe`)[0].attribs['data-src'].includes('https://neonime.vip/wp-content/plugins/gdriveplayer/player.php?data=%2F%2F')) {
                        arr.push(decodeURIComponent($(`#player${i} > p > iframe`)[0].attribs['data-src'].replace('https://neonime.vip/wp-content/plugins/gdriveplayer/player.php?data=%2F%2F', 'https://')) + '\n');
                        gdrive = 1
                        i++;
                    } else if ($(`#player${i} > p > iframe`)[0].attribs['data-src'].includes('njctn') || $(`#player${i} > p > iframe`)[0].attribs['data-src'].includes('muse.my.id')) {
                        i++;
                    } else {
                        arr.push($(`#player${i} > p > iframe`)[0].attribs['data-src'] + '\n');
                        i++;
                    }
                } else if ($(`#player${i} > span`)[0] != undefined && $(`#player${i} > p > iframe`)[0] != undefined && $(`#player${i} > span.tit`).text().toLowerCase().includes('fembed')) {
                    arr.push($(`#player${i} > p > iframe`)[0].attribs['data-src'] + '\n');
                    i++;
                } else {
                    i++;
                }
            }
            if (arr.length == 1) {
                const embed = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle(`BORUTOD EPISODE ${args[0]}`)
                    .addFields({
                        name: `Error`,
                        value: 'true'
                    }, {
                        name: `Error Message`,
                        value: `I can't find the quality of your desire or prolly episode **${args[0]}** not updated yet`
                    }, {
                        name: `Source`,
                        value: 'Neonime'
                    })
                message.channel.send(embed)
            } else {
                arr.shift();
                const found = new MessageEmbed()
                    .setColor('#0099FF')
                    .setTitle(`BORUTOD EPISODE ${args[0]} | QUALITY ${args[1]}p`)
                    .addFields({
                        name: `Error`,
                        value: 'false'
                    }, {
                        name: `Link`,
                        value: arr
                    }, {
                        name: `Source`,
                        value: 'Neonime'
                    })
                message.channel.send(found)
            }
        });
    },
};