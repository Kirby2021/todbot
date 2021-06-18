module.exports = {
    name: 'restartxz',
    description: 'Restart bot (the bot need to run on pm2)',
    execute: async function (client, message, args) {
        if (message.author.id != '348489801407922196') return message.channel.send("What are you doing?")
        process.exit();
    },
};