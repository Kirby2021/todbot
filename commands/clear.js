module.exports = {
    name: 'clear',
    description: 'Delete message with x amount',
    args: true,
    execute(client, message, args) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const amount = parseInt(args[0]) + 1;

            if (isNaN(amount)) {
                return message.reply('That doesn\'t seem to be a valid number.');
            } else if (amount <= 1 || amount > 100) {
                return message.reply('you need to input a number between 1 and 99.');
            }

            message.channel.bulkDelete(amount, true).catch(err => {
                message.channel.send('There was an error trying to prune messages in this channel!');
            });
        }
        else{
            message.channel.send('You don\'t have permission!');
        }

    },
};