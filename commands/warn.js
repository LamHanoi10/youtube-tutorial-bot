const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warn',
    description: "Warn a member",
    usage: 'warn [Member] <Reason>',
    async execute(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command")
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send("You need mention member first")
        const reason = args.slice(1).join(" ") || args[1] || "No reason provided";
        let warnings = bot.db.get(`warns_${member.id}_${message.guild.id}`);
        if(!warnings) {
            bot.db.set(`warns_${member.id}_${message.guild.id}`, 1);
            warnings = 1
        } else {
            bot.db.add(`warns_${member.id}_${message.guild.id}`, 1);
            warnings++;
        }
        message.channel.send(new MessageEmbed()
            .setTitle("Warnings")
            .setDescription(`**${message.author.tag}** warned **${member.user.tag}** with reason **${reason}**.\n\nNow, **${member.user.tag}** has **${warnings}** warnings`)
            .setColor("ORANGE")
        )
        try {
            member.send("You were warned in **" + message.guild.name + "** and now you have **" + warnings + "** warnings")
        } catch(e) {

        }
    }
}