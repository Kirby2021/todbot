const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'invite',
    description: 'Get server invite link',
    execute(client, message, args) {
        const channel = message.channel
        channel.createInvite()
            .then(invite => {
                const embed = new MessageEmbed();
                embed.setTitle('INVITE LINK');
                embed.setColor(3066993);
                embed.addFields(
                    {name: 'Usage', value: 'Unlimited'},
                    {name: 'Expiry', value: '1 day'},
                    {name: 'Invite Link', value: `:link: Here's the invite link: ${invite.url}`}
                )
                message.channel.send(embed);
            })
            .catch(console.error);
    },
};