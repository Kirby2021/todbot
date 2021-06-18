const axios = require('axios');
const {
	prefix
} = require('../json/config.json');

module.exports = {
	name: 'r',
	description: 'Get a cat pic or a dog pict',
	args: true,
	execute: async function (client, message, args) {
		if (args[0] === "cat") {
			axios.get("https://aws.random.cat/meow").then(response => {
				cat = response.data;
			message.channel.send(cat.file);
			}).catch((e) => {
				message.channel.send("**An error occured**")
			});
		}
		else if (args[0] === "dog"){
			axios.get("https://dog.ceo/api/breeds/image/random").then(response => {
				dog = response.data;
			message.channel.send(dog.message);
			}).catch((e) => {
				message.channel.send("**An error occured**")
			});
		}
		else if (args[0] === "img"){
			axios.get("https://loremflickr.com/json/g/1024/720/all").then(response => {
				img = response.data;
			message.channel.send(img.file);
			}).catch((e) => {
				message.channel.send("**An error occured**")
			});
		}
		else{
			message.channel.send('I dunno wachu mean. ' + '`'+`${prefix}help r`+'`'+' to see all commands')
		}
	},
};