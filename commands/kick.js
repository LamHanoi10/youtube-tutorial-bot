module.exports = {
    name: 'kick',
    async execute(bot, message, args) {
        //check permission
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You can't use this command`);
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`I require \`KICK_MEMBERS\` permission to kick a member`)

        //command: +kick @Member <Reason>
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`You must mention member to kick \`+kick @Member <Reason>\``)
        const reason = args.slice(1).join(" ") || "No reason provided";
        if(!member.kickable) return message.channel.send(`I can't kick that member`)
        await member.kick(reason);
        message.channel.send(`:ok_hand: Kicked **${member.user.tag}**`)
    }
}