module.exports = {
    name: 'unmute',
    description: "Unmtes a member",
    usage: '[Member] <Reason>',
    async execute(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You can't use this command`)
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`I require \`MANAGE_ROLES\` permission to unmute a member`);
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`You must mention member to unmute \`+unmute [Member] <Reason>\``);
        const reason = args.slice(1).join(" ") || "No reason provided";
        const muteRole = message.guild.roles.cache.find(role => role.name == 'Muted')
        if(!muteRole) return message.channel.send(`Cannot find Muted role ! Run \`+mute [Member] <Reason>\` to create a mute role`)
        if(!member.roles.cache.get(muteRole.id)) return message.channel.send(`That user is unmuted already`);
        await member.roles.remove(muteRole)
            .then(message.channel.send(`Unmuted **${member.user.tag}** || ${reason}`))
            .catch(err => {
                console.log(err)
                message.channel.send(`An error occured when unmuting that member`)
            })
    }
}