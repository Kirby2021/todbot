const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const userCreatedPolls = new Map();

const client = new Discord.Client();

function getVoteOptions(collector) {
    return new Promise((resolve, reject) => {
        collector.on('end', collected => resolve(collected.map(m => m.content)));
    });
}

function processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
    return new Promise((resolve, reject) => {
        voteCollector.on('collect', msg => {
            let option = msg.content.toLowerCase();
            if(!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
                userVotes.set(msg.author.id, msg.content);
                let voteCount = pollTally.get(option);
                pollTally.set(option, ++voteCount);
            }
        });
        voteCollector.on('end', collected => {
            //console.log("Collected " + collected.size + " votes.");
            resolve(collected);
        })
    });
}

function getPollOptions(collector) {
    return new Promise((resolve, reject) => {
        collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
    });
}

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
} 

module.exports = {
    name: 'cpoll',
    description: 'Create a polling',
    execute: async function (client, message, args) {
        if(userCreatedPolls.has(message.author.id)) {
            message.channel.send("We have a polling right now!");
            return;
        }
        message.channel.send("Input the options (max 5)");
        let filter = m => {
            if(m.author.id === message.author.id) {
                if(m.content.toLowerCase() === 'start') collector.stop();
                else return true;
            }
            else return false;
        }
        let collector = message.channel.createMessageCollector(filter, { });
        let pollOptions = await getPollOptions(collector);
        
        if(pollOptions.length < 2) {
            message.channel.send("We need 2 options to start a polling");
            return;
        }
        if(pollOptions.length > 5) {
            message.channel.send("We have a deal that max only 5 options");
            return;
        }
        let embed = new MessageEmbed();
        embed.setTitle("Option list");
        embed.setDescription(pollOptions.join("\n"));
        //console.log(pollOptions[1]);
        let confirm = await message.channel.send(embed);
        
        await confirm.react('✅');
        await confirm.react('❎');

        let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
        let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
        if(reaction.emoji.name === '✅') {
            message.channel.send("Polling will start in 3 second");
            await delay(3000);
            message.channel.send("Vote now!");
            let userVotes = new Map();
            let pollTally = new Discord.Collection(pollOptions.map(o => [o, 0]));
            let pollFilter = m => !m.bot;
            let voteCollector = message.channel.createMessageCollector(pollFilter, {
                time: 10000
            });
            userCreatedPolls.set(message.author.id, voteCollector);
            await processPollResults(voteCollector, pollOptions, userVotes, pollTally);
            let max = Math.max(...pollTally.array());
            let entries = [...pollTally.entries()];
            let winners = [];
            let embed = new MessageEmbed();
            let desc = '';
            entries.forEach(entry => entry[1] === max ? winners.push(entry[0]) : null);
            entries.forEach(entry => desc  += entry[0] + " receive " + entry[1] + " vote\n");
            embed.setDescription(desc);

            if(winners.length === 1) {
                message.channel.send(winners[0] + " is the winner", embed);
                userCreatedPolls.get(message.author.id).stop();
                userCreatedPolls.delete(message.author.id);
            }
            else {
                message.channel.send("Draw! I think we need to re-polling again", embed);
                userCreatedPolls.get(message.author.id).stop();
                userCreatedPolls.delete(message.author.id);
            }
        }   
        else if(reaction.emoji.name === '❎') {
            message.channel.send("Polling cancelled");
            userCreatedPolls.delete(message.author.id);
        }
    }
    
    };