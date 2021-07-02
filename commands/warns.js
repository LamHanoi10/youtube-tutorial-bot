module.exports = {
    name: 'warns',
    descripton: "Check warnings of a member",
    usage: 'warns [Member]',
    async execute(bot, message, args) {
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let warnings = bot.db.get(`warns_${member.id}_${message.guild.id}`);
        if(!warnings) return message.channel.send(`**${member.user.tag}** doesn't have any warnings`);
        message.channel.send(`**${member.user.tag}** has **${warnings}** warnings`)
    }
}