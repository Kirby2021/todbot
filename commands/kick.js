module.exports = {
    name: 'kick',
    description: 'Kick mentioned member',
    execute(client, message, args) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!message.guild) return;
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .kick('Optional reason that will display in the audit logs')
                        .then(() => {
                            message.reply(`Successfully kicked ${user.tag}`);
                        })
                        .catch(err => {
                            message.reply('I was unable to kick the member');
                        });
                } else {
                    message.reply("That user isn't in this guild!");
                }
            } else {
                message.reply("You didn't mention the user to kick!");
            }
        }
        else{
            message.reply("You don't have permission!");
        }
    },
};