const fs = require('fs');
const {
	MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
const {
	prefix,
	token
} = require('./json/config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(";help commands", {
		type: "WATCHING"
	});
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type == 'dm') return;

	const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// On member join, you can edit the channel and role before you uncomment this
// client.on('guildMemberAdd', member => {
// 	const channel = member.guild.channels.cache.find(ch => ch.name === 'datang_akan_pergi');
// 	const role1 = member.guild.roles.cache.find(role => role.name === 'Member');
// 	const role2 = member.guild.roles.cache.find(role => role.name === 'DJ');

// 	if (!role1) return;
// 	member.roles.add(role1);
// 	if (!role2) return;
// 	member.roles.add(role2);

// 	if (!channel) return;
// 	channel.send(`${member}`)
// 		.then(message => message.delete())
// 		.catch(console.error);
// 	const welcome = new MessageEmbed()
// 		.setColor('#0099FF')
// 		.setTitle('INI TITLE')
// 		.addFields({
// 			name: '\u200B',
// 			value: `HELLO <@${member.user.id}> WELCOME TO VENTUROUS, BUDDY.`
// 		}, )
// 		.setImage('https://pa1.narvii.com/6802/89ae9d8e8755e8e12dafc1c0552a9763d368acf7_hq.gif')
// 		.setFooter('TOD BOT v2', 'https://i.imgur.com/KHsCxbG.png')
// 	channel.send(welcome);
// });

// On member leave, you can edit the channel and role before you uncomment this
// client.on('guildMemberRemove', member => {
// 	const channel = member.guild.channels.cache.find(ch => ch.name === 'datang_akan_pergi');
// 	if (!channel) return;
// 	const welcome = new MessageEmbed()
// 		.setColor('#0099FF')
// 		.setTitle('INI TITLE')
// 		.addFields({
// 			name: '\u200B',
// 			value: `<@${member.user.id}> TELAH KELUAR DARI SERVER DAN AKU TAK TAHU KENAPA`
// 		}, )
// 		.setImage('https://i.gifer.com/4V0f.gif')
// 		.setFooter('TOD BOT v2', 'https://i.imgur.com/KHsCxbG.png')
// 	channel.send(welcome);
// });


client.login(token);