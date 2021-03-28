module.exports = {
    name: 'mute',
    description: "Mutes a member",
    usage: '[Member] <Reason>',
    async execute(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You can't use this command`)
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`I require \`MANAGE_ROLES\` permission to mute a member`);
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`You must mention member to mute \`+mute [Member] <Reason>\``);
        const reason = args.slice(1).join(" ") || "No reason provided";
        const muteRole = message.guild.roles.cache.find(role => role.name == 'Muted')
        if(!muteRole) {
            let muterole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permission: []
                }
            })
            await message.channel.send(`Cannot find Muted role ! Trying to create one`);
            message.guild.channels.cache.filter(c => c.type == 'text').forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
            message.guild.channels.cache.filter(c => c.type == 'voice').forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SPEAK: false
                })
            })
        }
        let muteRole2 = await message.guild.roles.cache.find((role) => role.name == 'Muted');
        if(member.roles.cache.get(muteRole2.id)) return message.channel.send(`That user is muted already`);
        await member.roles.add(muteRole2)
            .then(message.channel.send(`Muted **${member.user.tag}** || ${reason}`))
            .catch(err => {
                console.log(err)
                message.channel.send(`An error occured when muting that member`)
            })
    }
}