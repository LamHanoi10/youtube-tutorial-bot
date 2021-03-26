const { MessageEmbed } = require('discord.js');
const prefix = require('../config.json').prefix;

module.exports = {
    name: 'help',
    description: "Send all commands",
    usage: 'help <Command>',
    async execute(bot, message, args) {
        if(!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setTitle(`There are all my commands`)
                .setColor("RANDOM")
                .addField(`Commands`, [
                    `\`${bot.commands.map(c => c.name).join("\`,\`")}\``
                ])
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setFooter(`By: ${message.author.tag}`)
            message.channel.send(helpEmbed)
        } else if(args[0]) {
            if(!bot.commands.has(args[0])) return message.channel.send(`Hmm... I can't find \`+${args[0]}\` ! Use \`+help\` for my all commands`)
            const command = await bot.commands.get(args[0])
            const embed = new MessageEmbed()
                .setTitle(`Command Info`)
                .addField(`Information`, [
                    `Name: ${command.name || 'No Command Name'}`,
                    `Description: ${command.description || 'No Command Description'}`,
                    `Usage: ${prefix + command.usage || `No Command Usage`}`,
                    `Prefix: ${prefix}`
                ])
                .setFooter(`<> Means Optional , [] Means Required`)
                .setColor("RANDOM")
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}