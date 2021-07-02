module.exports = {
    name: 'clearwarns',
    description: "Clear all warnings of a member",
    usage: 'clearwarns [Member]',
    async execute(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command")
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let warnings = bot.db.get(`warns_${member.id}_${message.guild.id}`);
        if(!warnings) return message.channel.send(`**${member.user.tag}** doesn't have any warnings`);
        await bot.db.delete(`warns_${member.id}_${message.guild.id}`);
        message.channel.send(`I have deleted all warnings of **${member.user.tag}**`)
    }
}