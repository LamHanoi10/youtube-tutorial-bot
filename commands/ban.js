module.exports = {
    name: 'ban',
    async execute(bot, message, args) {
        //check permissions
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You can't use this commnand`);
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`I require \`BAN_MEMBERS\` permission to ban a member`);
        const member = message.mentions.members.first()
        const reason = args.slice(1).join(" ") || "No reason provided";
        if(!member) return message.channel.send(`You must mention a member to ban \`+ban @Member <Reason>\``)
        if(!member.bannable) return message.channel.send(`I cannot ban this member`)
        try {
            await member.send(`You got banned from **${message.guild.name}** || **${reason}**`)
            await member.ban({
                reason: reason
            })
            await message.channel.send(`:ok_hand: Banned **${member.user.tag}**`)
        } catch(e) {
            await member.ban({
                reason: reason
            })
            await message.channel.send(`:ok_hand: Banned **${member.user.tag}** but I cannot DM them`)
        }
    }
}