module.exports = {
    name: 'ban',
    description: 'Banned mentioned member',
    execute(client, message, args) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!message.guild) return;
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member
                        .ban({
                            reason: `${args[1]}`,
                        })
                        .then(() => {
                            message.reply(`Successfully banned ${user.tag}`);
                        })
                        .catch(err => {
                            message.reply('I was unable to ban the member');
                        });
                } else {
                    message.reply("That user isn't in this guild!");
                }
            } else {
                message.reply("You didn't mention the user to ban!");
            }
        }
        else{
            message.reply("You don't have permission!");
        }
    },
};